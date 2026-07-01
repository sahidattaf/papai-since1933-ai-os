"use client";

import Link from 'next/link';

export default function ReviewsErrorPage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Reviews are unavailable</h1>
        <p className="muted">
          We could not load reviews right now. Your local review data is still available and can be reused on this device.
        </p>
      </section>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="muted">
          Return to the dashboard and try again.
        </p>
        <Link href="/dashboard" className="button" style={{ display: 'inline-block', marginTop: 12 }}>
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
