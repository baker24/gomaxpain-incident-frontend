import { NextResponse } from "next/server";
import { incidentRepository } from "@/lib/repositories/incident.repository";

export async function GET() {
	try {
		const [total, today, lastHour, byType] = await Promise.all([
			incidentRepository.getTotalCount(),
			incidentRepository.getIncidentsToday(),
			incidentRepository.getIncidentsLastHour(),
			incidentRepository.getAccidentsByType(),
		]);

		return NextResponse.json({
			success: true,
			data: {
				total,
				todayCount: today.length,
				lastHourCount: lastHour.length,
				previousDayAccidents: 0, // Can implement later
				previousDayPercent: "0%",
				byType,
			},
		});
	} catch (error) {
		console.error("[API] Error fetching metrics:", error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
