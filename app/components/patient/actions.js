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

export function add_appointment(appointment, patient) {
	let patients = this.state.patients.slice(),
		selected_patient,
		appointments = [];

	for (let i = 0; i < patients.length; i++) {
		if (patients[i].name === patient) {
			selected_patient = patients[i];
			patients[i].appointments.unshift(appointment);
		}
	}

	this.state.patients.map(patient => {
		patient.appointments.map(apt => {
			appointments.push(apt);
		});
	});

	this.setState({
		patients: patients,
		events: appointments,
		selected_patient: selected_patient
	});

	setTimeout(() => this.send_post_req(), 2000);
}

export function add_dropdown_item(item, category) {
	let new_items = this.state[category].slice();
	new_items.push(item);

	if (category === "diagnosis_list") {
		this.setState({ diagnosis_list: new_items });
	}
	if (category === "medicine_list") {
		this.setState({ medicine_list: new_items });
	}

	if (category === "medicine_dose_list") {
		this.setState({ medicine_dose_list: new_items });
	}

	setTimeout(() => this.send_post_req(), 2000);
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
	this.setState({ selected_patient: null });
}

export function show_patient_profile(patient) {
	return {
		type: "SELECTED_PATIENT",
		payload: { selected_patient: patient }
	};
}

export function add_item(item, patient, property) {
	let patients = this.state.patients.slice();

	for (let i = 0; i < patients.length; i++) {
		if (patients[i].name === patient.name) {
			patients[i][property].unshift(item);
		}
	}

	this.setState({ patients: patients });

	setTimeout(() => this.send_post_req(), 2000);
}
