import { RestaurantCard } from '../components/RestaurantCard';
import { ContentCalendar } from '../components/ContentCalendar';
import { ReservationPanel } from '../components/ReservationPanel';
import { TeamPanel } from '../components/TeamPanel';
import { ReviewDashboard } from '../components/ReviewDashboard';
import data from '../data/restaurant-profile.json';
import calendar from '../data/content-calendar.json';

export default function HomePage() {
  return (
    <div>
      <header className="card">
        <h1 className="accent">Papai Since 1933 — Command Center</h1>
        <p className="muted">Welcome back. Quick overview of your restaurant.</p>
      </header>

      <section className="grid">
        <div className="card">
          <h2>Profile</h2>
          <p className="muted">{data.restaurant_name} • {data.instagram}</p>
          <p>{data.location}</p>
          <p className="muted">{data.opening_hours} • Reservations: {data.reservation_phone}</p>
        </div>

        <div className="card">
          <h2>Social Snapshot</h2>
          <p>Posts: {data.status.posts} • Followers: {data.status.followers}</p>
          <p className="muted">Signals: {data.signals.join(', ')}</p>
        </div>

        <div className="card">
          <h2>Content Rhythm</h2>
          <ul>
            {Object.entries(calendar).map(([day, theme]) => (
              <li key={day}><strong>{day}:</strong> <span className="muted">{theme}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid" style={{marginTop:18}}>
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
