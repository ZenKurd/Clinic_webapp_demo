import { init_calendar_events } from "./util.js";

const init_state = {};

export default (state = init_state, action) => {
	switch (action.type) {
		case "INIT_STATE": {
			const { data, lab_data } = action.payload;

			return Object.assign({}, state, {
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
			});
		}

		default:
			return state;
	}
};
