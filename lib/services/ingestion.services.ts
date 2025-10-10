import { TomTomServices } from "@/lib/services/tomtom.services";
import { CaliforniaBbox } from "@/lib/config/constants";
import { NormalizationService } from "@/lib/services/normalization.service";
import { IncidentRepository } from "@/lib/repositories/incident.repository";
import { logger } from "@/services/logger";

export class IngestionServices {
	async ingestIncidents() {
		try {
			const tomtomServices = new TomTomServices();
			const incidentRepository = new IncidentRepository();

			// Fetch from TomTom
			const responses = await tomtomServices.fetchMultipleIncidents(
				CaliforniaBbox
			);

			// Extract incidents from responses and flatten
			const allIncidents = responses
				.filter((response) => response !== null)
				.flatMap((response) => response.incidents || []);

			logger.info("Fetched incidents from TomTom", {
				count: allIncidents.length,
			});

			// Normalize each incident
			const normalizedResponses = allIncidents.map((incident) =>
				NormalizationService.normalizeTomTomIncident(incident)
			);

			// Save to database
			const inserted = await incidentRepository.bulkCreateIncidents(
				normalizedResponses
			);

			logger.info("Incidents saved to database", { inserted });

			return {
				success: true,
				message: "Incidents ingested successfully",
				stats: {
					fetched: allIncidents.length,
					inserted,
				},
			};
		} catch (error) {
			logger.error("Error ingesting incidents", error);
			throw error;
		}
	}
}
