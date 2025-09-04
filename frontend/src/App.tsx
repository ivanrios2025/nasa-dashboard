// src/App.tsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import type { Neo } from './types.js';

// 1 — Sort key and order types
type SortKey = 'size' | 'closest' | 'velocity';
type SortOrder = 'asc' | 'desc';

const API_BASE = 'http://localhost:3000';

const App: React.FC = () => {
  // 2 — Date picker state
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState<string>(today);
  const [endDate, setEndDate] = useState<string>(today);

  // 3 — Data fetch state
  const [neos, setNeos] = useState<Neo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // 4 — Sorting state
  const [sortKey, setSortKey] = useState<SortKey>('size');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // 5 — Fetch function
  const fetchNeos = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await axios.get<Neo[]>(API_BASE, {
        params: { start_date: startDate, end_date: endDate },
      });
      setNeos(resp.data);
    } catch (err: any) {
      // handle Axios or network errors
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 6 — Initial load
  useEffect(() => {
    fetchNeos();
  }, []);

  // 7 — Memoized sorting
  const sortedNeos = useMemo(() => {
    return [...neos].sort((a, b) => {
      let diff: number;
      switch (sortKey) {
        case 'size':
          const avgA = (a.sizeMeters.min + a.sizeMeters.max) / 2;
          const avgB = (b.sizeMeters.min + b.sizeMeters.max) / 2;
          diff = avgA - avgB;
          break;
        case 'closest':
          diff = a.closestKm - b.closestKm;
          break;
        case 'velocity':
          diff = a.velocityKph - b.velocityKph;
          break;
      }
      return sortOrder === 'asc' ? diff : -diff;
    });
  }, [neos, sortKey, sortOrder]);

  // 8 — Render UI
  return (
    <>
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>NASA Near-Earth Objects</h1>

      {/* Date Pickers & Fetch Button */}
      <div style={{ marginBottom: 20 }}>
        <label>
          Start:&nbsp;
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        </label>
        <label style={{ marginLeft: 16 }}>
          End:&nbsp;
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
        </label>
        <button onClick={fetchNeos} disabled={loading} style={{ marginLeft: 16 }}>
          {loading ? 'Loading…' : 'Fetch'}
        </button>
      </div>

      {/* Sort Controls */}
      <div style={{ marginBottom: 20 }}>
        <label>
          Sort by:&nbsp;
          <select value={sortKey} onChange={e => setSortKey(e.target.value as SortKey)}>
            <option value="size">Size</option>
            <option value="closest">Closeness</option>
            <option value="velocity">Velocity</option>
          </select>
        </label>
        <button
          onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
          style={{ marginLeft: 16 }}
        >
          {sortOrder === 'asc' ? '⬆️ Ascending' : '⬇️ Descending'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Data Table */}
      {!error && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc' }}>Name</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Size (m)</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Missed By (km)</th>
              <th style={{ borderBottom: '1px solid #ccc' }}>Velocity (km/h)</th>
            </tr>
          </thead>
          <tbody>
            {sortedNeos.map((neo, idx) => (
              <tr key={idx}>
                <td style={{ padding: '8px 4px' }}>{neo.name}</td>
                <td style={{ padding: '8px 4px' }}>
                  {neo.sizeMeters.min.toFixed(1)} – {neo.sizeMeters.max.toFixed(1)}
                </td>
                <td style={{ padding: '8px 4px' }}>{neo.closestKm.toFixed(0)}</td>
                <td style={{ padding: '8px 4px' }}>{neo.velocityKph.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default App;
