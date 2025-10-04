"use client";
import { useEffect, useRef, useState } from "react";
import { Incident } from "@/types/data";
import { PatientData } from "@/types/patientdata";
import PatientDetails from "./patient-details";
import { formatDate } from "./utils";
interface IncidentPopupProps {
	incident: Incident | null;
	isOpen: boolean;
	onClose: () => void;
}

export default function IncidentPopup({
	incident,
	isOpen,
	onClose,
}: IncidentPopupProps) {
	const popupRef = useRef<HTMLDivElement>(null);
	const [patientData, setPatientData] = useState<PatientData | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popupRef.current &&
				!popupRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden"; // Prevent background scrolling
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	// Close popup with Escape key
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		const fetchPatientData = async () => {
			const response = await fetch(`/api/patients`);
			const data = await response.json();
			setPatientData(data[0]);
		};
	}, [isOpen, incident?.latitude, incident?.longitude]);

	if (!isOpen || !incident) return null;

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<div
				ref={popupRef}
				className="bg-background border border-primary/20 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-primary/20">
					<h2 className="text-xl font-semibold text-primary font-mono">
						Incident Details
					</h2>
					<button
						onClick={onClose}
						className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-primary/5 rounded-md"
						aria-label="Close popup">
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

				{/* Content */}
				<div className="p-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{/* INCIDENT INFORMATION SECTION */}
						<div className="space-y-4">
							{/* Section Header */}
							<div className="flex items-center gap-3 pb-3 border-b-2 border-red-500/30">
								<div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
								<h3 className="text-lg font-semibold text-red-400 font-mono uppercase tracking-wider">
									🚨 Incident Information
								</h3>
							</div>

							{/* Incident Details */}
							<div className="space-y-4">
								{/* Incident ID */}
								<div className="space-y-2">
									<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
										Incident ID
									</label>
									<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
										<code className="text-sm text-foreground font-mono break-all">
											{incident.id}
										</code>
									</div>
								</div>

								{/* Event Type */}
								<div className="space-y-2">
									<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
										Event Type
									</label>
									<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
										<span className="text-sm text-foreground font-mono">
											{incident.event}
										</span>
									</div>
								</div>

								{/* Incident Location */}
								<div className="space-y-4">
									<div className="flex items-center gap-2 mb-3">
										<svg
											className="w-4 h-4 text-red-400"
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
										<span className="text-sm font-semibold text-red-400 font-mono uppercase tracking-wider">
											Incident Location
										</span>
									</div>

									<div className="space-y-3">
										<div className="space-y-2">
											<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
												City
											</label>
											<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
												<span className="text-sm text-foreground font-mono">
													{incident.city || "N/A"}
												</span>
											</div>
										</div>

										<div className="space-y-2">
											<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
												Intersection
											</label>
											<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
												<span className="text-sm text-foreground font-mono">
													{incident.intersection || "N/A"}
												</span>
											</div>
										</div>

										{/* Coordinates */}
										<div className="space-y-2">
											<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
												GPS Coordinates
											</label>
											<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
												<div className="grid grid-cols-2 gap-4 text-sm font-mono">
													<div>
														<span className="text-red-400/60">Latitude:</span>
														<br />
														<span className="text-foreground">
															{incident.latitude}
														</span>
													</div>
													<div>
														<span className="text-red-400/60">Longitude:</span>
														<br />
														<span className="text-foreground">
															{incident.longitude}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Timestamp */}
								<div className="space-y-2">
									<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
										Incident Reported
									</label>
									<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
										<span className="text-sm text-foreground font-mono">
											{formatDate(incident.createdAt)}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* PATIENT INFORMATION SECTION */}
						<div className="space-y-4">
							{/* Section Header */}
							<div className="flex items-center gap-3 pb-3 border-b-2 border-blue-500/30">
								<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
								<h3 className="text-lg font-semibold text-blue-400 font-mono uppercase tracking-wider">
									👤 Patient Information
								</h3>
							</div>

							{/* Patient Details - Use different styling */}
							<div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
								<PatientDetails />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
