import {
	update_calendar_events,
	send_post_req,
	new_state,
	update_patients,
	update_patient,
	move_appointment
} from "./util.js";

const init_state = {};

export default (state = init_state, action) => {
	switch (action.type) {
		case "INIT_STATE": {
			const { data, lab_data } = action.payload;

			return {
				...state,
				username: data.username,
				_id: data._id,
				email: data.email,
				password: data.password,
				lab_list: lab_data,
				patients: data.patients,
				selected_patient: null,
				diagnosis_list: data.diagnosis_list,
				medicine_list: data.medicine_list,
				medicine_dose_list: data.medicine_dose_list,
				events: update_calendar_events(data.patients)
			};
		}

		case "ADD_PATIENT":
			return new_state(state, action.payload);
		case "SELECTED_PATIENT":
			return new_state(state, action.payload);
		case "STOP_MEDICINE":
			return update_patients(state, action.payload.updated_patient, true);
		case "ADD_ITEM":
			return update_patients(state, action.payload.updated_patient, true);
		case "ADD_APPOINTMENT":
			let { patient_name, appointment } = action.payload;
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

		case "MOVE_APPOINTMENT":
			let { moved_appointment, event } = action.payload;
			return move_appointment(state, moved_appointment, event);

		default:
			return state;
	}
};
