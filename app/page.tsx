"use client";
import Image from "next/image";
import Map from "@/app/components/map/map";
import Table from "@/app/components/table/table";
import useIncident from "@/hooks/useIncident";
import useProviders from "@/hooks/useProviders";
import IncidentPopup from "@/app/components/table/incidentpopup";
import { useMemo, useState } from "react";
import { Incident } from "@/types/data";
import StatsPanel from "@/app/components/stats/stats-panel";
import { logger } from "@/services/logger";
import State from "@/types/states";

export default function Home() {
	const [selectedState, setSelectedState] = useState<State | null>(null);
	const [timelineHours, setTimelineHours] = useState<number>(168);
	const stateCodes = useMemo(
		() => (selectedState ? [selectedState.abbr] : null),
		[selectedState],
	);

	const { incident, loadState, LoadState, trafficReport } = useIncident({
		stateCodes,
		timelineHours,
	});
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
			<div className="mb-6 justify-between sticky top-0 z-30 bg-background/95 backdrop-blur-sm pt-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src="/logo.svg"
							alt="HelpAfterAccident logo"
							width={200}
							height={100}
							className="max-h-10 sm:max-h-14 md:max-h-16"
							priority
						/>
						<h1 className="sm:text-3xl text-xl font-bold text-foreground ">
							<span className="text-primary">HEATMAP</span>
						</h1>
					</div>
					<button onClick={() => setShowStats(!showStats)}>
						{showStats ? "Hide" : "Show"} Metrics
					</button>
				</div>
				<div className="h-px bg-secondary mt-4" />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
				<div
					className={`space-y-6 pr-0 md:pr-2 ${
						showStats ? "md:col-span-8" : "md:col-span-12"
					} md:max-h-[calc(100vh-160px)] md:overflow-y-auto md:overflow-x-hidden`}>
					<Map
						incident={incident}
						providers={providers}
						providerPatients={providerPatients}
						activeState={selectedState}
						onActiveStateChange={setSelectedState}
						timelineHours={timelineHours}
						onTimelineHoursChange={setTimelineHours}
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
					<div className="hidden md:block md:col-span-4 md:max-h-[calc(100vh-160px)] md:overflow-y-auto md:overflow-x-hidden md:pl-2">
						<StatsPanel trafficreport={trafficReport} />
					</div>
				)}
			</div>

			{/* Mobile Metrics Bottom Sheet */}
			{showStats && (
				<div className="fixed inset-0 z-40 flex items-end md:hidden">
					<button
						type="button"
						aria-label="Close metrics"
						onClick={() => setShowStats(false)}
						className="absolute inset-0 bg-black/50"
					/>
					<div className="relative z-10 w-full max-h-[80vh] bg-background border-t border-primary/20 rounded-t-2xl shadow-2xl p-4 overflow-y-auto">
						<div className="flex items-center justify-between mb-3">
							<h2 className="text-lg font-bold text-foreground font-mono">
								Accident <span className="text-primary">Metrics</span>
							</h2>
							<button
								onClick={() => setShowStats(false)}
								className="p-2 text-muted-foreground hover:text-foreground hover:bg-primary/5 rounded-md"
								aria-label="Close metrics panel">
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
						<StatsPanel trafficreport={trafficReport} />
					</div>
				</div>
			)}

			{/* Incident Details Popup */}
			<IncidentPopup
				incident={selectedIncident}
				isOpen={isPopupOpen}
				onClose={handleClosePopup}
			/>
		</div>
	);
}
