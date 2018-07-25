import axios from "axios";

export {
	fetch_data,
	logout,
	darken,
	add_appointment,
	move_appointment,
	navigate
};

function darken() {
	let darken_div = document.querySelector(".darken");
	darken_div.classList.toggle("darken_show");
}

function fetch_data(dispatch, mode) {
	return axios
		.get("/data", {
			params: {
				mode: mode
			}
		})
		.then(res => {
			dispatch({
				type: "INIT_STATE",
				payload: res.data
			});
		});
}

function logout() {
	axios.get(`/logout`).then(res => {
		window.location = "/";
	});
}

function navigate(patient) {
	let selected_patient,
		patients = this.state.patients;

	for (let i = 0; i < patients.length; i++) {
		if (patients[i].name === patient) {
			selected_patient = patients[i];
		}
	}

	this.setState({ selected_patient: [selected_patient] });
}

function move_appointment(event, start, end, dispatch) {
	const moved_appointment = {
		title: event.title,
		start: start,
		end: end,
		desc: event.desc
	};

	dispatch({
		type: "MOVE_APPOINTMENT",
		payload: {
			moved_appointment: moved_appointment,
			event: event
		}
	});
}

function add_appointment(appointment, patient, dispatch) {
	dispatch({
		type: "ADD_APPOINTMENT",
		payload: {
			appointment: appointment,
			patient_name: patient
		}
	});
}
