export const logger = {
	debug: (message: string, data?: any) => {
		if (process.env.NODE_ENV === "development") {
			console.log("[DEBUG] ", message, data);
		}
	},
	info: (message: string, data?: any) => {
		if (process.env.NODE_ENV === "development") {
			console.log("[INFO] ", message, data);
		}
	},
	warn: (message: string, data?: any) => {
		if (process.env.NODE_ENV === "development") {
			console.log("[WARN] ", message, data);
		}
	},
	error: (message: string, error?: any) => {
		console.log("[ERROR] ", message, error);
	},
};
