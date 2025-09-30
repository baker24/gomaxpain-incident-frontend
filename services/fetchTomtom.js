// import fields from "@/types/tomtomfields.json";

const apiKey = process.env.TOMTOM_API_KEY;
const bbox = "4.8854592519716675,52.36934334773164,4.897883244144765,52.37496348620152";
const fields = `{incidents{type,geometry{type,coordinates},properties{iconCategory,probabilityOfOccurrence,startTime}}}`;
const TOMTOM_API_URL = `https://api.tomtom.com/traffic/services/5/incidentDetails?key=${apiKey}&bbox=${bbox}&fields=${fields}&language=en-GB&t=1111&timeValidityFilter=present`;


export async function fetchTomtom() {
    const response = await fetch(TOMTOM_API_URL);
    const data = await response.json();
    return data.incidents[0];
    
}
