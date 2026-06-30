"use client";
import React, { useEffect, useState } from 'react';
import { ReservationForm, type Reservation } from '../../components/ReservationForm';
import { ReservationTable } from '../../components/ReservationTable';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('papai:reservations');
      if (raw) setReservations(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('papai:reservations', JSON.stringify(reservations));
    } catch (e) {}
  }, [reservations]);

  function addReservation(r: Reservation) {
    setReservations(prev => [r, ...prev]);
    // Supabase integration: keep ready in `lib/supabase.ts` if needed later.
  }

  function clearAll() {
    setReservations([]);
  }

  return (
    <div>
      <section className="card">
        <h1 className="accent">Reservations</h1>
        <p className="muted">WhatsApp-ready reservation intake and staff confirmation workflow.</p>
      </section>

      <div className="grid">
        <div>
          <ReservationForm onAdd={addReservation} />
        </div>

        <div>
          <ReservationTable items={reservations} onClear={clearAll} />
        </div>
      </div>
    </div>
  );
}
