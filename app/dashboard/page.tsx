import { RestaurantCard } from '../../components/RestaurantCard';

export default function DashboardPage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Dashboard</h1>
        <p className="muted">Reservations, content, team intake, reviews, and manager reporting.</p>
      </section>

      <section className="grid">
        <div className="card"><RestaurantCard /></div>
        <div className="card"><p className="muted">No live data connected. Empty state: connect Supabase or import CSV to see reservations.</p></div>
      </section>
    </div>
  );
}
