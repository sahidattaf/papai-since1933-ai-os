"use client";
import React from 'react';
import type { Applicant } from './TeamForm';

export function TeamTable({ items, onClear }: { items: Applicant[]; onClear?: () => void }) {
  if (!items || items.length === 0) {
    return (
      <div className="card">
        <h2 className="accent">Candidates</h2>
        <p className="muted">No candidates yet. Use the form to add applicants.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="accent">Candidates</h2>
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr className="muted">
              <th style={{textAlign:'left',padding:8}}>Name</th>
              <th style={{textAlign:'left',padding:8}}>Phone</th>
              <th style={{textAlign:'left',padding:8}}>Role</th>
              <th style={{textAlign:'left',padding:8}}>Availability</th>
              <th style={{textAlign:'left',padding:8}}>Experience</th>
            </tr>
          </thead>
          <tbody>
            {items.map(a=> (
              <tr key={a.id} style={{borderTop:'1px solid rgba(255,255,255,0.03)'}}>
                <td style={{padding:8}}>{a.fullName}</td>
                <td style={{padding:8}}>{a.phone}</td>
                <td style={{padding:8}}>{a.role}</td>
                <td style={{padding:8}} className="muted">{a.availability || '—'}</td>
                <td style={{padding:8}} className="muted">{a.experience || '—'}</td>
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
