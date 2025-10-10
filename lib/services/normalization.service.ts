import { TomTomIconCategories } from "@/lib/config/constants";

export class NormalizationService {
	static normalizeTomTomIncident(incident: any) {
		return {
			external_id: incident.properties.id as string,
			source: "TOMTOM" as const,
			city: "Unknown, CA",
			intersection: (incident.properties.to || "Unknown") as string,
			created_at: incident.properties.startTime as string,
			state: "CA",
			event: (TomTomIconCategories[incident.properties.iconCategory] ||
				"Unknown") as string,
			latitude: incident.geometry.coordinates[0][1] as number,
			longitude: incident.geometry.coordinates[0][0] as number,
		};
	}
}
