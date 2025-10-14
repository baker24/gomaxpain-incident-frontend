const formatDate = (dateString: string) => {
	try {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			timeZoneName: "short",
		});
	} catch {
		return dateString;
	}
};

const units = {
	minute: 1000 * 60,
	hour: 1000 * 60 * 60,
	day: 1000 * 60 * 60 * 24,
};
const ranges = [
	{ name: "min", value: units.minute, limit: units.hour },
	{ name: "hr", value: units.hour, limit: units.day },
	{ name: "d", value: units.day, limit: Infinity },
];
function timeDiff(timestamp: string) {
	const date = new Date(timestamp);
	const currenttime = new Date();
	const timediff = Math.abs(currenttime.getTime() - date.getTime());
	for (const range of ranges) {
		if (timediff < range.limit) {
			const value = Math.floor(timediff / range.value);
			return `${value} ${range.name}`;
		}
	}
}

export { formatDate, timeDiff };
