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
	} catch (error) {
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
// const timeDiff = (date: Date) => {
// 	const currenttime = new Date();
// 	const timediff = currenttime.getTime() - date.getTime();
// 	return timediff;
// };

export { formatDate, timeDiff };
// const test = "2025-09-06T15:15:00.000Z";
// const date = new Date(test);
// const currenttime = new Date();
// const timediff = currenttime.getTime() - date.getTime();
// const minuteDiff = (timediff / (1000 * 60)).toFixed(0);
// const hourDiff = timediff / (1000 * 60 * 60);
// const dayDiff = timediff / (1000 * 60 * 60 * 24);
// console.log(minuteDiff, hourDiff, dayDiff);
// console.log(date, formatDate(date.toISOString()));
// console.log(currenttime, formatDate(currenttime.toISOString()));
console.log(timeDiff("2025-09-06T15:15:00.000Z"));
console.log(timeDiff("2025-10-05T15:15:00.000Z"));
console.log(timeDiff("2025-10-06T15:15:00.000Z"));
console.log(timeDiff("2025-10-06T17:17:00.000Z"));
