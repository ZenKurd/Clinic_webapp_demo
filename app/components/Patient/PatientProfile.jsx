import React, { Component } from "react";
import moment from "moment";
import { Vitals, Appointments, Notes, Info, Lab, Medicine } from "./profile";

export default class PatientsList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active_tab: "notes",
			selected_diagnosis_option: ""
		};
	}

	render() {
		const { selected_patient } = this.props.props;
		return (
			<div id="patients_profile_route" className="route_section">
				<div id="patient_tabs_container">
					<div id="selected_patient_container">
						<strong>
							ID:{selected_patient.id}
							&emsp;&emsp;
							{selected_patient.name}
							&emsp;&emsp;
							{selected_patient.age} y.o
						</strong>
					</div>

					<a
						className="patient_tab"
						onClick={e => this.set_active_tab("info", e.target)}
					>
						Info
					</a>
					<a
						className="patient_tab"
						onClick={e => this.set_active_tab("notes", e.target)}
					>
						Notes
					</a>
					<a
						className="patient_tab"
						onClick={e => this.set_active_tab("vitals", e.target)}
					>
						Vitals
					</a>
					<a
						className="patient_tab"
						onClick={e => this.set_active_tab("lab", e.target)}
					>
						Lab
					</a>
					<a
						className="patient_tab"
						onClick={e => this.set_active_tab("medicine", e.target)}
					>
						Medicine
					</a>
					<a
						className="patient_tab"
						onClick={e => this.set_active_tab("appointments", e.target)}
					>
						Appointments
					</a>
					<a
						className="patient_tab"
						id="close_patient_tab"
						onClick={e => this.remove_selected_patient()}
					>
						<i className="fa fa-window-close-o" aria-hidden="true" />
					</a>
				</div>
				{this.show_route(this.props)}
			</div>
		);
	}

	remove_selected_patient() {
		this.props.actions.remove_selected_patient();
	}

	set_selected_diagnosis_option(option) {
		this.setState({ selected_diagnosis_option: option });
	}

	show_route(props) {
		const {
			selected_patient,
			lab_list,
			diagnosis_list,
			medicine_dose_list,
			medicine_list
		} = props.props;

		const {
			add_item,
			add_appointment,
			add_dropdown_item,
			stop_medicine
		} = props.actions;
		const { darken } = props.darken;

		if (this.state.active_tab === "notes") {
			return (
				<Notes patient={selected_patient} add_note={add_item} darken={darken} />
			);
		}

		if (this.state.active_tab === "vitals") {
			return <Vitals patient={selected_patient} add_vitals={add_item} />;
		}

		if (this.state.active_tab === "lab") {
			return (
				<Lab
					add_lab_item={add_item}
					lab_list={lab_list}
					darken={darken}
					patient={selected_patient}
				/>
			);
		}

		if (this.state.active_tab === "info") {
			return (
				<Info
					patient={selected_patient}
					create_diagnosis={this.create_diagnosis.bind(this)}
					selected_option={this.state.selected_diagnosis_option}
					set_selected_option={this.set_selected_diagnosis_option.bind(this)}
					add_dropdown_item={this.props.add_dropdown_item}
					diagnosis_list={diagnosis_list}
				/>
			);
		}

		if (this.state.active_tab === "appointments") {
			return (
				<Appointments
					patient={selected_patient}
					add_appointment={add_appointment}
				/>
			);
		}

		if (this.state.active_tab === "medicine") {
			return (
				<Medicine
					stop_medicine={stop_medicine}
					create_diagnosis={this.create_diagnosis.bind(this)}
					selected_option={this.state.selected_diagnosis_option}
					set_selected_option={this.set_selected_diagnosis_option.bind(this)}
					medicine_dose_list={medicine_dose_list}
					add_dropdown_item={add_dropdown_item}
					medicine_list={medicine_list}
					diagnosis_list={diagnosis_list}
					patient={selected_patient}
					add_medicine={add_item}
				/>
			);
		}
	}

	set_active_tab(tab, el) {
		let tabs = document.querySelectorAll(".patient_tab");

		Array.prototype.map.call(tabs, tab => {
			tab.className = "patient_tab";
		});

		el.className = "patient_tab active_patient_tab";

		this.setState({ active_tab: tab });
	}

	create_diagnosis() {
		let treatment = document.querySelector("#create_diagnosis_treatment");

		if (treatment && this.state.selected_diagnosis_option) {
			let diagnosis_bj = {
				date: moment().format("MMM Do YYYY"),
				diagnosis: this.state.selected_diagnosis_option,
				treatment: treatment.value
			};

			treatment.value = "";
			this.setState({ selected_diagnosis_option: "" });
			this.props.add_item(diagnosis_bj, this.props.patient[0], "diagnosis");
		}
	}
}
