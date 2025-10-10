import { NextResponse } from "next/server";
import { IngestionServices } from "@/lib/services/ingestion.services";
import { incidentRepository } from "@/lib/repositories/incident.repository";

export async function POST() {
	try {
		const ingestionServices = new IngestionServices();
		const result = await ingestionServices.ingestIncidents();

		return NextResponse.json({
			success: true,
			message: "Incidents ingested successfully",
			stats: result.stats,
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

export async function GET() {
	try {
		const total = await incidentRepository.getTotalCount();
		const today = await incidentRepository.getIncidentsToday();

		return NextResponse.json({
			total,
			todayCount: today.length,
			recentIncidents: today.slice(0, 10),
		});
	} catch (error) {
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Failed to fetch stats",
			},
			{ status: 500 }
		);
	}
}
