import { ContentCalendar } from '../../components/ContentCalendar';
import calendar from '../../data/content-calendar.json';

export default function ContentPage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Content Planner</h1>
        <p className="muted">Instagram posts, daily specials, reels ideas, and weekly rhythm.</p>
      </section>

      <section className="card">
        <h2>Weekly Rhythm</h2>
        <ul>
          {Object.entries(calendar).map(([day, theme]) => (
            <li key={day}><strong>{day}:</strong> <span className="muted">{theme}</span></li>
          ))}
        </ul>
      </section>

      <section className="card">
        <ContentCalendar />
        <p className="muted">Empty state: schedule a post to populate the planner.</p>
      </section>
    </div>
  );
}
