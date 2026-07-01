"use client";
import React, { useState } from 'react';

export type Review = {
  id: string;
  customerName: string;
  phone: string;
  visitDate: string;
  rating: number;
  feedback: string;
  createdAt: string;
};

export function ReviewForm({ onAdd }: { onAdd: (r: Review) => void }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [feedback, setFeedback] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function validate() {
    const errs: string[] = [];
    if (!customerName.trim()) errs.push('Name is required');
    if (!phone.trim()) errs.push('Phone is required');
    if (!visitDate) errs.push('Visit date is required');
    if (!rating || rating < 1 || rating > 5) errs.push('Rating must be 1 to 5');
    setErrors(errs);
    return errs.length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const r: Review = {
      id: String(Date.now()),
      customerName: customerName.trim(),
      phone: phone.trim(),
      visitDate,
      rating,
      feedback: feedback.trim(),
      createdAt: new Date().toISOString(),
    };

    onAdd(r);

    setCustomerName('');
    setPhone('');
    setVisitDate('');
    setRating(5);
    setFeedback('');
    setErrors([]);
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="pill">Review capture</div>
      <h2 className="accent" style={{ marginTop: 8, marginBottom: 6 }}>Request a review</h2>
      <p className="muted" style={{ marginTop: 0 }}>Turn guest moments into thoughtful follow-up and stronger reputation signals.</p>

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
          <input value={customerName} onChange={e=>setCustomerName(e.target.value)} className="input" placeholder="Maria de Vries" />
        </label>

        <label>
          <div className="muted">Phone</div>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="input" placeholder="+5999 765 4321" />
        </label>

        <label>
          <div className="muted">Visit date</div>
          <input type="date" value={visitDate} onChange={e=>setVisitDate(e.target.value)} className="input" />
        </label>

        <label>
          <div className="muted">Rating (1-5)</div>
          <select value={String(rating)} onChange={e=>setRating(Number(e.target.value))} className="input">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </label>

        <label className="full">
          <div className="muted">Feedback</div>
          <textarea value={feedback} onChange={e=>setFeedback(e.target.value)} rows={3} placeholder="What stood out during the visit?" />
        </label>
      </div>

      <div style={{marginTop:14}}>
        <button type="submit" className="button button--primary">Save review</button>
      </div>
    </form>
  );
}
