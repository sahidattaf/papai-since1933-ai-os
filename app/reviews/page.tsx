"use client";
import React, { useEffect, useState } from 'react';
import { ReviewForm, type Review } from '../../components/ReviewForm';
import { ReviewTable } from '../../components/ReviewTable';
import { clearReviews, loadReviews, saveReview } from '../../lib/persistence';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function bootstrap() {
      const loaded = await loadReviews();
      setReviews(loaded);
    }

    bootstrap();
  }, []);

  async function addReview(r: Review) {
    const next = await saveReview(r);
    setReviews(next);
    if (r.rating >= 4) {
      setMessage('Great rating — send a public review request (e.g., link to Google/Instagram).');
    } else {
      setMessage('Low rating — initiate a private manager follow-up to resolve the issue.');
    }
    setTimeout(() => setMessage(null), 8000);
  }

  async function clearAll() {
    await clearReviews();
    setReviews([]);
  }

  return (
    <div>
      <section className="card">
        <h1 className="accent">Reviews</h1>
        <p className="muted">Review requests, private feedback, and weekly reputation reporting.</p>
      </section>

      <div className="grid">
        <div>
          <ReviewForm onAdd={addReview} />
          {message && (
            <div className="card" style={{marginTop:12}}>
              <strong className="accent">Action</strong>
              <p className="muted">{message}</p>
            </div>
          )}
        </div>

        <div>
          <ReviewTable items={reviews} onClear={clearAll} />
        </div>
      </div>
    </div>
  );
}
