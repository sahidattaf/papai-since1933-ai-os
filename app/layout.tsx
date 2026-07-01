import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Papai Since 1933 — AI OS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-root">
          <aside className="sidebar">
            <div>
              <div className="brand">Papai Since 1933<span>AI OS Command Center</span></div>
            </div>
            <nav>
              <ul>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/reservations">Reservations</Link></li>
                <li><Link href="/content">Content Planner</Link></li>
                <li><Link href="/hiring">Team Intake</Link></li>
                <li><Link href="/reviews">Reviews</Link></li>
                <li><Link href="/settings">Settings</Link></li>
              </ul>
            </nav>
          </aside>
          <main className="main">
            <div className="page-inner">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
