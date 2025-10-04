export type UnifiedIncident = {
	id: string;
	source: "WAZE" | "TOMTOM";
	timestamp: number;
	type: string;
	description: string;
	latitude: number;
	longitude: number;
};

export type Incident = {
	id: string;
	event: string;
	city: string;
	intersection: string;
	latitude: number;
	longitude: number;
	createdAt: string;
};
