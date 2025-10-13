"use client";
import { logger } from "@/services/logger";
import { Incident } from "@/types/data";
import { formatDate, timeDiff } from "./utils";
interface TableProps {
	incident: Incident[] | null;
	onSelectIncident?: (incident: Incident, patientID: number) => void;
}

export default function Table({ incident, onSelectIncident }: TableProps) {
	const handleSelectIncident = (incident: Incident, patientID: number) => {
		if (onSelectIncident && typeof onSelectIncident === "function") {
			onSelectIncident(incident, patientID);
		} else {
			logger.error("onSelectIncident is not a function:", onSelectIncident);
		}
	};
	return (
		<table className="w-full caption-bottom text-sm">
			<thead className="[&_tr]:border-b border-primary/30">
				<tr className="border-b border-primary/30 transition-colors hover:bg-primary/5">
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						ID
					</th>
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						EVENT
					</th>
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						INTERSECTION
					</th>
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						CITY
					</th>
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						STATE
					</th>
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						ZIPCODE
					</th>
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						LATITUDE, LONGITUDE
					</th>
					<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
						CREATED_AT
					</th>
				</tr>
			</thead>
			<tbody className="[&_tr:last-child]:border-0">
				{incident && Array.isArray(incident) && incident.length > 0 ? (
					incident.map(
						(incidentItem: Incident) =>
							incidentItem.intersection !== "" && (
								<tr
									key={incidentItem.id}
									className="h-10 border-b border-primary/10 transition-all duration-200 hover:bg-primary/5 hover:border-primary/20 cursor-pointer"
									onClick={() => handleSelectIncident(incidentItem, 1)}>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										{incidentItem.id}
									</td>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										{incidentItem.event}
									</td>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										{incidentItem.intersection}
									</td>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										{incidentItem.city}
									</td>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										{incidentItem.state}
									</td>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										{incidentItem.zipcode}
									</td>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										{incidentItem.latitude}, {incidentItem.longitude}
									</td>
									<td className="px-4 align-middle font-mono text-xs text-foreground/90">
										<div className="w-fit px-2 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary/80 border border-primary/20">
											{timeDiff(incidentItem.createdAt)}
										</div>
									</td>
								</tr>
							)
					)
				) : (
					<tr>
						<td
							colSpan={6}
							className="h-10 p-8 text-center text-muted-foreground font-mono text-sm">
							{incident === null
								? "Loading..."
								: "No incidents found in this area"}
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
