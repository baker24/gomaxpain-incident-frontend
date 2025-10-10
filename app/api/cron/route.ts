import { NextResponse } from "next/server";
import { IngestionServices } from "@/lib/services/ingestion.services";

export async function GET(request: Request) {
	// Security: Only allow Vercel Cron to trigger this
	const authHeader = request.headers.get("authorization");

	if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
		console.log("[CRON] Unauthorized attempt");
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		console.log("[CRON] Starting scheduled ingestion...");

		const ingestionServices = new IngestionServices();
		const result = await ingestionServices.ingestIncidents();

		console.log("[CRON] Ingestion completed successfully", result.stats);

		return NextResponse.json({
			success: true,
			message: "Scheduled ingestion completed",
			timestamp: new Date().toISOString(),
			stats: result.stats,
		});
	} catch (error) {
		console.error("[CRON] Ingestion failed:", error);

		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		);
	}
}
