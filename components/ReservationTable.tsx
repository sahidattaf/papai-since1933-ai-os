"use client";
import React from 'react';
import type { Reservation } from './ReservationForm';

export function ReservationTable({ items, onClear }: { items: Reservation[]; onClear?: () => void }) {
  if (!items || items.length === 0) {
    return (
      <div className="card">
        <div className="pill">Today</div>
        <h2 className="accent" style={{ marginTop: 8, marginBottom: 6 }}>Reservations</h2>
        <p className="muted">No reservations yet. Create one above to see it listed here.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="pill">Live queue</div>
      <h2 className="accent" style={{ marginTop: 8, marginBottom: 6 }}>Reservations</h2>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id}>
                <td>{r.customerName}</td>
                <td>{r.phone}</td>
                <td>{r.reservationDate}</td>
                <td>{r.reservationTime}</td>
                <td>{r.guestCount}</td>
                <td className="muted">{r.specialRequest || '—'}</td>
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
