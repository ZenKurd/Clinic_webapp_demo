import React, { Component } from "react";

class Searchable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searched_options: []
		};
	}

	render() {
		return (
			<div id="searchable_container">
				<input
					type="text"
					placeholder={`search/create ${
						this.props.category
					} (require dosage strength e.g. 500mg/ml)`}
					id="search_item_input"
					onChange={e => this.search_item(e)}
					onKeyPress={e => this.add_item(e)}
				/>

				{this.state.searched_options.length > 0 ? this.render_options() : ""}
			</div>
		);
	}

	add_item(e) {
		let input_value = e.target.value;
		let searched_options = this.state.searched_options;

		if (e.key == "Enter" && !this.item_not_in_list(input_value)) {
			e.preventDefault();

			let category = this.props.category;
			if (category == "medicine") category += "_list";

			this.props.add_dropdown_item(input_value, category);
			e.target.value = "";
			return this.setState({ searched_options: [] });
		}
	}

	item_not_in_list(option) {
		let { options_list } = this.props;
		let index = options_list.indexOf(option);

		if (index > -1) return true;
		else return false;
	}

	search_item(e) {
		let value = e.target.value,
			searched_options = [];
		if (value === "") {
			return this.setState({
				searched_options: []
			});
		}
		this.props.add_dropdown_item;
		if (value.length > 0) {
			for (let i = 0; i < this.props.options_list.length; i++) {
				let option = this.props.options_list[i],
					option_name = option.toLowerCase();

				if (option_name.startsWith(value)) {
					searched_options.push(option);
				}
			}
		}

		return this.setState({ searched_options: searched_options });
	}

	set_option(e) {
		this.props.set_selected_option(e.target.textContent);
		e.target.parentNode.previousSibling.value = e.target.textContent;

		return this.setState({ searched_options: [] });
	}

	render_options() {
		return (
			<div id="searchable_options_container">
				{this.state.searched_options.map((option, x) => (
					<div id="found_option" key={x} onClick={e => this.set_option(e)}>
						{option}
					</div>
				))}
			</div>
		);
	}
}

export default Searchable;
