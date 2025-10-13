"use client";
import { useState } from "react";
import { useCoverageStats } from "@/hooks/useCoverageStats";

interface CoverageCitiesProps {
	coveragecities?: string[];
	converagestate?: string[];
}

export default function CoverageCities({
	coveragecities,
	converagestate,
}: CoverageCitiesProps) {
	// Fetch real coverage data from API
	const { coverageStats, loading, error } = useCoverageStats();

	// track if main card is expanded
	const [isExpanded, setIsExpanded] = useState(false);

	// Use real data if available, fallback to props
	const states = coverageStats?.states || [];
	const cities = coverageStats?.cities || [];
	const totalStates = coverageStats?.totalStates || converagestate?.length || 0;
	const totalCities = coverageStats?.totalCities || coveragecities?.length || 0;

	// Group cities by state from real data
	const citiesByState: Record<
		string,
		Array<{ city: string; count: number }>
	> = {};

	cities.forEach((cityData) => {
		const stateName = getStateName(cityData.state);
		if (!citiesByState[stateName]) {
			citiesByState[stateName] = [];
		}
		if (cityData.city !== "Unknown") {
			citiesByState[stateName].push({
				city: cityData.city,
				count: cityData.count,
			});
		}
	});

	// Helper function to convert state code to full name
	function getStateName(stateCode: string): string {
		const stateNames: Record<string, string> = {
			CA: "California",
			FL: "Florida",
			NY: "New York",
			NJ: "New Jersey",
			TX: "Texas",
		};
		return stateNames[stateCode] || stateCode;
	}

	return (
		<div className="space-y-6">
			{/* Main Coverage Card - Clickable */}
			<div className="relative group">
				{/* Glow effect */}
				<div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

				{/* Card content */}
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="w-full relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 text-left"
					aria-expanded={isExpanded}
					aria-controls="coverage-details">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
							Coverage Areas
						</h3>
						<div className="flex items-center gap-3">
							<div className="text-primary/60 group-hover:text-primary transition-colors duration-300">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<svg
								className={`w-4 h-4 text-primary/60 transition-transform ${
									isExpanded ? "rotate-180" : "rotate-0"
								}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</div>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-2 gap-4 mb-6">
						<div className="text-center">
							<div className="text-2xl font-bold text-foreground font-mono">
								{totalCities}
							</div>
							<div className="text-xs text-secondary font-mono uppercase tracking-wider">
								Metros
							</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-foreground font-mono">
								{totalStates}
							</div>
							<div className="text-xs text-secondary font-mono uppercase tracking-wider">
								States
							</div>
						</div>
					</div>

					{/* Last updated */}
					<div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary/80 border border-primary/20">
						<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
								clipRule="evenodd"
							/>
						</svg>
						Last updated at 10:00 AM EST
					</div>
				</button>
			</div>

			{/* States and Cities - Show when main card is expanded */}
			{isExpanded && (
				<div id="coverage-details" className="space-y-4">
					{loading && (
						<div className="text-center py-4 text-sm text-foreground/60 font-mono">
							Loading coverage data...
						</div>
					)}

					{error && (
						<div className="text-center py-4 text-sm text-red-500 font-mono">
							Error loading data: {error}
						</div>
					)}

					{!loading &&
						!error &&
						Object.keys(citiesByState).map((stateName) => {
							const stateData = states.find(
								(s) => getStateName(s.state) === stateName
							);
							const stateCities = citiesByState[stateName];

							return (
								<div key={stateName} className="relative group">
									{/* Subtle glow for state cards */}
									<div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-500"></div>

									<div className="relative bg-background/60 backdrop-blur-sm border border-primary/10 rounded-lg p-4 hover:border-primary/20 transition-all duration-300">
										{/* State header with accident count */}
										<div className="flex items-center justify-between mb-3">
											<h4 className="text-lg font-semibold text-foreground font-mono">
												{stateName}
											</h4>
											<div className="flex items-center gap-3">
												<div className="text-xs text-accent/80 font-mono font-semibold">
													{stateData?.count || 0} accidents
												</div>
												<div className="text-xs text-primary/60 font-mono">
													{stateCities?.length || 0} cities
												</div>
											</div>
										</div>

										{/* Cities grid with accident counts */}
										<div className="grid grid-cols-2 gap-2">
											{stateCities?.map((cityData, idx) => (
												<div
													key={`${cityData.city}-${stateName}-${idx}`}
													className="px-3 py-2 bg-primary/5 border border-primary/10 rounded-md text-sm font-mono text-foreground/90 hover:bg-primary/10 hover:border-primary/20 transition-colors duration-200 flex items-center justify-between">
													<span>{cityData.city}</span>
													<span className="text-xs text-accent/70 font-semibold">
														{cityData.count}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							);
						})}
				</div>
			)}

			{/* All Cities Summary */}
			<div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
				<div className="flex items-center gap-3 mb-3">
					<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
					<span className="text-sm font-mono text-foreground/80 font-semibold">
						Active Coverage
					</span>
				</div>
				<div className="text-xs text-secondary font-mono">
					Monitoring {totalCities} cities across {totalStates} states
				</div>
				{coverageStats && (
					<div className="mt-2 text-xs text-accent/70 font-mono font-semibold">
						Total: {states.reduce((sum, s) => sum + s.count, 0)} accidents
						tracked
					</div>
				)}
			</div>
		</div>
	);
}
