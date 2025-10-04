import { TrafficReport } from "@/types/trafficreport";

interface AccidentMetricsProps {
	accidentmetrics: TrafficReport["accidentMetrics"];
}

export default function AccidentMetrics({
	accidentmetrics,
}: AccidentMetricsProps) {
	const {
		totalAccidents,
		accidentsToday,
		previousDayAccidents,
		accidentsLastHour,
		previousDayPercent,
	} = accidentmetrics;

	// Calculate trend
	const isTodayHigher = accidentsToday > previousDayAccidents;
	const trendPercentage = (
		((accidentsToday - previousDayAccidents) / previousDayAccidents) *
		100
	).toFixed(1);

	return (
		<div className="space-y-6">
			{/* Total Accidents - Top Priority */}
			<div className="bg-background/80 border border-primary/20 rounded-lg p-8 text-center">
				<div className="text-4xl font-bold text-foreground font-mono mb-3">
					{totalAccidents.toLocaleString()}
				</div>
				<div className="text-lg font-medium text-primary/80 font-mono uppercase tracking-wider">
					Total Accidents Detected
				</div>
			</div>

			{/* Today and Last Hour - Side by Side */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Today's Accidents */}
				<div className="bg-background/80 border border-primary/20 rounded-lg p-6 text-center">
					<div className="text-4xl font-bold text-foreground font-mono mb-2">
						{accidentsToday}
					</div>
					<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider mb-3">
						Today's Accidents
					</div>
					<div className="text-sm text-secondary font-mono">
						{isTodayHigher ? "+" : ""}
						{trendPercentage}% vs yesterday
					</div>
				</div>

				{/* Last Hour */}
				<div className="bg-background/80 border border-primary/20 rounded-lg p-6 text-center">
					<div className="text-4xl font-bold text-foreground font-mono mb-2">
						{accidentsLastHour}
					</div>
					<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider mb-3">
						Last Hour
					</div>
					<div className="text-sm text-secondary font-mono">
						Recent incidents
					</div>
				</div>
			</div>

			{/* Yesterday's Accidents - Bottom */}
			<div className="bg-background/60 border border-primary/10 rounded-lg p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-6">
						<div className="text-3xl font-bold text-foreground font-mono">
							{previousDayAccidents}
						</div>
						<div>
							<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider">
								Yesterday's Accidents
							</div>
							<div className="text-sm text-secondary font-mono">
								{previousDayPercent}% of US daily accidents
							</div>
						</div>
					</div>
					<div className="text-right">
						<div className="text-xl font-bold text-foreground font-mono">
							{accidentsToday - previousDayAccidents > 0 ? "+" : ""}
							{accidentsToday - previousDayAccidents}
						</div>
						<div className="text-sm text-secondary font-mono">
							Difference from today
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
