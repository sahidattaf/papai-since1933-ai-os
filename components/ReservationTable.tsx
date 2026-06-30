"use client";
import React from 'react';
import type { Reservation } from './ReservationForm';

export function ReservationTable({ items, onClear }: { items: Reservation[]; onClear?: () => void }) {
  if (!items || items.length === 0) {
    return (
      <div className="card">
        <h2 className="accent">Reservations</h2>
        <p className="muted">No reservations yet. Create one above to see it listed here.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="accent">Reservations</h2>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr className="muted">
              <th style={{textAlign:'left',padding:8}}>Name</th>
              <th style={{textAlign:'left',padding:8}}>Phone</th>
              <th style={{textAlign:'left',padding:8}}>Date</th>
              <th style={{textAlign:'left',padding:8}}>Time</th>
              <th style={{textAlign:'left',padding:8}}>Guests</th>
              <th style={{textAlign:'left',padding:8}}>Request</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id} style={{borderTop:'1px solid rgba(255,255,255,0.03)'}}>
                <td style={{padding:8}}>{r.customerName}</td>
                <td style={{padding:8}}>{r.phone}</td>
                <td style={{padding:8}}>{r.reservationDate}</td>
                <td style={{padding:8}}>{r.reservationTime}</td>
                <td style={{padding:8}}>{r.guestCount}</td>
                <td style={{padding:8}} className="muted">{r.specialRequest || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {onClear && (
        <div style={{marginTop:12}}>
          <button onClick={onClear} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.06)',color:'var(--accent)',padding:'6px 10px',borderRadius:6}}>Clear all</button>
        </div>
      )}
    </div>
  );
}
