import { RestaurantCard } from '../components/RestaurantCard';
import { ContentCalendar } from '../components/ContentCalendar';
import { ReservationPanel } from '../components/ReservationPanel';
import { TeamPanel } from '../components/TeamPanel';
import { ReviewDashboard } from '../components/ReviewDashboard';
import data from '../data/restaurant-profile.json';
import calendar from '../data/content-calendar.json';

export default function HomePage() {
  return (
    <div className="page-inner">
      <header className="page-hero card">
        <div className="pill">Live demo • Curaçao hospitality</div>
        <h1 className="accent" style={{ margin: 0, fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)' }}>Papai Since 1933 — Command Center</h1>
        <p className="muted" style={{ margin: 0, maxWidth: 760 }}>A warm, premium operating hub for reservations, content, reviews, and team coordination.</p>
      </header>

      <section className="grid">
        <div className="card">
          <div className="section-title">Profile</div>
          <h2 style={{ marginTop: 0 }}>{data.restaurant_name}</h2>
          <p className="muted" style={{ marginBottom: 6 }}>{data.instagram}</p>
          <p style={{ margin: 0 }}>{data.location}</p>
          <p className="muted" style={{ marginTop: 8 }}>{data.opening_hours} • Reservations: {data.reservation_phone}</p>
        </div>

        <div className="card">
          <div className="section-title">Social snapshot</div>
          <ul className="stat-list">
            <li><span>Posts</span><strong>{data.status.posts}</strong></li>
            <li><span>Followers</span><strong>{data.status.followers}</strong></li>
            <li><span>Signals</span><strong>{data.signals.join(', ')}</strong></li>
          </ul>
        </div>

        <div className="card">
          <div className="section-title">Content rhythm</div>
          <ul className="stat-list">
            {Object.entries(calendar).map(([day, theme]) => (
              <li key={day}><span>{day}</span><strong>{theme}</strong></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <ReservationPanel />
        </div>
        <div className="card">
          <ContentCalendar />
        </div>
        <div className="card">
          <TeamPanel />
        </div>
        <div className="card">
          <ReviewDashboard />
        </div>
      </section>
    </div>
  );
}
