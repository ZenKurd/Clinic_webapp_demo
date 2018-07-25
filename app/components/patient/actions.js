export function add_patient(patient, patients) {
	if (patient.name && patient.date && patient.gender && patient.address) {
		let updated_patients = patients.slice(),
			birth = patient.date.split("-"),
			reversed_birth = birth.reverse().join("-"),
			date1 = new Date(),
			date2 = new Date(patient.date),
			time_diff = Math.abs(date2.getTime() - date1.getTime()),
			diff_years = Math.ceil(time_diff / (1000 * 3600 * 24) / 365),
			new_patient = {
				name: patient.name,
				birth: reversed_birth,
				gender: patient.gender,
				id: Math.floor(Math.random() * (999999 - 100000)) + 100000,
				age: diff_years,
				gravida: patient.gravida,
				hypertension: patient.hypertension,
				diabetes: patient.diabetes,
				phone: patient.phone,
				smoker: patient.smoker,
				address: patient.address,
				notes: [],
				lab: [],
				appointments: [],
				vitals: [],
				medicine: [],
				diagnosis: []
			};

		updated_patients.unshift(new_patient);

		return {
			type: "ADD_PATIENT",
			payload: { patients: updated_patients }
		};
	}
}

export function add_dropdown_item(item, category) {
	// don't add medicine that have no strength added
	if (category == "medicine_list") {
		let validate_medicine = item.match(/\d+\s?(ml|mg)$/);
		if (!validate_medicine) return { type: "NOTHING" };
	}

	return {
		type: "ADD_DROPDOWN_ITEM",
		payload: {
			item,
			category
		}
	};
}

export function stop_medicine(patient, medicine) {
	let updated_patient = patient;
	let index = updated_patient.medicine.indexOf(medicine);
	updated_patient.medicine[index].active = false;

	return {
		type: "STOP_MEDICINE",
		payload: { updated_patient: updated_patient }
	};
}

export function remove_selected_patient() {
	return {
		type: "SELECTED_PATIENT",
		payload: { selected_patient: null }
	};
}

export function show_patient_profile(patient) {
	return {
		type: "SELECTED_PATIENT",
		payload: { selected_patient: patient }
	};
}

export function add_item(item, patient, property) {
	let updated_patient = patient[property].unshift(item);

	return {
		type: "ADD_ITEM",
		payload: { updated_patient: updated_patient }
	};
}

export function add_appointment(appointment, patient) {
	return {
		type: "ADD_APPOINTMENT",
		payload: {
			appointment: appointment,
			patient_name: patient
		}
	};
}
