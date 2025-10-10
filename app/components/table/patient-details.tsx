import { PatientData } from "@/types/patientdata";

interface PatientDetailsProps {
	patientData: PatientData;
}

const patientexample: PatientData = {
	name: "John Doe",
	dob: "1990-05-01",
	phone: "3514647377",
	email: "john.doe@gmail.com",
	facebook: "john.doe",
	instagram: "john.doe",
	twitter: "john.doe",
};
const patientData = patientexample;

export default function PatientDetails() {
	return (
		<div className="space-y-4">
			{/* Add a note to clarify this is patient data */}
			<div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
				<div className="flex items-center gap-2">
					<svg
						className="w-4 h-4 text-blue-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span className="text-xs font-mono text-blue-400 font-semibold">
						Patient data is separate from incident location
					</span>
				</div>
			</div>

			{/* Patient fields with blue theme */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						Patient Name
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.name}
						</span>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						Date of Birth
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.dob}
						</span>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						Phone
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.phone}
						</span>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium text-blue-400/80 font-mono uppercase tracking-wider">
						Email
					</label>
					<div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-md">
						<span className="text-sm text-foreground font-mono">
							{patientData?.email}
						</span>
					</div>
				</div>
			</div>

			{/* Social Media - Separate section */}
			<div className="mt-6">
				<h4 className="text-sm font-semibold text-blue-400 font-mono uppercase tracking-wider mb-3">
					Social Media
				</h4>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
				</div>
			</div>
		</div>
	);
}
