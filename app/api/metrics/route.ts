import { NextResponse } from "next/server";

const BACKEND_API_URL =
	process.env.BACKEND_API_URL || "http://localhost:3000/api";

export async function GET() {
	const response = await fetch(`${BACKEND_API_URL}/incidents/traffic-report`);
	const data = await response.json();
	return NextResponse.json(data);
}
