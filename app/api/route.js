import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const minLat = searchParams.get('minLat');
  const minLng = searchParams.get('minLng');
  const maxLat = searchParams.get('maxLat');
  const maxLng = searchParams.get('maxLng');

  let url = "https://7777c93936bc.ngrok-free.app/api/incidents";

  // If bounds are provided, use search endpoint
  if (minLat && minLng && maxLat && maxLng) {
    // Use the correct parameter order that matches the external API
    url = `https://7777c93936bc.ngrok-free.app/api/incidents/search?minLng=${minLng}&minLat=${minLat}&maxLng=${maxLng}&maxLat=${maxLat}`;
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

// export async function GET_SEARCH(request) {
//   const { minLat, minLng, maxLat, maxLng } = await request.json();
  
//   const res = await fetch(`https://7777c93936bc.ngrok-free.app/api/incidents/search?minLat=${minLat}&minLng=${minLng}&maxLat=${maxLat}&maxLng=${maxLng}`);
//   const data = await res.json();
//   return NextResponse.json(data);
// }