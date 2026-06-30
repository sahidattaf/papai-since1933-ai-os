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
      <h2 className="accent">New Reservation</h2>

      {errors.length > 0 && (
        <div style={{color: 'var(--accent)', marginBottom: 8}}>
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <label>
          <div className="muted">Customer name</div>
          <input value={customerName} onChange={e=>setCustomerName(e.target.value)} className="input" />
        </label>

        <label>
          <div className="muted">Phone</div>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="input" />
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

        <label>
          <div className="muted">Special request</div>
          <input value={specialRequest} onChange={e=>setSpecialRequest(e.target.value)} className="input" />
        </label>
      </div>

      <div style={{marginTop:12}}>
        <button type="submit" style={{background:'var(--accent)',border:'none',color:'black',padding:'8px 12px',borderRadius:6}}>Create reservation</button>
      </div>
    </form>
  );
}
