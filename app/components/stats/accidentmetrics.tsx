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
			<div className="bg-background/80 border border-primary/20 rounded-lg p-8 pb-4 text-center">
				<div className="text-4xl font-bold text-foreground font-mono mb-3">
					{totalAccidents.toLocaleString()}
				</div>
				<div className="text-lg font-medium text-primary/80 font-mono uppercase tracking-wider mb-3">
					Total Accidents Detected
				</div>
				{/* Last updated */}
				<div className="flex items-center justify-center gap-1 px-2 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary/80 border border-primary/20">
					<svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
							clipRule="evenodd"
						/>
					</svg>
					Since{" "}
					{(() => {
						// Start date: Oct 13, 2025 4:00 AM CDT (UTC-5)
						const startDate = new Date("2025-10-13T09:00:00Z");
						return startDate.toLocaleString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
							hour: "numeric",
							minute: "2-digit",
							hour12: true,
							timeZoneName: "short",
						});
					})()}
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
						Incidents Detected Today
					</div>
				</div>

				{/* Last 12 Hours */}
				<div className="bg-background/80 border border-primary/20 rounded-lg p-6 text-center">
					<div className="text-4xl font-bold text-foreground font-mono mb-2">
						{accidentsLastHour}
					</div>
					<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider mb-2">
						Incidents Detected Last 12 Hours
					</div>
					<div className="text-xs text-secondary/60 font-mono">
						{(() => {
							const now = new Date();
							const currentHour = new Date(now);
							currentHour.setMinutes(0, 0, 0);
							const twelveHoursAgo = new Date(currentHour);
							twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);

							// Format to 12-hour time with AM/PM in user's timezone
							const formatTime = (date: Date) => {
								return date.toLocaleTimeString("en-US", {
									hour: "numeric",
									minute: "2-digit",
									hour12: true,
									timeZoneName: "short",
								});
							};

							return `${formatTime(twelveHoursAgo)} - ${formatTime(currentHour)}`;
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
						Incidents Detected Yesterday
					</div>
				</div>

				{/* Last Hour */}
				<div className="bg-background/80 border border-primary/20 rounded-lg p-6 text-center">
					<div className="text-4xl font-bold text-foreground font-mono mb-2">
						{previousDayPercent}
					</div>
					<div className="text-base font-medium text-primary/80 font-mono uppercase tracking-wider mb-3">
						Of US daily incidents detected Yesterday
					</div>
				</div>
			</div>
		</div>
	);
}
