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
	const [patients, setPatients] = useState<any>(null);

	const fetchIncident = async () => {
		setLoadState(LoadState.LOADING);
		try {
			const API_URL =
				process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
			// Use new accidents endpoint
			const response = await fetch(`${API_URL}/accidents?limit=100`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			// Extract data from new API format
			setIncident(result.success ? result.data : []);
			setLoadState(LoadState.LOADED);
		} catch (error) {
			logger.error("fetchIncident error:", error);
			setLoadState(LoadState.ERROR);
		}
	};

	const fetchPatients = async () => {
		const API_URL =
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
		const response = await fetch(`${API_URL}/patients`);
		const data = await response.json();
		setPatients(data);
	};

	const fetchTrafficReport = async () => {
		try {
			const API_URL =
				process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
			const response = await fetch(`${API_URL}/metrics`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			// Handle new API format - it now matches TrafficReport interface exactly
			if (result.success && result.data) {
				const trafficData: TrafficReport = {
					apiSources: result.data.apiSources || ["TomTom", "Waze"],
					dataPulls: result.data.dataPulls || {
						perCityPerDay: 24,
						totalCities: 0,
						pullsPerMonth: 0,
						pullsPerDay: 0,
					},
					coverageStates: result.data.coverageStates || [],
					accidentMetrics: result.data.accidentMetrics || {
						accidentsLastHour: 0,
						accidentsToday: 0,
						totalAccidents: 0,
						previousDayAccidents: 0,
						previousDayPercent: "0%",
					},
					coverageCities: result.data.coverageCities || [],
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
	}, []);

	return {
		incident,
		setIncident,
		fetchIncident,
		loadState,
		LoadState,
		fetchPatients,
		patients,
		trafficReport,
		fetchTrafficReport,
	};
}
