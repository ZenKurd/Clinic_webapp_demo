export function new_state(state, payload) {
	return {
		...state,
		...payload
	};
}

export function init_calendar_events(patients) {
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

/* export function store_in_ls(user_data, lab_data) {
	let key;
	if (user_data.username == "demo_user") key = "demo_";

	localStorage.setItem(key + "user_data", JSON.stringify(user_data));
	localStorage.setItem(key + "lab_data", JSON.stringify(lab_data));
}
 */
