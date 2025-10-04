export function editnumber(phone) {
	return phone.slice(4, 16);
}

export function editemail(email) {
	return email.slice(0, email.indexOf("@")) + "@" + "gmail.com";
}
