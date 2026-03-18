import type { Incident } from "@/types/data";

const incidents: Incident[] = [
	{
		id: "mock-incident-1",
		event: "Accident - Minor",
		city: "Orlando, FL",
		state: "FL",
		zipcode: "32801",
		intersection: "N Orange Ave & E Central Blvd",
		latitude: 28.5473,
		longitude: -81.3801,
		createdAt: new Date().toISOString(),
		license: "ABC123 - FL",
	},
	{
		id: "mock-incident-2",
		event: "Accident - Major",
		city: "Miami, FL",
		state: "FL",
		zipcode: "33137",
		intersection: "Biscayne Blvd & NE 48th St",
		latitude: 25.8188,
		longitude: -80.1885,
		createdAt: new Date().toISOString(),
		license: "XYZ789 - FL",
	},
];

export const incidentsFixture = {
	success: true,
	data: incidents,
};
