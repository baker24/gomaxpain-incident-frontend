const WAZE_API_URL = "https://api.waze.com/getUrgentIncidents";
export async function fetchWaze() {
    const response = await fetch(WAZE_API_URL);
    const data = await response.json();
    return data.incidents[0];
    
}