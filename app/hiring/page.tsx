"use client";
import React, { useEffect, useState } from 'react';
import { TeamForm, type Applicant } from '../../components/TeamForm';
import { TeamTable } from '../../components/TeamTable';
import rolesData from '../../data/hiring-roles.json';

export default function TeamIntakePage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    try { const raw = localStorage.getItem('papai:applicants'); if (raw) setApplicants(JSON.parse(raw)); } catch (e) {}
  }, []);

  useEffect(() => { try { localStorage.setItem('papai:applicants', JSON.stringify(applicants)); } catch (e) {} }, [applicants]);

  function addApplicant(a: Applicant) { setApplicants(prev => [a, ...prev]); }
  function clearAll() { setApplicants([]); }

  return (
    <div>
      <section className="card">
        <h1 className="accent">Team Intake</h1>
        <p className="muted">Candidate pipeline for Papai restaurant roles.</p>
      </section>

      <div className="grid">
        <div>
          {/* @ts-ignore */}
          <TeamForm roles={rolesData.roles} onAdd={addApplicant} />
        </div>

        <div>
          <TeamTable items={applicants} onClear={clearAll} />
        </div>
      </div>
    </div>
  );
}
