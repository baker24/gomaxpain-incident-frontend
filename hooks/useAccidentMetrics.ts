"use client";

import { useState, useEffect } from "react";
import { logger } from "@/services/logger";

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
				const API_URL =
					process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
				const response = await fetch(`${API_URL}/metrics`);

				if (!response.ok) {
					throw new Error("Failed to fetch metrics");
				}

				const response_data = await response.json();
				logger.info("Metrics data:", response_data);

				// API returns {success: true, data: {...}}
				const data = response_data.data || response_data;

				setMetrics({
					accidentsToday: data.todayCount || 0,
					accidentsLastHour: data.lastHourCount || 0,
					previousDayAccidents: data.previousDayAccidents || 0,
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
