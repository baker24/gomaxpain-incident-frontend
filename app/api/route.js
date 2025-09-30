import { NextResponse } from "next/server";

const BACKEND_API_URL = process.env.BACKEND_API_URL || "https://7777c93936bc.ngrok-free.app/api";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const minLat = searchParams.get('minLat');
  const minLng = searchParams.get('minLng');
  const maxLat = searchParams.get('maxLat');
  const maxLng = searchParams.get('maxLng');

  let url = `${BACKEND_API_URL}/incidents`;

  // If bounds are provided, use search endpoint
  if (minLat && minLng && maxLat && maxLng) {
    // Use the correct parameter order that matches the external API
    url = `${BACKEND_API_URL}/incidents/search?minLng=${minLng}&minLat=${minLat}&maxLng=${maxLng}&maxLat=${maxLat}`;
  }
  console.log("API Route - Fetching URL:", url);
  
  try {
    const res = await fetch(url, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    console.log("API Route - External API response status:", res.status);
    
    if (!res.ok) {
      console.error("API Route - External API error:", res.status, res.statusText);
      return NextResponse.json({ error: "External API error" }, { status: res.status });
    }
    
    const data = await res.json();
    console.log("API Route - External API data length:", Array.isArray(data) ? data.length : "not array");
    
    // Limit to top 20 items
    const limitedData = Array.isArray(data) ? data.slice(0, 200) : data;
    console.log("API Route - Returning limited data length:", Array.isArray(limitedData) ? limitedData.length : "not array");
    
    return NextResponse.json(limitedData);
  } catch (error) {
    console.error("API Route - Fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
