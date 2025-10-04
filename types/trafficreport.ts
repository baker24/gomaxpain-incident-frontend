export interface TrafficReport {
	apiSources: string[];
	dataPulls: {
		perCityPerDay: number;
		totalCities: number;
		pullsPerMonth: number;
		pullsPerDay: number;
	};
	coverageStates: string[];
	accidentMetrics: {
		accidentsLastHour: number;
		accidentsToday: number;
		totalAccidents: number;
		previousDayAccidents: number;
		previousDayPercent: string; // can also be number if you convert "1.125%" to 0.01125
	};
	coverageCities: string[];
}

export const TrafficReportExample: TrafficReport = {
	apiSources: ["Waze", "TomTom"],
	dataPulls: {
		perCityPerDay: 4,
		totalCities: 17,
		pullsPerMonth: 2040,
		pullsPerDay: 68,
	},
	coverageStates: ["FL", "GA", "NC"],
	accidentMetrics: {
		accidentsLastHour: 35,
		accidentsToday: 210,
		totalAccidents: 16000,
		previousDayAccidents: 180,
		previousDayPercent: "1.125%",
	},
	coverageCities: [
		"Miami",
		"Orlando",
		"Tampa",
		"Atlanta",
		"Charlotte",
		"Raleigh",
		"Jacksonville",
		"Tallahassee",
		"Boca Raton",
		"Fort Lauderdale",
		"Palm Beach",
		"West Palm Beach",
		"Delray Beach",
		"Boynton Beach",
		"Boca Raton",
		"Fort Lauderdale",
		"Palm Beach",
		"West Palm Beach",
		"Delray Beach",
		"Boynton Beach",
		"Boca Raton",
		"Fort Lauderdale",
		"Palm Beach",
		"West Palm Beach",
		"Delray Beach",
		"Boynton Beach",
	],
};
