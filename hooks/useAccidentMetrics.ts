"use client";

import { useState, useEffect } from "react";

export function useAccidentMetrics() {
	const [metrics, setMetrics] = useState({
		accidentsToday: 0,
		accidentsLastHour: 0,
		previousDayAccidents: 0,
		totalAccidents: 0,
	});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchMetrics() {
			try {
				setLoading(true);
				const response = await fetch("/api/ingestion");

				if (!response.ok) {
					throw new Error("Failed to fetch metrics");
				}

				const data = await response.json();

				setMetrics({
					accidentsToday: data.todayCount || 0,
					accidentsLastHour: 0, // Will implement this later
					previousDayAccidents: 0, // Will implement this later
					totalAccidents: data.total || 0,
				});
				setError(null);
			} catch (err) {
				console.error("Error fetching metrics:", err);
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		}

		fetchMetrics();

		// Refresh every 5 minutes
		const interval = setInterval(fetchMetrics, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	return { ...metrics, loading, error };
}
