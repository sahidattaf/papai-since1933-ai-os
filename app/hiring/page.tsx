"use client";
import React, { useEffect, useState } from 'react';
import { TeamForm, type Applicant } from '../../components/TeamForm';
import { TeamTable } from '../../components/TeamTable';
import rolesData from '../../data/hiring-roles.json';
import { clearApplicants, loadApplicants, saveApplicant } from '../../lib/persistence';

export default function TeamIntakePage() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);

  useEffect(() => {
    async function bootstrap() {
      const loaded = await loadApplicants();
      setApplicants(loaded);
    }

    bootstrap();
  }, []);

  async function addApplicant(a: Applicant) {
    const next = await saveApplicant(a);
    setApplicants(next);
  }

  async function clearAll() {
    await clearApplicants();
    setApplicants([]);
  }

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
