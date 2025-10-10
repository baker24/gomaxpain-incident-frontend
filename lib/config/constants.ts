export const TOMTOM_API_KEY = process.env.TOMTOM_API_KEY;
export const TOMTOM_API_URL =
	"https://api.tomtom.com/traffic/services/5/incidentDetails";

export const TomTomIconCategories: { [key: number]: string } = {
	0: "Unknown",
	1: "Accident",
	2: "Fog",
	3: "DangerousConditions",
	4: "Rain",
	5: "Ice",
	6: "Jam",
	7: "LaneClosed",
	8: "RoadClosed",
	9: "RoadWorks",
	10: "Wind",
	11: "Flooding",
	14: "BrokenDownVehicle",
};
export const CaliforniaBbox = [
	// Northern California
	"-122.5,37.3,-121.4,38.2", // San Francisco Bay Area
	"-121.8,38.3,-120.7,39.2", // Sacramento Valley
	"-124.3,40.5,-123.2,41.4", // North Coast (Eureka/Humboldt)
	"-122.5,40.3,-121.4,41.2", // Shasta Cascade (Redding)
	"-123.1,38.2,-122.0,39.1", // Wine Country (Santa Rosa/Napa)

	// // Central California
	// "-120.2,36.5,-119.1,37.4", // Central Valley (Fresno)
	// "-122.2,36.5,-121.1,37.4", // Central Coast (Monterey/Santa Cruz)
	// "-120.9,35.2,-119.8,36.1", // San Luis Obispo/Paso Robles
	// "-121.2,37.4,-120.1,38.3", // Central Valley North (Modesto/Stockton)

	// // Southern California
	// "-118.5,33.7,-117.4,34.6", // Los Angeles Basin
	// "-117.6,33.8,-116.5,34.7", // Inland Empire (Riverside/San Bernardino)
	// "-117.3,32.6,-116.2,33.5", // San Diego Area
	// "-119.4,35.1,-118.3,36.0", // South Central Valley (Bakersfield)
	// "-120.1,34.2,-119.0,35.1", // Santa Barbara/Ventura
	// "-117.3,34.5,-116.2,35.4", // High Desert (Victorville/Barstow)
	// "-118.1,33.5,-117.0,34.4", // Orange County
	// "-116.7,33.6,-115.6,34.5", // Coachella Valley (Palm Springs)
	// "-118.4,34.5,-117.3,35.4", // Mojave Desert (Lancaster/Palmdale)
];
