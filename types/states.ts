export interface City {
	name: string;
	latitude: number;
	longitude: number;
}
export interface State {
	name: string;
	latitude: number;
	longitude: number;
	cities: City[];
}

export const California: State = {
	name: "California",
	latitude: 37.7749,
	longitude: -122.4194,
	cities: [
		{ name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
		{ name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
		{ name: "San Diego", latitude: 32.7157, longitude: -117.1611 },
		{ name: "San Jose", latitude: 37.3382, longitude: -121.8863 },
		{ name: "Oakland", latitude: 37.8044, longitude: -122.2711 },
	],
};
export const Florida: State = {
	name: "Florida",
	latitude: 27.9506,
	longitude: -81.9779,
	cities: [
		{ name: "Miami", latitude: 25.7617, longitude: -80.1918 },
		{ name: "Orlando", latitude: 28.5383, longitude: -81.3792 },
		{ name: "Tampa", latitude: 27.9506, longitude: -82.4572 },
		{ name: "Jacksonville", latitude: 30.3322, longitude: -81.6557 },
		{ name: "St. Petersburg", latitude: 27.7731, longitude: -82.6401 },
	],
};

const Texas: State = {
	name: "Texas",
	latitude: 31.9686,
	longitude: -99.9018,
	cities: [
		{ name: "Austin", latitude: 30.2672, longitude: -97.7431 },
		{ name: "Houston", latitude: 29.7604, longitude: -95.3698 },
		{ name: "Dallas", latitude: 32.7767, longitude: -96.797 },
		{ name: "San Antonio", latitude: 29.4241, longitude: -98.4936 },
	],
};

export const states: State[] = [California, Florida, Texas];
export default State;
