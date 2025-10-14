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

const NewYork: State = {
	name: "New York",
	latitude: 41.9128,
	longitude: -74.006,
	cities: [
		{ name: "New York", latitude: 40.7128, longitude: -74.006 },
		{ name: "Brooklyn", latitude: 40.6925, longitude: -73.977 },
		{ name: "Queens", latitude: 40.7282, longitude: -73.7949 },
		{ name: "Bronx", latitude: 40.8505, longitude: -73.8696 },
		{ name: "Staten Island", latitude: 40.5795, longitude: -74.1502 },
	],
};

export const states: State[] = [California, Florida, NewYork];
export default State;
