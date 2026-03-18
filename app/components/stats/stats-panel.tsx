import AccidentMetrics from "./accidentmetrics";
import CoverageCities from "./coveragecities";
import ApiData from "./apidata";
import { TrafficReport, TrafficReportExample } from "@/types/trafficreport";

interface StatsPanelProps {
	trafficreport: TrafficReport | null;
}
export default function StatsPanel({ trafficreport }: StatsPanelProps) {
	return (
		<div className="space-y-6">
			<div className="text-center mb-6">
				<h2 className="text-2xl font-bold text-foreground font-mono">
					Accident <span className="text-primary">Metrics</span>
				</h2>
				<div className="h-px bg-primary/20 my-3" />
			</div>
			<div className="space-y-4">
				<div className="rounded-lg border border-primary/20 bg-card/60 backdrop-blur-sm p-4 shadow-sm">
					<AccidentMetrics
						accidentmetrics={
							trafficreport?.accidentMetrics ||
							TrafficReportExample.accidentMetrics
						}
					/>
				</div>
				<div className="rounded-lg border border-primary/20 bg-card/60 backdrop-blur-sm p-4 shadow-sm">
					<CoverageCities
						coveragecities={
							trafficreport?.coverageCities ||
							TrafficReportExample.coverageCities
						}
						converagestate={
							trafficreport?.coverageStates ||
							TrafficReportExample.coverageStates
						}
					/>
				</div>
			</div>
			{/* <ApiData
				apidata={trafficreport?.apiSources || TrafficReportExample.apiSources}
				datapulls={trafficreport?.dataPulls || TrafficReportExample.dataPulls}
			/> */}
		</div>
	);
}
