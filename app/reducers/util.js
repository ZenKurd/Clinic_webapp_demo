import moment from "moment";

export function new_state(state, payload) {
	return {
		...state,
		...payload
	};
}

export function update_calendar_events(patients) {
	let appointments = [];

	patients.map(patient => {
		patient.appointments.map(apt => {
			appointments.push({
				title: apt.title,
				start: new Date(apt.start),
				end: new Date(apt.end)
			});
		});
	});

	return appointments;
}

export function send_post_req(demo) {
	if (!demo) {
		axios.post(`/insert`, { data: this.state }).then(res => {
			console.log("data inserted");
		});
	}
}

export function update_patients(state, updated_patient, flag) {
	//if flag is set to true, return state, else return updated patients only
	let patient_index = state.patients
		.map(x => {
			return x.id;
		})
		.indexOf(updated_patient.id);

	let updated_patients = state.patients.slice();
	update_patients[patient_index] = updated_patient;

	if (flag) {
		return {
			...state,
			patients: updated_patients
		};
	} else {
		return updated_patients;
	}
}

export function update_patient(state, patient_name, type, data) {
	let patient_index = state.patients
		.map(x => {
			return x.name;
		})
		.indexOf(patient_name);

	let cloned_patients_list = state.patients.slice();
	let patient = cloned_patients_list[patient_index];

	if (type == "appointment") {
		patient.appointments.push(data);
		return patient;
	}
}

export function add_appointment(state, patient_name, appointment) {
	let updated_patient = update_patient(
		state,
		patient_name,
		"appointment",
		appointment
	);

	let updated_patients = update_patients(state, updated_patient, false);
	let updated_events = update_calendar_events(updated_patients);

	return {
		...state,
		patients: updated_patients,
		events: updated_events
	};
}

export function move_appointment(state, appointment, event) {
	let patients = state.patients.slice(0);
	let patient_index = patients
		.map(patient => patient.name)
		.indexOf(event.title);

	let patient = patients[patient_index];
	let apt_index = patient.appointments
		.map(apt => new Date(apt.start).getTime())
		.indexOf(new Date(event.start).getTime());

	patient.appointments.splice(apt_index, 1, appointment);

	return {
		...state,
		patients,
		events: update_calendar_events(patients)
	};
}

export function find_patient(state, patient_name) {
	let patient_index = state.patients.map(x => x.name).indexOf(patient_name);

	let cloned_patients_list = state.patients.slice();
	let patient = cloned_patients_list[patient_index];

	return patient;
}
