"use client";
import React, { useEffect, useState } from 'react';
import { ReservationForm, type Reservation } from '../../components/ReservationForm';
import { ReservationTable } from '../../components/ReservationTable';
import { clearReservations, loadReservations, saveReservation } from '../../lib/persistence';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    async function bootstrap() {
      const loaded = await loadReservations();
      setReservations(loaded);
    }

    bootstrap();
  }, []);

  async function addReservation(r: Reservation) {
    const next = await saveReservation(r);
    setReservations(next);
  }

  async function clearAll() {
    await clearReservations();
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
