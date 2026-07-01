"use client";
import React, { useState } from 'react';

export type Applicant = {
  id: string;
  fullName: string;
  phone: string;
  role: string;
  experience?: string;
  availability?: string;
  notes?: string;
  createdAt: string;
};

export function TeamForm({ roles, onAdd }: { roles: string[]; onAdd: (a: Applicant) => void }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  function validate() {
    const errs: string[] = [];
    if (!fullName.trim()) errs.push('Full name is required');
    if (!phone.trim()) errs.push('Phone is required');
    if (!role) errs.push('Role is required');
    setErrors(errs);
    return errs.length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const applicant: Applicant = {
      id: String(Date.now()),
      fullName: fullName.trim(),
      phone: phone.trim(),
      role,
      experience: experience.trim(),
      availability: availability.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onAdd(applicant);

    setFullName(''); setPhone(''); setRole(''); setExperience(''); setAvailability(''); setNotes(''); setErrors([]);
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="accent">Candidate Intake</h2>

      {errors.length > 0 && (
        <div style={{color:'var(--accent)',marginBottom:8}}>
          {errors.map((e,i)=><div key={i}>{e}</div>)}
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <label>
          <div className="muted">Full name</div>
          <input value={fullName} onChange={e=>setFullName(e.target.value)} className="input" />
        </label>

        <label>
          <div className="muted">Phone</div>
          <input value={phone} onChange={e=>setPhone(e.target.value)} className="input" />
        </label>

        <label>
          <div className="muted">Role</div>
          <select value={role} onChange={e=>setRole(e.target.value)} className="input">
            <option value="">Select role</option>
            {roles.map(r=> <option key={r} value={r}>{r}</option>)}
          </select>
        </label>

        <label>
          <div className="muted">Availability</div>
          <input value={availability} onChange={e=>setAvailability(e.target.value)} className="input" />
        </label>

        <label style={{gridColumn:'1 / -1'}}>
          <div className="muted">Experience</div>
          <textarea value={experience} onChange={e=>setExperience(e.target.value)} rows={3} style={{width:'100%'}} />
        </label>

        <label style={{gridColumn:'1 / -1'}}>
          <div className="muted">Notes</div>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={2} style={{width:'100%'}} />
        </label>
      </div>

      <div style={{marginTop:12}}>
        <button type="submit" style={{background:'var(--accent)',border:'none',color:'black',padding:'8px 12px',borderRadius:6}}>Add candidate</button>
      </div>
    </form>
  );
}
