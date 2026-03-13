import { TrafficReportExample } from "@/types/trafficreport";

export const metricsFixture = {
	success: true,
	data: TrafficReportExample,
};

export const coverageFixture = {
	success: true,
	data: {
		states: [
			{ state: "FL", count: 10 },
			{ state: "GA", count: 5 },
			{ state: "NC", count: 4 },
		],
		cities: [
			{ city: "Miami", state: "FL", count: 4 },
			{ city: "Orlando", state: "FL", count: 3 },
			{ city: "Atlanta", state: "GA", count: 2 },
			{ city: "Charlotte", state: "NC", count: 2 },
		],
		totalStates: 3,
		totalCities: 4,
	},
};

