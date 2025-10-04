import { NextResponse } from "next/server";

const BACKEND_API_URL =
	process.env.BACKEND_API_URL || "http://localhost:3000/api";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const minLat = searchParams.get("minLat");
	const minLng = searchParams.get("minLng");
	const maxLat = searchParams.get("maxLat");
	const maxLng = searchParams.get("maxLng");

	let url = `${BACKEND_API_URL}/incidents?sort=createdAt&order=descending`;

	// If bounds are provided, use search endpoint
	if (minLat && minLng && maxLat && maxLng) {
		// Use the correct parameter order that matches the external API
		url = `${BACKEND_API_URL}/incidents/search?minLng=${minLng}&minLat=${minLat}&maxLng=${maxLng}&maxLat=${maxLat}`;
	}

	try {
		const res = await fetch(url, {
			headers: {
				"ngrok-skip-browser-warning": "true",
			},
		});

		if (!res.ok) {
			return NextResponse.json(
				{ error: "External API error" },
				{ status: res.status }
			);
		}

		const data = await res.json();

		// Limit to top 20 items
		const limitedData = Array.isArray(data) ? data.slice(0, 200) : data;

		return NextResponse.json(limitedData);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 }
		);
	}
}
