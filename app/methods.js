import axios from "axios";

export { fetch_data, logout, darken };

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

function move_appointment(event, start, end) {
	let patients = this.state.patients.slice(),
		appointments = [],
		patient_index,
		appointment_index,
		appointment = {
			title: event.title,
			start: start,
			end: end,
			desc: event.desc
		};

	for (let i = 0; i < patients.length; i++) {
		if (patients[i].name === event.title) {
			for (let j = 0; j < patients[i].appointments.length; j++) {
				if (patients[i].appointments[j].start === event.start) {
					patient_index = i;
					appointment_index = j;
					patients[i].appointments.push(appointment);
					break;
				}
			}
		}
	}

	if (typeof patient_index === "number") {
		patients[patient_index].appointments.splice(appointment_index, 1);
	}

	patients.map(patient => {
		patient.appointments.map(apt => {
			appointments.push(apt);
		});
	});

	this.setState({
		patients: patients,
		events: appointments
	});

	setTimeout(() => this.send_post_req(), 2000);
}

function init_calendar_events_state() {
	let appointments = [];

	this.state.patients.map(patient => {
		patient.appointments.map(apt => {
			appointments.push({
				title: apt.title,
				start: new Date(apt.start),
				end: new Date(apt.end)
			});
		});
	});

	this.setState({ events: appointments });

	setTimeout(() => this.send_post_req(), 1000);
}
