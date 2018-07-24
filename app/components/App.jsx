import React, { Component } from "react";
import { connect } from "react-redux";

import { fetch_data } from "./MainFunctions";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PatientsContainer from "./Main/Patients";
import Appointments from "./Main/Appointments";

import axios from "axios";

class App extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		const mode = window.location.pathname;

		fetch_data(dispatch, mode); //mode can be demo or logged in
	}

	render() {
		return (
			<Router>
				<div id="route_container">
					<div className="darken" />

					<Link to="/patients" className="route_tab">
						<i className="fa fa-user-md" aria-hidden="true" />
					</Link>

					<Link to="/appointments" className="route_tab">
						<i className="fa fa-calendar" aria-hidden="true" />
					</Link>

					<button onClick={() => this.logout()} id="logout">
						Logout
					</button>

					<div id="logged_in_info">user: {this.props.username || ""}</div>

					<Switch>
						<Route exact path="/" component={PatientsContainer} />
						<Route path="/patients" component={PatientsContainer} />
						<Route path="/appointments" component={Appointments} />
						/>
					</Switch>
				</div>
			</Router>
		);
	}
}
const mapStateToProps = state => {
	return {
		username: state.default.username
	};
};
export default connect(mapStateToProps)(App);
