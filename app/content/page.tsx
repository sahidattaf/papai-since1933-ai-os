import { ContentPlanner } from '../../components/ContentPlanner';
import calendar from '../../data/content-calendar.json';

export default function ContentPage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Content Planner</h1>
        <p className="muted">Instagram posts, daily specials, reels ideas, and weekly rhythm.</p>
      </section>

      <section>
        {/* pass the JSON rhythm into the client planner component */}
        {/* @ts-ignore */}
        <ContentPlanner initial={calendar} />
      </section>
    </div>
  );
}
