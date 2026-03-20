"use client";
import { useCallback, useEffect, useState } from "react";
import { logger } from "@/services/logger";
import { Incident } from "@/types/data";
import { TrafficReport } from "@/types/trafficreport";
import { incidentsFixture } from "@/mocks/fixtures/incidents";
import { metricsFixture } from "@/mocks/fixtures/metrics";

// LoadState enum
const LoadState = {
	LOADING: "loading",
	LOADED: "loaded",
	ERROR: "error",
};

type UseIncidentArgs = {
	stateCodes?: string[] | null;
	timelineHours?: number;
};

export default function useIncident({
	stateCodes = null,
	timelineHours = 168,
}: UseIncidentArgs = {}) {
	const [trafficReport, setTrafficReport] = useState<TrafficReport | null>(
		null,
	);
	const [incident, setIncident] = useState<Incident[] | null>(null);
	const [loadState, setLoadState] = useState(LoadState.LOADING);

	const fetchIncident = useCallback(async () => {
		setLoadState(LoadState.LOADING);
		try {
			const API_URL =
				process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

			const params = new URLSearchParams({
				limit: "500",
				timeline: String(timelineHours),
			});

			if (stateCodes && stateCodes.length > 0) {
				params.set("states", JSON.stringify(stateCodes));
			}

			const accidentsUrl = `${API_URL}/accidents?${params.toString()}`;
			console.log(
				"[useIncident] fetch incidents",
				{ stateCodes, timelineHours },
				accidentsUrl,
			);
			const response = await fetch(accidentsUrl);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			// Extract data from new API format
			setIncident((result.success ? result.data : []) as Incident[]);
			setLoadState(LoadState.LOADED);
		} catch (error) {
			logger.error("fetchIncident error:", error);
			setLoadState(LoadState.ERROR);
		}
	}, [stateCodes, timelineHours]);

	const fetchTrafficReport = async () => {
		try {
			if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
				setTrafficReport(metricsFixture.data as TrafficReport);
				return;
			}

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
		fetchTrafficReport();
	}, []);

	useEffect(() => {
		fetchIncident();
	}, [fetchIncident]);

	return {
		incident,
		setIncident,
		fetchIncident,
		loadState,
		LoadState,
		trafficReport,
		fetchTrafficReport,
	};
}
