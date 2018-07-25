import React, { Component } from "react";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { fetch_data, logout } from "./methods";
import PatientsContainer from "./containers/Patients";
import Appointments from "./containers/Calendar";
import { Nav } from "./components/Nav";

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
				<div id="router">
					<div className="darken" />

					<Nav username={this.props.username} logout={logout} />

					<Switch>
						<Route exact path="/" component={PatientsContainer} />
						<Route exact path="/demo" component={PatientsContainer} />
						<Route path="/patients" component={PatientsContainer} />
						<Route path="/appointments" component={Appointments} />
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
