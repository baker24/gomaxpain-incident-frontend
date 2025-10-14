import { useState } from "react";
import createRandomPatientData from "@/services/patientdata";

export default function PatientDetails() {
	// Generate new patient data each time the component mounts
	const [patientData] = useState(() => createRandomPatientData());

	// Function to mask phone number, showing only last 4 digits
	const maskPhoneNumber = (phone: string) => {
		// Remove all non-digit characters
		const digits = phone.replace(/\D/g, "");
		// Get last 4 digits
		const lastFour = digits.slice(-4);
		// Return formatted masked number
		return `***-***-${lastFour}`;
	};

	const maskEmail = (email: string) => {
		const domain = email.split("@")[1];
		const firstLetter = email.slice(0, 1);
		return `${firstLetter}******@${domain}`;
	};

	return (
		<div className="space-y-4">
			{/* Add a note to clarify this is patient data */}

			{/* Patient fields with blue theme */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						First Name
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.firstname}
						</span>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						Last Name
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.lastname}
						</span>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						Date of Birth
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.dob instanceof Date
								? patientData.dob.toLocaleDateString()
								: patientData?.dob}
						</span>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						Zipcode
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.zipcode}
						</span>
					</div>
				</div>
			</div>
			<div className="space-y-2">
				<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
					Phone
				</label>
				<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
					<span className="text-sm text-foreground font-mono">
						{maskPhoneNumber(patientData?.phone || "")}
					</span>
				</div>
			</div>

			<div className="space-y-2">
				<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
					Email
				</label>
				<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
					<span className="text-sm text-foreground font-mono">
						{maskEmail(patientData?.email || "")}
					</span>
				</div>
			</div>
			{/* </div> */}

			{/* Social Media - Separate section */}
			<div className="mt-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<div className="space-y-2">
						<label className="text-xs font-medium text-blue-400/60 font-mono uppercase tracking-wider">
							Facebook
						</label>
						<div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded-md">
							<span className="text-sm text-foreground font-mono">
								{patientData?.facebook}
							</span>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-xs font-medium text-blue-400/60 font-mono uppercase tracking-wider">
							Instagram
						</label>
						<div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded-md">
							<span className="text-sm text-foreground font-mono">
								{patientData?.instagram}
							</span>
						</div>
					</div>
					<div className="space-y-2">
						<label className="text-xs font-medium text-blue-400/60 font-mono uppercase tracking-wider">
							Twitter
						</label>
						<div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded-md">
							<span className="text-sm text-foreground font-mono">
								{patientData?.twitter}
							</span>
						</div>
					</div>
					<div className="space-y-2">
						<label className="text-xs font-medium text-blue-400/60 font-mono uppercase tracking-wider">
							TikTok
						</label>
						<div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded-md">
							<span className="text-sm text-foreground font-mono">
								{patientData?.tiktok}
							</span>
						</div>
					</div>

					{/* <div className="space-y-2">
						<label className="text-xs font-medium text-blue-400/60 font-mono uppercase tracking-wider">
							Twitter
						</label>
						<div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded-md">
							<span className="text-sm text-foreground font-mono">
								{patientData?.twitter}
							</span>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}
