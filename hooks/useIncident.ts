"use client";
import { logger } from "@/services/logger";
import { TrafficReport } from "@/types/trafficreport";
import { useState, useEffect } from "react";

// LoadState enum
const LoadState = {
	LOADING: "loading",
	LOADED: "loaded",
	ERROR: "error",
};

export default function useIncident() {
	const [trafficReport, setTrafficReport] = useState<TrafficReport | null>(
		null
	);
	const [incident, setIncident] = useState<any>(null);
	const [loadState, setLoadState] = useState(LoadState.LOADING);
	const [count, setCount] = useState(0);
	const [patients, setPatients] = useState<any>(null);

	const fetchIncident = async () => {
		setLoadState(LoadState.LOADING);
		try {
			// Use new accidents endpoint
			const response = await fetch(`/api/accidents?limit=100`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			// Extract data from new API format
			setIncident(result.success ? result.data : []);
			setLoadState(LoadState.LOADED);
			setCount(count + 1);
		} catch (error) {
			logger.error("fetchIncident error:", error);
			setLoadState(LoadState.ERROR);
		}
	};

	const fetchIncidentByBounds = async (
		minLat: number,
		minLng: number,
		maxLat: number,
		maxLng: number
	) => {
		setLoadState(LoadState.LOADING);
		try {
			setIncident(null);

			// Use new accidents endpoint
			const response = await fetch(`/api/accidents?limit=100`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			// Filter by bounds on client side
			if (result.success && result.data) {
				const filtered = result.data.filter(
					(accident: any) =>
						accident.latitude >= minLat &&
						accident.latitude <= maxLat &&
						accident.longitude >= minLng &&
						accident.longitude <= maxLng
				);
				setIncident(filtered);
			} else {
				setIncident([]);
			}

			setLoadState(LoadState.LOADED);
		} catch (error) {
			logger.error("fetchIncidentByBounds error:", error);
			setLoadState(LoadState.ERROR);
		}
	};

	const fetchPatients = async () => {
		const response = await fetch(`/api/patients`);
		const data = await response.json();
		setPatients(data);
	};

	const fetchTrafficReport = async () => {
		try {
			const response = await fetch(`/api/metrics`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			// Handle new API format
			if (result.success && result.data) {
				// Map new format to old TrafficReport format
				const trafficData: TrafficReport = {
					apiSources: ["TomTom"],
					dataPulls: {
						perCityPerDay: 4,
						totalCities: 5,
						pullsPerMonth: 720,
						pullsPerDay: 24,
					},
					coverageStates: ["CA"],
					accidentMetrics: {
						accidentsLastHour: result.data.lastHourCount || 0,
						accidentsToday: result.data.todayCount || 0,
						totalAccidents: result.data.total || 0,
						previousDayAccidents: result.data.previousDayAccidents || 0,
						previousDayPercent: result.data.previousDayPercent || "0%",
					},
					coverageCities: ["San Francisco", "Oakland", "Sacramento"],
				};
				setTrafficReport(trafficData);
			}
		} catch (error) {
			logger.error("fetchTrafficReport error:", error);
			// Set null on error to avoid crashes
			setTrafficReport(null);
		}
	};

	useEffect(() => {
		fetchIncident();
		fetchTrafficReport();
		const interval = setInterval(fetchIncident, 1000000);
		return () => clearInterval(interval);
	}, []);

	return {
		incident,
		setIncident,
		fetchIncident,
		fetchIncidentByBounds,
		loadState,
		LoadState,
		fetchPatients,
		patients,
		trafficReport,
		fetchTrafficReport,
	};
}
