import { TeamPanel } from '../../components/TeamPanel';

export default function TeamIntakePage() {
  return (
    <div>
      <section className="card">
        <h1 className="accent">Team Intake</h1>
        <p className="muted">Candidate pipeline for Papai restaurant roles.</p>
      </section>

      <section className="card">
        <TeamPanel />
        <p className="muted">Empty state: no applicants yet.</p>
      </section>
    </div>
  );
}
