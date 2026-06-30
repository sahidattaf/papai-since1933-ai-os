import { ReviewDashboard } from '../../components/ReviewDashboard';

export default function ReviewsPage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Reviews</h1>
        <p className="muted">Review requests, private feedback, and weekly reputation reporting.</p>
      </section>

      <section className="card">
        <ReviewDashboard />
        <p className="muted">Empty state: no review requests yet.</p>
      </section>
    </div>
  );
}
