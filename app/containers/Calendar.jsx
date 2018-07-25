import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import BookPanel from "../components/util/BookPanel";
import { withRouter } from "react-router-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { connect } from "react-redux";
import {
	darken,
	add_appointment,
	navigate_to_patient_profile,
	move_appointment
} from "../methods";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Appointments extends Component {
	constructor(props) {
		super(props);

		this.state = {
			show_book_panel: false,
			selected_slot: ""
		};
	}

	render() {
		const { patients, events, dispatch } = this.props;
		return (
			<div className="route_view" id="appointments_route">
				{this.state.show_book_panel ? (
					<BookPanel
						history={this.props.history}
						selected_slot={this.state.selected_slot}
						close_book_panel={this.close_book_panel.bind(this)}
						patients={patients}
						add_appointment={add_appointment}
						dispatch={dispatch}
					/>
				) : (
					""
				)}

				<DragAndDropCalendar
					onEventDrop={this.moveEvent.bind(this)}
					selectable
					events={events}
					step={15}
					timeslots={2}
					min={this.get_min_time()}
					defaultView="week"
					onSelectEvent={event => this.navigate_to_patient(event, dispatch)}
					onSelectSlot={slot_info => this.book_slot(slot_info)}
					formats={{
						eventTimeRangeFormat: function() {
							return "";
						}
					}}
				/>
			</div>
		);
	}
	moveEvent({ event, start, end }) {
		move_appointment(event, start, end, this.props.dispatch);
	}

	navigate_to_patient(event, dispatch) {
		this.props.history.push("/patients");
		navigate_to_patient_profile(event.title, dispatch);
	}

	book_slot(slot_info) {
		this.setState({
			show_book_panel: true,
			selected_slot: slot_info
		});
		darken();
	}

	close_book_panel() {
		darken();
		this.setState({ show_book_panel: false });
	}

	get_min_time() {
		let time = new Date();

		time.setHours(7);
		time.setMinutes(0);
		time.setSeconds(0);

		return time;
	}
}

const mapStateToProps = state => {
	return {
		patients: state.default.patients,
		events: state.default.events
	};
};

export default connect(mapStateToProps)(withRouter(Appointments));
