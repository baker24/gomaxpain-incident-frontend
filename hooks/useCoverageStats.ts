"use client";

import { useState, useEffect } from "react";
import { logger } from "@/services/logger";

interface CityStats {
	city: string;
	state: string;
	count: number;
}

interface StateStats {
	state: string;
	count: number;
}

interface CoverageStats {
	states: StateStats[];
	cities: CityStats[];
	totalStates: number;
	totalCities: number;
}

export function useCoverageStats() {
	const [coverageStats, setCoverageStats] = useState<CoverageStats | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchCoverageStats() {
			try {
				setLoading(true);
				const API_URL =
					process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
				const response = await fetch(`${API_URL}/metrics/coverage`);

				if (!response.ok) {
					throw new Error("Failed to fetch coverage stats");
				}

				const response_data = await response.json();
				logger.info("Coverage stats data:", response_data);

				// API returns {success: true, data: {...}}
				const data = response_data.data || response_data;

				setCoverageStats(data);
				setError(null);
			} catch (err) {
				console.error("Error fetching coverage stats:", err);
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		}

		fetchCoverageStats();

		// Refresh every 5 minutes
		const interval = setInterval(fetchCoverageStats, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	return { coverageStats, loading, error };
}
