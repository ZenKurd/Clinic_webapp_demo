import {
	update_calendar_events,
	new_state,
	update_patients,
	move_appointment,
	add_appointment,
	find_patient,
	add_dropdown_item,
	set_demo
} from "./util.js";

const init_state = {};

export default (state = init_state, action) => {
	switch (action.type) {
		case "INIT_STATE": {
			const { data, lab_data } = action.payload;
			set_demo(data.username);
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
		case "ADD_DROPDOWN_ITEM": {
			const { item, category } = action.payload;
			return add_dropdown_item(state, item, category);
		}

		case "ADD_PATIENT":
			return new_state(state, action.payload, true);
		case "SELECTED_PATIENT":
			return new_state(state, action.payload);
		case "STOP_MEDICINE":
			return update_patients(state, action.payload.updated_patient, true);
		case "ADD_ITEM":
			return update_patients(state, action.payload.updated_patient, true);
		case "ADD_APPOINTMENT":
			let { patient_name, appointment } = action.payload;
			return add_appointment(state, patient_name, appointment);
		case "MOVE_APPOINTMENT":
			let { moved_appointment, event } = action.payload;
			return move_appointment(state, moved_appointment, event);
		case "NAVIGATE_TO_PATIENT_PROFILE": {
			let { patient_name } = action.payload;
			let patient = find_patient(state, patient_name);
			return {
				...state,
				selected_patient: patient
			};
		}
		default:
			return state;
	}
};
