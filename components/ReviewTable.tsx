"use client";
import React from 'react';
import type { Review } from './ReviewForm';

export function ReviewTable({ items, onClear }: { items: Review[]; onClear?: () => void }) {
  if (!items || items.length === 0) {
    return (
      <div className="card">
        <h2 className="accent">Reviews & Feedback</h2>
        <p className="muted">No feedback yet. Ask guests for reviews to start tracking sentiment.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="accent">Reviews & Feedback</h2>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr className="muted">
              <th style={{textAlign:'left',padding:8}}>Name</th>
              <th style={{textAlign:'left',padding:8}}>Phone</th>
              <th style={{textAlign:'left',padding:8}}>Visit</th>
              <th style={{textAlign:'left',padding:8}}>Rating</th>
              <th style={{textAlign:'left',padding:8}}>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id} style={{borderTop:'1px solid rgba(255,255,255,0.03)'}}>
                <td style={{padding:8}}>{r.customerName}</td>
                <td style={{padding:8}}>{r.phone}</td>
                <td style={{padding:8}}>{r.visitDate}</td>
                <td style={{padding:8}}>{r.rating}</td>
                <td style={{padding:8}} className="muted">{r.feedback || '—'}</td>
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
