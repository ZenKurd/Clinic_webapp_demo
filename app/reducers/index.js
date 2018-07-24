import { init_calendar_events, send_post_req, new_state } from "./util.js";

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
				selected_patient: [],
				diagnosis_list: data.diagnosis_list,
				medicine_list: data.medicine_list,
				medicine_dose_list: data.medicine_dose_list,
				events: init_calendar_events(data.patients)
			};
		}

		case "ADD_PATIENT":
			return new_state(state, action.payload);
		case "SELECTED_PATIENT":
			return new_state(state, action.payload);
		default:
			return state;
	}
};
