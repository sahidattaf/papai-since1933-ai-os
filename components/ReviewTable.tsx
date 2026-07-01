"use client";
import React from 'react';
import type { Review } from './ReviewForm';

export function ReviewTable({ items, onClear }: { items: Review[]; onClear?: () => void }) {
  if (!items || items.length === 0) {
    return (
      <div className="card">
        <div className="pill">Feedback loop</div>
        <h2 className="accent" style={{ marginTop: 8, marginBottom: 6 }}>Reviews & feedback</h2>
        <p className="muted">No feedback yet. Ask guests for reviews to start tracking sentiment.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="pill">Feedback loop</div>
      <h2 className="accent" style={{ marginTop: 8, marginBottom: 6 }}>Reviews & feedback</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Visit</th>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id}>
                <td>{r.customerName}</td>
                <td>{r.phone}</td>
                <td>{r.visitDate}</td>
                <td>{r.rating}</td>
                <td className="muted">{r.feedback || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onClear && (
        <div style={{marginTop:12}}>
          <button onClick={onClear} className="button button--secondary">Clear all</button>
        </div>
      )}
    </div>
  );
}
