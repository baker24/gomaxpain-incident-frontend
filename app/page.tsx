"use client";
import Image from "next/image";
import Map from "@/app/components/map/map";
import Table from "@/app/components/table/table";
import useIncident from "@/hooks/useIncident";
import useProviders from "@/hooks/useProviders";
import IncidentPopup from "@/app/components/table/incidentpopup";
import { useState } from "react";
import { Incident } from "@/types/data";
import StatsPanel from "@/app/components/stats/stats-panel";
import { logger } from "@/services/logger";

export default function Home() {
	const { incident, loadState, LoadState, trafficReport } = useIncident();
	const { providers, patients: providerPatients } = useProviders();
	const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
		null,
	);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [showStats, setShowStats] = useState(false);

	// Use backend metrics directly - no client-side calculation needed
	// Backend already calculates all metrics from full database

	const handleSelectIncident = (incident: Incident) => {
		setSelectedIncident(incident);
		setIsPopupOpen(true);
	};
	const handleClosePopup = () => {
		setIsPopupOpen(false);
		setSelectedIncident(null);
	};
	logger.info("Traffic Report", trafficReport);
	return (
		<div className="min-h-screen bg-background grid-bg p-6">
			<div className="mb-6 justify-between">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src="/logo.png"
							alt="HelpAfterAccident logo"
							width={190}
							height={60}
							className="h-auto w-auto max-h-16"
							priority
						/>
						<h1 className="text-3xl font-bold text-foreground ">
							<span className="text-primary">HEATMAP</span>
						</h1>
					</div>
					<button onClick={() => setShowStats(!showStats)}>
						{showStats ? "Hide" : "Show"} Metrics
					</button>
				</div>
				<div className="h-px bg-secondary my-4" />
			</div>

			<div className="grid grid-cols-12 gap-4">
				<div
					className={`${showStats ? "col-span-8" : "col-span-12"} space-y-6`}>
					<Map
						incident={incident}
						providers={providers}
						providerPatients={providerPatients}
					/>
					<div>
						<h2 className="text-2xl font-bold text-foreground font-mono">
							Incident <span className="text-primary">Table</span>
						</h2>
						<div className="h-px bg-primary/20 my-3" />
						{/* <h2 className="text-2xl font-bold text-foreground">Incidents</h2> */}
						<div className=" mt-6 border border-primary/20 rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm">
							{loadState === LoadState.LOADING && (
								<div className="p-8 flex items-center justify-center">
									<div className="flex items-center gap-3 text-primary font-mono">
										<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
										Loading incidents...
									</div>
								</div>
							)}

							{loadState === LoadState.ERROR && (
								<div className="p-8 flex items-center justify-center">
									<div className="text-red-500 font-mono">
										Error loading incidents. Please try again.
									</div>
								</div>
							)}

							{loadState === LoadState.LOADED && (
								<Table
									incident={incident}
									onSelectIncident={handleSelectIncident}
								/>
							)}
						</div>
					</div>
				</div>
				{showStats && (
					<div className="col-span-4">
						<StatsPanel trafficreport={trafficReport} />
					</div>
				)}
			</div>

			{/* Incident Details Popup */}
			<IncidentPopup
				incident={selectedIncident}
				isOpen={isPopupOpen}
				onClose={handleClosePopup}
			/>
		</div>
	);
}
