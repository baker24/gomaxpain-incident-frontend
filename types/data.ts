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
	state: string;
	zipcode: string;
	intersection: string;
	latitude: number;
	longitude: number;
	createdAt: string;
	license: string;
};

export type IncidentDB = {
	id: string;
	event: string;
	city: string;
	state: string;
	zipcode: string;
	intersection: string;
	latitude: number;
	longitude: number;
	created_at: string;
	external_id: string;
	source: "TOMTOM" | "WAZE";
	updated_at: string;
	license?: string;
};
