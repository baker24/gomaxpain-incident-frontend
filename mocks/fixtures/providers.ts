import type { Provider, ProviderPatient } from "@/types/data";

const providers: Provider[] = [
	{
		firstName: "Harmony",
		lastName: "Mir",
		area:
			'{"formatted_address":"600 3rd St SE, Cedar Rapids, IA 52401, USA"}',
		zipcode: "52401",
		practiceName: "Harmony Chiropractic & Wellness",
		type: "DOCTOR",
		lat: 41.9750185,
		lon: -91.6628316,
	},
	{
		firstName: "Rocco",
		lastName: "Scarfone",
		area:
			'{"formatted_address":"261 N University Dr ste 500, Plantation, FL 33324, USA"}',
		zipcode: "33324",
		practiceName: "Scarfone Auto Accident & Personal Injury Attorneys",
		type: "LAWYER",
		lat: 26.123491,
		lon: -80.2572568,
	},
	{
		firstName: "Irvine",
		lastName: "Urgent Care",
		area:
			'{"formatted_address":"2500 Alton Pkwy #101, Irvine, CA 92606, USA"}',
		zipcode: "92606",
		practiceName: "Irvine Urgent Care",
		type: "URGENT_CARE",
		lat: 33.690559,
		lon: -117.836037,
	},
];

const patients: ProviderPatient[] = [
	{
		firstName: "John",
		lastName: "Doe",
		zipcode: "21523",
		target: "12345",
		case: "motorcycle-accident",
		lat: 42.8,
		lon: -73.92,
	},
	{
		firstName: "Jane",
		lastName: "Doe",
		zipcode: "21523",
		target: "67890",
		case: "rideshare-accident",
		lat: 42.82,
		lon: -73.9,
	},
];

export const providersFixture = {
	providers,
	patients,
};

