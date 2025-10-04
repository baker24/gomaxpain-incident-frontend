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

export { formatDate };
