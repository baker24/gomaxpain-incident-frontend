import axios from "axios";
import { TOMTOM_API_KEY, TOMTOM_API_URL } from "@/lib/config/constants";
import { logger } from "@/services/logger";

export class TomTomServices {
	async fetchIncidents(bbox: string) {
		try {
			// categoryFilter=1 filters for ACCIDENTS ONLY
			// Remove categoryFilter to get all incident types
			const url = `${TOMTOM_API_URL}?key=${TOMTOM_API_KEY}&bbox=${bbox}&categoryFilter=1&fields={incidents{type,geometry{type,coordinates},properties{id,startTime,iconCategory,to}}}&language=en-GB&t=1111&timeValidityFilter=present`;
			const response = await axios.get(url, { timeout: 10000 });
			logger.info("TomTom accidents fetched successfully", {
				bbox,
				count: response.data.incidents?.length || 0,
			});
			return response.data;
		} catch (error) {
			logger.error("Error fetching TomTom incidents", { bbox, error });
			throw new Error("Error fetching TomTom incidents with bbox: ${bbox}");
		}
	}

	async fetchMultipleIncidents(bboxes: string[]) {
		const results = await Promise.allSettled(
			bboxes.map((bbox) => this.fetchIncidents(bbox))
		);
		const incidents = results.map((result) =>
			result.status === "fulfilled" ? result.value : null
		);

		logger.info("TomTom incidents fetched successfully", {
			total: incidents.length,
			bboxesCount: bboxes.length,
		});
		return incidents;
	}
}

export const tomTomServices = new TomTomServices();
