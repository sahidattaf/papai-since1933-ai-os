"use client";
import React, { useEffect, useState } from 'react';
import { loadContentPlanner, saveContentPlanner } from '../lib/persistence';

export type DayItem = {
  day: string;
  theme: string;
  caption: string;
  status: 'Draft' | 'Scheduled' | 'Published';
};

export function ContentPlanner({ initial }: { initial: Record<string, string> }) {
  const [items, setItems] = useState<DayItem[] | null>(null);

  useEffect(() => {
    async function bootstrap() {
      const loaded = await loadContentPlanner(initial);
      setItems(loaded);
    }

    bootstrap();
  }, [initial]);

  useEffect(() => {
    if (!items) return;
    void saveContentPlanner(items);
  }, [items]);

  function updateItem(day: string, patch: Partial<DayItem>) {
    setItems(prev => prev ? prev.map(it => it.day === day ? {...it, ...patch} : it) : prev);
  }

  function resetToDefault() {
    const defaultItems: DayItem[] = Object.keys(initial).map(day => ({
      day,
      theme: initial[day],
      caption: '',
      status: 'Draft',
    }));
    setItems(defaultItems);
  }

  if (items === null) {
    return <div className="card"><p className="muted">Loading planner…</p></div>;
  }

  if (items.length === 0) {
    return <div className="card"><p className="muted">No planning rhythm available.</p></div>;
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2 className="accent">Weekly Content Planner</h2>
        <div>
          <button onClick={resetToDefault} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.06)',color:'var(--accent)',padding:'6px 10px',borderRadius:6}}>Reset to default</button>
        </div>
      </div>

      <div className="grid">
        {items.map(it => (
          <div key={it.day} className="card">
            <strong>{it.day}</strong>
            <div className="muted" style={{marginBottom:8}}>{it.theme}</div>

            <div>
              <div className="muted">Caption draft</div>
              <textarea value={it.caption} onChange={e=>updateItem(it.day,{caption:e.target.value})} rows={3} style={{width:'100%',marginTop:6}} />
            </div>

            <div style={{marginTop:8}}>
              <div className="muted">Status</div>
              <select value={it.status} onChange={e=>updateItem(it.day,{status: e.target.value as DayItem['status']})} className="input" style={{marginTop:6}}>
                <option>Draft</option>
                <option>Scheduled</option>
                <option>Published</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
