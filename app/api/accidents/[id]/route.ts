import { NextResponse } from "next/server";
import { incidentRepository } from "@/lib/repositories/incident.repository";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const accident = await incidentRepository.getAccidentById(params.id);

		if (!accident) {
			return NextResponse.json(
				{ success: false, error: "Accident not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({
			success: true,
			data: accident,
		});
	} catch (error) {
		console.error("[API] Error fetching accident:", error);
		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
