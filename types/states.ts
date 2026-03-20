export interface State {
	name: string;
	abbr: string;
	latitude: number;
	longitude: number;
}

export const California: State = {
	name: "California",
	abbr: "CA",
	latitude: 37.7749,
	longitude: -122.4194,
};
export const Florida: State = {
	name: "Florida",
	abbr: "FL",
	latitude: 27.9506,
	longitude: -81.9779,
};

const NewYork: State = {
	name: "New York",
	abbr: "NY",
	latitude: 41.9128,
	longitude: -74.006,
};

const Maryland: State = {
	name: "Maryland",
	abbr: "MD",
	latitude: 39.0458,
	longitude: -76.6413,
};

const Utah: State = {
	name: "Utah",
	abbr: "UT",
	latitude: 40.7608,
	longitude: -111.891,
};

const Georgia: State = {
	name: "Georgia",
	abbr: "GA",
	latitude: 33.749,
	longitude: -84.388,
};

const NorthCarolina: State = {
	name: "North Carolina",
	abbr: "NC",
	latitude: 35.7796,
	longitude: -78.6382,
};

const SouthCarolina: State = {
	name: "South Carolina",
	abbr: "SC",
	latitude: 34.0007,
	longitude: -81.0348,
};

const NewJersey: State = {
	name: "New Jersey",
	abbr: "NJ",
	latitude: 40.2204,
	longitude: -74.7594,
};

const Virginia: State = {
	name: "Virginia",
	abbr: "VA",
	latitude: 37.4316,
	longitude: -78.6569,
};

const Philadelphia: State = {
	name: "Pennsylvania",
	abbr: "PA",
	latitude: 39.9526,
	longitude: -75.1652,
};

const Texas: State = {
	name: "Texas",
	abbr: "TX",
	latitude: 31.9686,
	longitude: -99.9018,
};

const LasVegas: State = {
	name: "Nevada",
	abbr: "NV",
	latitude: 36.1699,
	longitude: -115.1398,
};

const KansasCity: State = {
	name: "Missouri",
	abbr: "MO",
	latitude: 39.0997,
	longitude: -94.5786,
};

export const states: State[] = [
	California,
	Florida,
	NewYork,
	Utah,
	Georgia,
	NorthCarolina,
	SouthCarolina,
	NewJersey,
	Maryland,
	Virginia,
	Philadelphia,
	Texas,
	LasVegas,
	KansasCity,
];
export default State;
