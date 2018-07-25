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

export function move_appointment(state, appointment, event) {
	console.log(appointment, event);

	return {
		...state
	};
}
