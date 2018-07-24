import React, { Component } from "react";
import AddNote from "./AddNote";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import { darken } from "../../../methods";

class Notes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show_create_notes_panel: false
		};
	}

	render() {
		const { patient, add_note } = this.props;
		return (
			<div className="patient_profile_route">
				{this.state.show_create_notes_panel ? (
					<AddNote
						close_create_notes_panel={this.toggle_show_create_notes_panel.bind(
							this
						)}
						add_note={add_note}
						patient={patient}
					/>
				) : (
					""
				)}
				<div id="create_note_btn_container">
					<button
						id="create_note_btn"
						onClick={() => this.toggle_show_create_notes_panel()}
					>
						<i className="fa fa-plus" />
					</button>
					<button
						id="expand_notes_btn"
						onClick={() => this.expand_recent_notes()}
					>
						Expand All
					</button>
				</div>

				{this.show_notes(this.props)}
			</div>
		);
	}

	toggle_show_create_notes_panel() {
		this.setState({
			show_create_notes_panel: !this.state.show_create_notes_panel
		});
		darken();
	}

	show_notes(props) {
		return (
			<div id="notes_container">
				{props.patient.notes.map((note, x) => (
					<div
						key={x}
						className="note"
						onClick={e => this.expand_note(e.target)}
					>
						<span id="note_date">{note.date}</span>
						<span>{note.title}</span>
						<div id="note_content">{ReactHtmlParser(note.content)}</div>
					</div>
				))}
			</div>
		);
	}

	parse_note(content) {
		return <div />;
	}

	expand_note(e) {
		if (e.className !== "note") {
			let parent = e.parentNode;
			return parent.lastChild.classList.toggle("show");
		}
		e.childNodes[2].classList.toggle("show");
	}

	expand_recent_notes(e) {
		let notes = document.querySelectorAll(".note");
		Array.prototype.map.call(notes, note => this.expand_note(note));
	}
}

export default Notes;
