"use client";
import React, { useState } from 'react';

export type Reservation = {
  id: string;
  customerName: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  specialRequest?: string;
  createdAt: string;
};

export function ReservationForm({ onAdd }: { onAdd: (r: Reservation) => void }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [specialRequest, setSpecialRequest] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function validate() {
    const errs: string[] = [];
    if (!customerName.trim()) errs.push('Name is required');
    if (!phone.trim()) errs.push('Phone is required');
    if (!reservationDate) errs.push('Date is required');
    if (!reservationTime) errs.push('Time is required');
    if (!guestCount || guestCount < 1) errs.push('Guest count must be at least 1');
    setErrors(errs);
    return errs.length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const reservation: Reservation = {
      id: String(Date.now()),
      customerName: customerName.trim(),
      phone: phone.trim(),
      reservationDate,
      reservationTime,
      guestCount,
      specialRequest: specialRequest.trim(),
      createdAt: new Date().toISOString(),
    };

    onAdd(reservation);

    // reset form
    setCustomerName('');
    setPhone('');
    setReservationDate('');
    setReservationTime('');
    setGuestCount(1);
    setSpecialRequest('');
    setErrors([]);
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="pill">Reservation intake</div>
      <h2 className="accent" style={{ marginTop: 8, marginBottom: 6 }}>New reservation</h2>
      <p className="muted" style={{ marginTop: 0 }}>Capture guest details clearly for a polished front-of-house experience.</p>

      {errors.length > 0 && (
        <div className="error-list">
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}

      <div className="form-grid">
        <label>
          <div className="muted">Customer name</div>
          <input value={customerName} onChange={e=>setCustomerName(e.target.value)} className="input" placeholder="Alicia Rivera" />
        </label>

        <label>
          <div className="muted">Phone</div>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="input" placeholder="+5999 123 4567" />
        </label>

        <label>
          <div className="muted">Reservation date</div>
          <input type="date" value={reservationDate} onChange={e=>setReservationDate(e.target.value)} className="input" />
        </label>

        <label>
          <div className="muted">Reservation time</div>
          <input type="time" value={reservationTime} onChange={e=>setReservationTime(e.target.value)} className="input" />
        </label>

        <label>
          <div className="muted">Guest count</div>
          <input type="number" min={1} value={String(guestCount)} onChange={e=>setGuestCount(Number(e.target.value))} className="input" />
        </label>

        <label className="full">
          <div className="muted">Special request</div>
          <input value={specialRequest} onChange={e=>setSpecialRequest(e.target.value)} className="input" placeholder="Window seat, birthday, vegan menu" />
        </label>
      </div>

      <div style={{marginTop:14}}>
        <button type="submit" className="button button--primary">Create reservation</button>
      </div>
    </form>
  );
}
