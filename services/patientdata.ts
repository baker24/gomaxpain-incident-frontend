import { faker } from "@faker-js/faker";
import { PatientData } from "@/types/patientdata";

function createRandomPatientData(): PatientData {
	const sex = faker.person.sex() as "female" | "male";
	const firstname = faker.person.firstName(sex);
	const lastname = faker.person.lastName();
	const dob = faker.date.birthdate();
	const phone = faker.phone.number();
	const email = faker.internet.email({
		firstName: firstname,
		lastName: lastname,
	});
	const facebook = faker.internet.username({
		firstName: firstname,
		lastName: lastname,
	});
	const instagram = faker.internet.username({
		firstName: firstname,
		lastName: lastname,
	});
	const twitter = faker.internet.username({
		firstName: firstname,
		lastName: lastname,
	});
	return {
		firstname: firstname,
		lastname: lastname,
		dob: dob,
		phone: phone,
		email: email,
		facebook: facebook,
		instagram: instagram,
		twitter: twitter,
		sex: sex,
	};
}

export default createRandomPatientData;
