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
			<AccidentMetrics
				accidentmetrics={
					trafficreport?.accidentMetrics || TrafficReportExample.accidentMetrics
				}
			/>
			<CoverageCities
				coveragecities={
					trafficreport?.coverageCities || TrafficReportExample.coverageCities
				}
				converagestate={
					trafficreport?.coverageStates || TrafficReportExample.coverageStates
				}
			/>
			<ApiData
				apidata={trafficreport?.apiSources || TrafficReportExample.apiSources}
				datapulls={trafficreport?.dataPulls || TrafficReportExample.dataPulls}
			/>
		</div>
	);
}
