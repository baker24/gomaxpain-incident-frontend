"use client";
import { logger } from "@/services/logger";
import { Incident } from "@/types/data";
import { timeDiff } from "./utils";
interface TableProps {
	incident: Incident[] | null;
	onSelectIncident?: (incident: Incident) => void;
}

export default function Table({ incident, onSelectIncident }: TableProps) {
	const handleSelectIncident = (incident: Incident) => {
		if (onSelectIncident && typeof onSelectIncident === "function") {
			onSelectIncident(incident);
		} else {
			logger.error("onSelectIncident is not a function:", onSelectIncident);
		}
	};
	return (
		<>
			{/* Desktop/tablet table */}
			<table className="hidden w-full caption-bottom text-sm md:table">
				<thead className="[&_tr]:border-b border-primary/30">
					<tr className="border-b border-primary/30 transition-colors hover:bg-primary/5">
						<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
							ID
						</th>
						<th className="h-10 px-4 text-left align-middle font-semibold text-primary font-mono text-xs tracking-wider uppercase bg-primary/5">
							INCIDENT
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
							ZIP CODE
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
										onClick={() => handleSelectIncident(incidentItem)}>
										<td className="px-4 align-middle font-mono text-xs text-foreground/90">
											{incidentItem.id}
										</td>
										<td className="px-4 align-middle font-mono text-xs text-foreground/90">
											{incidentItem.event}
										</td>
										<td className="px-4 align-middle font-mono text-xs text-foreground/90 truncate max-w-[12rem]">
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

			{/* Mobile card list */}
			<div className="space-y-3 md:hidden">
				{incident && Array.isArray(incident) && incident.length > 0 ? (
					incident
						.filter((item) => item.intersection !== "")
						.map((incidentItem: Incident) => (
							<button
								key={incidentItem.id}
								type="button"
								onClick={() => handleSelectIncident(incidentItem)}
								className="w-full text-left rounded-lg border border-primary/20 bg-background/80 px-4 py-3 shadow-sm hover:border-primary/40 hover:bg-primary/5 transition-colors">
								<div className="flex items-center justify-between gap-2 mb-1">
									<p className="font-mono text-xs text-primary/80 uppercase tracking-wide">
										{incidentItem.event}
									</p>
									<span className="text-[10px] font-mono text-foreground/50">
										#{incidentItem.id.slice(0, 6)}
									</span>
								</div>
								<p className="text-sm font-mono text-foreground line-clamp-2">
									{incidentItem.intersection}
								</p>
								<div className="mt-2 flex items-center justify-between text-[11px] font-mono text-foreground/70">
									<span>
										{incidentItem.city}, {incidentItem.state} {incidentItem.zipcode}
									</span>
									<span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 border border-primary/20">
										{timeDiff(incidentItem.createdAt)}
									</span>
								</div>
							</button>
						))
				) : (
					<div className="h-10 p-6 text-center text-muted-foreground font-mono text-sm">
						{incident === null
							? "Loading..."
							: "No incidents found in this area"}
					</div>
				)}
			</div>
		</>
	);
}
