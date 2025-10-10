import { NextResponse } from "next/server";

// This endpoint is deprecated - use /api/accidents instead
// Keeping for backward compatibility
export async function GET() {
	return NextResponse.json({
		message: "This endpoint is deprecated. Use /api/accidents instead",
		endpoints: {
			accidents: "/api/accidents",
			metrics: "/api/metrics",
			ingestion: "/api/ingestion",
		},
	});
}
