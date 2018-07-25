import React, { Component } from "react";

class DropDown extends Component {
	render() {
		return (
			<div
				id="dropdown_container"
				onClick={e => this.toggle_select_dropdown_option(e)}
			>
				<div id="dropdown_selected_option">
					{this.props.selected_option}
					<i className="fa fa-chevron-down" aria-hidden="true" />
				</div>

				<div id={`dropdown_options_container`}>
					{this.props.items.map((item, x) => (
						<div
							key={x}
							id="dropdown_option"
							onClick={e =>
								this.props.set_selected_option(e.target.textContent)
							}
						>
							{item}
						</div>
					))}

					{this.props.category == "dose" ? (
						<div id="medicine_dosage_container">
							<input
								type="number"
								onKeyPress={e => this.create_new_dosage_dropdown_option(e)}
							/>+
							<input
								type="number"
								onKeyPress={e => this.create_new_dosage_dropdown_option(e)}
							/>+
							<input
								type="number"
								onKeyPress={e => this.create_new_dosage_dropdown_option(e)}
							/>+
							<input
								type="number"
								onKeyPress={e => this.create_new_dosage_dropdown_option(e)}
							/>
						</div>
					) : (
						<strong
							contentEditable
							data-text={`New ${this.props.category}`}
							onKeyPress={e => this.create_new_dropdown_option(e)}
						/>
					)}
				</div>
			</div>
		);
	}

	create_new_dosage_dropdown_option(e) {
		if (e.key === "Enter") {
			e.preventDefault();

			let inputs = document.querySelectorAll(
				"#medicine_dosage_container input"
			);
			let inputs_validation_counter = 0;
			let dosage_value = "";

			for (let i = 0; i < inputs.length; i++) {
				let value = inputs[i].value;
				let separator = "+";

				if (i == inputs.length - 1) separator = "";
				if (value) {
					inputs_validation_counter++;
					dosage_value += value + separator;
				}
			}

			if (inputs_validation_counter == 4) {
				//add dosage if all inputs are filled in

				this.props.add_dropdown_item(dosage_value, this.props.category_list);
				Array.from(inputs).map(el => (el.value = ""));
			}
		}
	}

	create_new_dropdown_option(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			this.props.add_dropdown_item(
				e.target.textContent,
				this.props.category_list
			);
			e.target.textContent = "";
		}
	}

	toggle_select_dropdown_option(e) {
		if (e.target.id == "medicine_dosage_container") {
			return;
		}
		if (e.target.parentNode.id == "medicine_dosage_container") {
			return;
		}
		if (e.target.nodeName === "I") {
			let parent = e.target.parentNode;
			return parent.nextSibling.classList.toggle("show");
		}

		if (e.target.childNodes[0].nodeName === "STRONG") {
			return;
		}

		if (e.target.id === "dropdown_option" && e.target.textContent !== "") {
			this.props.set_selected_option(e.target.textContent);
			return e.target.parentNode.classList.toggle("show");
		}

		if (e.target.nextSibling.id === "dropdown_options_container") {
			return e.target.nextSibling.classList.toggle("show");
		}
	}
}

export default DropDown;
