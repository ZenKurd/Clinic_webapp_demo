import React, { Component } from "react";
import { bindActionCreators } from "redux";
import PatientProfile from "../components/patient/PatientProfile";
import PatientsList from "../components/patient/PatientsList";
import AddPatientPanel from "../components/patient/AddPatientPanel";
import { connect } from "react-redux";
import * as PatientsActionCreators from "../components/patient/actions";
import { darken } from "../methods";

class PatientsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searched_patients: [],
			search_match: false,
			show_add_patient_panel: false
		};

		this.boundActionCreators = bindActionCreators(
			PatientsActionCreators,
			this.props.dispatch
		);
	}

	render() {
		let { searched_patients } = this.state,
			{
				selected_patient,
				patients,
				remove_selected_patient,
				add_appointment,
				add_patient,
				add_item,
				diagnosis_list,
				add_dropdown_item
			} = this.props;

		return (
			<div className="route_view">
				{this.state.show_add_patient_panel ? (
					<AddPatientPanel
						add_patient={this.boundActionCreators.add_patient}
						patients={patients}
						close_patient_panel={() => this.toggle_patient_panel()}
					/>
				) : (
					""
				)}

				{this.render_view(this.props, this.state, this.boundActionCreators)}
			</div>
		);
	}

	render_view(props, state, boundActionCreators) {
		const { patients, selected_patient } = props;
		const { searched_patients } = state;

		return selected_patient ? (
			<PatientProfile
				actions={boundActionCreators}
				clear_searched_patients={this.clear_searched_patients.bind(this)}
				props={props}
				darken={darken}
			/>
		) : (
			<PatientsList
				patients={patients}
				searched_patients={searched_patients}
				render_patients={this.render_patients.bind(this)}
				search_patient={this.search_patient.bind(this)}
				toggle_patient_panel={this.toggle_patient_panel.bind(this)}
			/>
		);
	}

	toggle_patient_panel() {
		this.setState({
			show_add_patient_panel: !this.state.show_add_patient_panel
		});
		darken();
	}

	clear_searched_patients() {
		return this.setState({
			searched_patients: [],
			search_match: false
		});
	}

	search_patient(e) {
		let value = e.target.value,
			searched_patients = [];

		if (value === "") {
			return this.setState({
				searched_patients: [],
				search_match: false
			});
		}

		if (value.length > 0) {
			for (let i = 0; i < this.props.patients.length; i++) {
				let patient = this.props.patients[i],
					patient_name = patient.name.toLowerCase();

				if (patient_name.startsWith(value)) {
					searched_patients.push(patient);
				}
			}

			if (searched_patients.length === 0) {
				return this.setState({ search_match: true });
			}
		}

		return this.setState({
			search_match: false,
			searched_patients: searched_patients
		});
	}

	render_patients(patients) {
		if (this.state.search_match === true) {
			return;
		}

		return (
			<div className="patients_list">
				{patients.map((patient, x) => (
					<div
						key={x}
						className="patient"
						onClick={() =>
							this.boundActionCreators.show_patient_profile(patient)
						}
					>
						<span>{patient.name}</span>
						<span>{patient.birth}</span>
						<span>{patient.age}</span>
						<span>{patient.gender}</span>
						<span>{patient.address}</span>
						<span>{patient.phone}</span>
					</div>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => {
	const {
		lab_list,
		diagnosis_list,
		medicine_list,
		medicine_dose_list,
		patients,
		selected_patient
	} = state.default;
	return {
		lab_list,
		diagnosis_list,
		medicine_list,
		medicine_dose_list,
		patients,
		selected_patient
	};
};

export default connect(mapStateToProps)(PatientsContainer);
