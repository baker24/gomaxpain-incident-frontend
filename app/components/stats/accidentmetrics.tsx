import { TrafficReport } from "@/types/trafficreport";

interface AccidentMetricsProps {
	accidentmetrics: TrafficReport["accidentMetrics"];
}

export default function AccidentMetrics({
	accidentmetrics,
}: AccidentMetricsProps) {
	// Provide default values to prevent undefined errors
	const {
		totalAccidents = 0,
		accidentsToday = 0,
		previousDayAccidents = 0,
		accidentsLastHour = 0,
		previousDayPercent = "0%",
	} = accidentmetrics || {};

	return (
		<div className="space-y-6">
			<div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
				<div className="flex items-center gap-3">
					<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
					<span className="text-sm font-mono text-foreground/80 font-semibold">
						Last Updated at{" "}
						{(() => {
							const now = new Date();
							const hours = now.setMinutes(0, 0, 0);
							const hoursDate = new Date(hours);

							// Format with date, time, and timezone
							const dateString = hoursDate.toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							});
							const timeString = hoursDate.toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "2-digit",
								hour12: true,
								timeZoneName: "short",
							});

							return `${dateString}, ${timeString}`;
						})()}
					</span>
				</div>
			</div>
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
						Today&apos;s Accidents
					</div>
				</div>

				{/* Last Hour */}
				<div className="bg-background/80 border border-primary/20 rounded-lg p-6 text-center">
					<div className="text-4xl font-bold text-foreground font-mono mb-2">
						{accidentsLastHour}
					</div>
					<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider mb-2">
						Last Hour
					</div>
					<div className="text-xs text-secondary/60 font-mono">
						{(() => {
							const now = new Date();
							const lastHour = new Date(now);
							lastHour.setMinutes(0, 0, 0);
							const prevHour = new Date(lastHour);
							prevHour.setHours(prevHour.getHours() - 1);

							// Format to 12-hour time with AM/PM in user's timezone
							const formatTime = (date: Date) => {
								return date.toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "2-digit",
									hour12: true,
									timeZoneName: "short",
								});
							};

							return `${formatTime(prevHour)} - ${formatTime(lastHour)}`;
						})()}
					</div>
				</div>
			</div>

			{/* Yesterday's Accidents - Bottom */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Today's Accidents */}
				<div className="bg-background/80 border border-primary/20 rounded-lg p-6 text-center">
					<div className="text-4xl font-bold text-foreground font-mono mb-2">
						{previousDayAccidents}
					</div>
					<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider mb-3">
						Yesterday&apos;s Accidents
					</div>
				</div>

				{/* Last Hour */}
				<div className="bg-background/80 border border-primary/20 rounded-lg p-6 text-center">
					<div className="text-4xl font-bold text-foreground font-mono mb-2">
						{previousDayPercent}
					</div>
					<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider mb-3">
						Of US daily accidents
					</div>
				</div>
			</div>
		</div>
	);
}
