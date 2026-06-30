import data from '../../data/restaurant-profile.json';

export default function SettingsPage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Settings</h1>
        <p className="muted">Restaurant profile, integrations, and automation settings.</p>
      </section>

      <section className="card">
        <h2>Profile</h2>
        <p>{data.restaurant_name}</p>
        <p className="muted">Instagram: {data.instagram}</p>
        <p className="muted">Reservation phone: {data.reservation_phone}</p>
        <p className="muted">Empty state: connect Supabase keys in .env.local to enable integrations.</p>
      </section>
    </div>
  );
}
