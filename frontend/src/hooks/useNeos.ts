import { useState, useEffect } from 'react';
import type { Neo } from '../types.js';

export function useNeos(startDate: string, endDate: string) {
  const [neos, setNeos] = useState<Neo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    });

    fetch(`/api?${params.toString()}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        setNeos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [startDate, endDate]);

  return { neos, loading, error };
}
