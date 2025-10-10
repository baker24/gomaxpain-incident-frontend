import { query } from "@/lib/db";
import { Incident } from "@/types/data";

export class IncidentRepository {
	async createIncident(incident: {
		external_id: string;
		source: "TOMTOM" | "WAZE";
		intersection: string;
		city: string;
		state: string;
		latitude: number;
		longitude: number;
		event: string;
		created_at: string;
	}) {
		// Added ON CONFLICT to handle duplicates gracefully
		const result = await query(
			`INSERT INTO incidents (
				external_id, source, intersection, city, state, 
				latitude, longitude, event, created_at
			) 
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
			ON CONFLICT (external_id) 
			DO UPDATE SET
				intersection = EXCLUDED.intersection,
				city = EXCLUDED.city,
				latitude = EXCLUDED.latitude,
				longitude = EXCLUDED.longitude,
				event = EXCLUDED.event,
				updated_at = NOW()
			RETURNING *`,
			[
				incident.external_id,
				incident.source,
				incident.intersection,
				incident.city,
				incident.state,
				incident.latitude,
				incident.longitude,
				incident.event,
				incident.created_at,
			]
		);
		return result;
	}

	async bulkCreateIncidents(
		incidents: Array<{
			external_id: string;
			source: "TOMTOM" | "WAZE";
			intersection: string;
			city: string;
			state: string;
			latitude: number;
			longitude: number;
			event: string;
			created_at: string;
		}>
	) {
		let inserted = 0;

		// Now handles duplicates gracefully
		for (const incident of incidents) {
			try {
				await this.createIncident(incident);
				inserted++;
			} catch (error) {
				console.error("Error inserting incident:", error);
			}
		}
		return inserted;
	}

	getIncidentsToday = async () => {
		const result = await query(
			"SELECT * FROM incidents WHERE created_at >= CURRENT_DATE",
			[]
		);
		return result.rows.map((row) => ({
			id: row.external_id,
			event: row.event,
			city: row.city,
			intersection: row.intersection,
			latitude: parseFloat(row.latitude),
			longitude: parseFloat(row.longitude),
			createdAt: row.created_at,
		}));
	};

	getIncidentsLastHour = async () => {
		const result = await query(
			"SELECT * FROM incidents WHERE created_at >= NOW() - INTERVAL '1 hour'",
			[]
		);
		return result.rows.map((row) => ({
			id: row.external_id,
			event: row.event,
			city: row.city,
			intersection: row.intersection,
			latitude: parseFloat(row.latitude),
			longitude: parseFloat(row.longitude),
			createdAt: row.created_at,
		}));
	};

	getTotalCount = async (eventType?: string | null): Promise<number> => {
		let queryText = "SELECT COUNT(*) as count FROM incidents";
		const params: any[] = [];

		if (eventType) {
			params.push(eventType);
			queryText += ` WHERE event = $1`;
		}

		const result = await query(queryText, params);
		return parseInt(result.rows[0].count);
	};

	async getAccidents(options: {
		eventType?: string | null;
		limit?: number;
		offset?: number;
		sortBy?: string;
		order?: string;
	}) {
		const {
			eventType,
			limit = 50,
			offset = 0,
			sortBy = "created_at",
			order = "desc",
		} = options;

		let queryText = `
			SELECT 
				external_id as id,
				event,
				city,
				intersection,
				latitude,
				longitude,
				created_at as "createdAt"
			FROM incidents
		`;

		const params: any[] = [];
		const conditions: string[] = [];

		// Filter by event type
		if (eventType) {
			params.push(eventType);
			conditions.push(`event = $${params.length}`);
		}

		// Add WHERE clause if conditions exist
		if (conditions.length > 0) {
			queryText += ` WHERE ${conditions.join(" AND ")}`;
		}

		// Add ORDER BY
		queryText += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;

		// Add LIMIT and OFFSET
		params.push(limit, offset);
		queryText += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

		const result = await query(queryText, params);

		return result.rows.map((row) => ({
			id: row.id,
			event: row.event,
			city: row.city,
			intersection: row.intersection,
			latitude: parseFloat(row.latitude),
			longitude: parseFloat(row.longitude),
			createdAt: row.createdAt,
		}));
	}

	async getAccidentById(id: string) {
		const result = await query(
			`SELECT 
				external_id as id,
				event,
				city,
				state,
				intersection,
				latitude,
				longitude,
				created_at as "createdAt",
				updated_at as "updatedAt",
				raw_data as "rawData"
			FROM incidents 
			WHERE external_id = $1`,
			[id]
		);

		if (result.rows.length === 0) {
			return null;
		}

		const row = result.rows[0];
		return {
			id: row.id,
			event: row.event,
			city: row.city,
			state: row.state,
			intersection: row.intersection,
			latitude: parseFloat(row.latitude),
			longitude: parseFloat(row.longitude),
			createdAt: row.createdAt,
			updatedAt: row.updatedAt,
			rawData: row.rawData,
		};
	}

	getAccidentsByType = async () => {
		const result = await query(
			`SELECT 
				event as type,
				COUNT(*) as count
			FROM incidents
			GROUP BY event
			ORDER BY count DESC`,
			[]
		);

		return result.rows.map((row) => ({
			type: row.type,
			count: parseInt(row.count),
		}));
	};
}

export const incidentRepository = new IncidentRepository();
