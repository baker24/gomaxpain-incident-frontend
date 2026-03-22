export interface State {
	name: string;
	abbr: string;
	latitude: number;
	longitude: number;
}

/** Approximate geographic center per state (map recenter on filter). */
const Kansas: State = {
	name: "Kansas",
	abbr: "KS",
	latitude: 38.5,
	longitude: -98.38,
};

const Kentucky: State = {
	name: "Kentucky",
	abbr: "KY",
	latitude: 37.84,
	longitude: -85.27,
};

const Tennessee: State = {
	name: "Tennessee",
	abbr: "TN",
	latitude: 35.86,
	longitude: -86.35,
};

const Nevada: State = {
	name: "Nevada",
	abbr: "NV",
	latitude: 39.32,
	longitude: -116.63,
};

const NorthCarolina: State = {
	name: "North Carolina",
	abbr: "NC",
	latitude: 35.56,
	longitude: -79.39,
};

const Florida: State = {
	name: "Florida",
	abbr: "FL",
	latitude: 27.95,
	longitude: -81.98,
};

const Utah: State = {
	name: "Utah",
	abbr: "UT",
	latitude: 39.32,
	longitude: -111.09,
};

const Pennsylvania: State = {
	name: "Pennsylvania",
	abbr: "PA",
	latitude: 40.59,
	longitude: -77.21,
};

const Missouri: State = {
	name: "Missouri",
	abbr: "MO",
	latitude: 38.46,
	longitude: -92.29,
};

const Ohio: State = {
	name: "Ohio",
	abbr: "OH",
	latitude: 40.39,
	longitude: -82.79,
};

const Maryland: State = {
	name: "Maryland",
	abbr: "MD",
	latitude: 39.05,
	longitude: -76.64,
};

const Texas: State = {
	name: "Texas",
	abbr: "TX",
	latitude: 31.97,
	longitude: -99.9,
};

const Indiana: State = {
	name: "Indiana",
	abbr: "IN",
	latitude: 39.85,
	longitude: -86.26,
};

/** Filter chips order matches product list: KS, KY, TN, NV, NC, FL, UT, PA, MO, OH, MD, TX, IN */
export const states: State[] = [
	Kansas,
	Kentucky,
	Tennessee,
	Nevada,
	NorthCarolina,
	Florida,
	Utah,
	Pennsylvania,
	Missouri,
	Ohio,
	Maryland,
	Texas,
	Indiana,
];

export default State;
