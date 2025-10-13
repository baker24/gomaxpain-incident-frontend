import { TrafficReport } from "@/types/trafficreport";
export default function ApiData({
	apidata,
	datapulls,
}: {
	apidata: string[];
	datapulls: TrafficReport["dataPulls"];
}) {
	const apiSources = apidata || [];
	const dataPulls = datapulls || {
		totalCities: 0,
		perCityPerDay: 0,
		pullsPerDay: 0,
		pullsPerMonth: 0,
	};

	const totalCities = dataPulls.totalCities || 0;
	const perCityPerDay = dataPulls.perCityPerDay || 0;
	const pullsPerDay = dataPulls.pullsPerDay || 0;
	const pullsPerMonth = dataPulls.pullsPerMonth || 0;

	return (
		<div className="space-y-6">
			{/* API Sources Card */}
			<div className="relative group">
				{/* Glow effect */}
				<div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

				{/* Card content */}
				<div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
							API Sources
						</h3>
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
									d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
								/>
							</svg>
						</div>
					</div>

					{/* API Sources List */}
					<div className="space-y-3">
						{apiSources.map((source) => (
							<div
								key={source}
								className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-md hover:bg-primary/10 transition-colors duration-200">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
								<span className="text-sm font-mono text-foreground font-medium">
									{source}
								</span>
								<div className="ml-auto">
									<span className="text-xs text-primary/60 font-mono">
										Active
									</span>
								</div>
							</div>
						))}
					</div>

					{/* Status Summary */}
					<div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-md">
						<div className="flex items-center justify-between">
							<span className="text-xs text-secondary font-mono">
								Total Sources
							</span>
							<span className="text-sm font-mono text-foreground font-semibold">
								{apiSources.length}
							</span>
						</div>
					</div>
				</div>
			</div>
			{/* Data Pulls Card */}
			<div className="relative group">
				{/* Glow effect */}
				<div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

				{/* Card content */}
				<div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
					{/* Header */}
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-sm font-medium text-primary/80 font-mono uppercase tracking-wider">
							Data Collection
						</h3>
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
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
						</div>
					</div>

					{/* Data Pulls Grid */}
					<div className="grid grid-cols-2 gap-4 mb-4">
						{/* Pulls Per Day */}
						<div className="text-center p-3 bg-primary/5 border border-primary/10 rounded-md">
							<div className="text-2xl font-bold text-foreground font-mono">
								{pullsPerDay}
							</div>
							<div className="text-xs text-secondary font-mono uppercase tracking-wider">
								Pulls Per Day
							</div>
						</div>

						{/* Pulls Per Month */}
						<div className="text-center p-3 bg-primary/5 border border-primary/10 rounded-md">
							<div className="text-2xl font-bold text-foreground font-mono">
								{pullsPerMonth.toLocaleString()}
							</div>
							<div className="text-xs text-secondary font-mono uppercase tracking-wider">
								Estimated Monthly Pulls
							</div>
						</div>
					</div>

					{/* Additional Stats */}
					<div className="space-y-2">
						{/* <div className="flex items-center justify-between p-2 bg-primary/5 border border-primary/10 rounded-md">
							<span className="text-xs text-secondary font-mono">
								Cities Covered
							</span>
							<span className="text-sm font-mono text-foreground font-semibold">
								{totalCities}
							</span>
						</div> */}

						<div className="flex items-center justify-between p-2 bg-primary/5 border border-primary/10 rounded-md">
							<span className="text-xs text-secondary font-mono">
								Pulls per Metro/Day
							</span>
							<span className="text-sm font-mono text-foreground font-semibold">
								{perCityPerDay}
							</span>
						</div>
					</div>

					{/* Efficiency Indicator */}
					<div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-md">
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
							<span className="text-xs font-mono text-accent font-semibold">
								High Efficiency
							</span>
						</div>
						<div className="text-xs text-secondary font-mono mt-1">
							{pullsPerDay} pulls across {totalCities} cities
						</div>
					</div>
				</div>
			</div>

			{/* System Status */}
			<div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
				<div className="flex items-center gap-3 mb-2">
					<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
					<span className="text-sm font-mono text-foreground/80 font-semibold">
						System Status
					</span>
				</div>
				<div className="text-xs text-secondary font-mono">
					All {apiSources.length} API sources operational • {pullsPerDay} daily
					pulls active
				</div>
			</div>
		</div>
	);
}
