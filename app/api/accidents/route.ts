import { NextResponse } from "next/server";
import { incidentRepository } from "@/lib/repositories/incident.repository";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Parse query parameters
		const eventType = searchParams.get("type");
		const limit = parseInt(searchParams.get("limit") || "50");
		const offset = parseInt(searchParams.get("offset") || "0");
		const sortBy = searchParams.get("sort") || "created_at";
		const order = searchParams.get("order") || "desc";

		// Validate
		if (limit > 100) {
			return NextResponse.json(
				{ error: "Limit cannot exceed 100" },
				{ status: 400 }
			);
		}

		if (offset < 0) {
			return NextResponse.json(
				{ error: "Offset cannot be negative" },
				{ status: 400 }
			);
		}

		// Fetch from database
		const accidents = await incidentRepository.getAccidents({
			eventType,
			limit,
			offset,
			sortBy,
			order,
		});

		const total = await incidentRepository.getTotalCount(eventType);

		return NextResponse.json({
			success: true,
			data: accidents,
			pagination: {
				total,
				limit,
				offset,
				hasMore: offset + limit < total,
			},
		});
	} catch (error) {
		console.error("[API] Error fetching accidents:", error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
