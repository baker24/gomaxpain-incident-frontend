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

export type ProviderType =
	| "DOCTOR"
	| "LAWYER"
	| "URGENT_CARE"
	| "MARKETER"
	| "ADMIN";

export interface Provider {
	firstName: string;
	lastName: string;
	area: string | null;
	zipcode: string;
	practiceName: string;
	type: ProviderType;
	lat: number;
	lon: number;
}

export interface ProviderPatient {
	firstName: string;
	lastName: string;
	zipcode: string;
	target: string;
	case: string;
	lat: number;
	lon: number;
}

