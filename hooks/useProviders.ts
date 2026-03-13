"use client";
import { useEffect, useState } from "react";
import { Provider, ProviderPatient } from "@/types/data";
import { logger } from "@/services/logger";
import { providersFixture } from "@/mocks/fixtures/providers";

interface UseProvidersResult {
	providers: Provider[] | null;
	patients: ProviderPatient[] | null;
	loading: boolean;
	error: string | null;
}

export default function useProviders(): UseProvidersResult {
	const [providers, setProviders] = useState<Provider[] | null>(null);
	const [patients, setPatients] = useState<ProviderPatient[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProviders = async () => {
			try {
				if (process.env.NEXT_PUBLIC_USE_MOCKS === "true") {
					setProviders(providersFixture.providers);
					setPatients(providersFixture.patients);
					setError(null);
					setLoading(false);
					return;
				}

				const API_URL =
					process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
				const response = await fetch(`${API_URL}/providers`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				const providerList: Provider[] = result.providers ?? [];
				const patientList: ProviderPatient[] = result.patients ?? [];
				setProviders(providerList);
				setPatients(patientList);
				logger.info("Providers fetched", {
					providers: providerList.length,
					patients: patientList.length,
				});
				setError(null);
			} catch (err) {
				logger.error("fetchProviders error:", err);
				setError(err instanceof Error ? err.message : "Unknown error");
				setProviders(null);
				setPatients(null);
			} finally {
				setLoading(false);
			}
		};
		fetchProviders();
	}, []);

	return { providers, patients, loading, error };
}
