import { ReservationPanel } from '../../components/ReservationPanel';

export default function ReservationsPage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Reservations</h1>
        <p className="muted">WhatsApp-ready reservation intake and staff confirmation workflow.</p>
      </section>

      <section className="card">
        <ReservationPanel />
        <p className="muted">Empty state: no reservations yet. Use the reservation phone or connect Supabase.</p>
      </section>
    </div>
  );
}
