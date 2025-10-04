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
	const [incident, setIncident] = useState(null);
	const [loadState, setLoadState] = useState(LoadState.LOADING);
	const [count, setCount] = useState(0);
	const [patients, setPatients] = useState(null);

	const fetchIncident = async () => {
		setLoadState(LoadState.LOADING);
		try {
			const response = await fetch(`/api`);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			setIncident(data);
			setLoadState(LoadState.LOADED);
			setCount(count + 1);
		} catch (error) {
			logger.error("fetchIncident error:", error);
			setLoadState(LoadState.ERROR);
		}
	};

	const fetchIncidentByBounds = async (minLat, minLng, maxLat, maxLng) => {
		setLoadState(LoadState.LOADING);
		try {
			setIncident(null);

			const response = await fetch(
				`/api?minLat=${minLat}&minLng=${minLng}&maxLat=${maxLat}&maxLng=${maxLng}`
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			setIncident(data);
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
		const response = await fetch(`/api/metrics`);
		const data: TrafficReport = await response.json();
		setTrafficReport(data);
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
