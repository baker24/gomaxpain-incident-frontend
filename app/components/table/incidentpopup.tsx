"use client";
import { useEffect, useRef } from "react";
import { Incident } from "@/types/data";
import PatientDetails from "./patient-details";
import { formatDate } from "./utils";
import { faker } from "@faker-js/faker";
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
	const maskVIN = (vin: string) => {
		return "*************" + vin.slice(-4);
	};

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
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
											Incident Type
										</label>
										<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
											<span className="text-sm text-foreground font-mono">
												{incident.event}
											</span>
										</div>
									</div>
								</div>

								{/* Incident Location */}

								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="space-y-3">
										<div className="space-y-2">
											<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
												City
											</label>
											<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
												<span className="text-sm text-foreground font-mono">
													{incident.city.split(",")[0] || "N/A"}
												</span>
											</div>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
											State
										</label>
										<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
											<span className="text-sm text-foreground font-mono">
												{incident.state || "N/A"}
											</span>
										</div>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
											Zipcode
										</label>
										<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
											<span className="text-sm text-foreground font-mono">
												{incident.zipcode || "N/A"}
											</span>
										</div>
									</div>
								</div>

								<div className="space-y-3"></div>
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
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
								<div className="space-y-2">
									<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
										Vehicle Model
									</label>
									<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
										<span className="text-sm text-foreground font-mono">
											{faker.vehicle.vehicle()}
										</span>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
										Vehicle Color
									</label>
									<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
										<span className="text-sm text-foreground font-mono">
											{faker.vehicle.color()}
										</span>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
										VIN Number
									</label>
									<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
										<span className="text-sm text-foreground font-mono">
											{maskVIN(faker.vehicle.vin())}
										</span>
									</div>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium text-red-400/80 font-mono uppercase tracking-wider">
										License Plate
									</label>
									<div className="p-3 bg-red-500/5 border border-red-500/20 rounded-md">
										<span className="text-sm text-foreground font-mono">
											{incident.license || "N/A"}
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
							<PatientDetails />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
