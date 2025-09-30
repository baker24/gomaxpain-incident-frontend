export type UnifiedIncident = {
    id: string,
    source: "WAZE" | "TOMTOM",
    timestamp: number,
    type: string
    description: string,
    latitude: number,
    longitude: number,
}
