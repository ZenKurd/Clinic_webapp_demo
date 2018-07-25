import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export const Nav = props => {
	return (
		<nav>
			<Link to="/patients" className="tab" id="patient_route_tab">
				<i className="fa fa-user-md" aria-hidden="true" />
			</Link>

			<Link to="/appointments" className="tab" id="calendar_route_tab">
				<i className="fa fa-calendar" aria-hidden="true" />
			</Link>
			<i
				className="fa fa-sign-out"
				aria-hidden="true"
				onClick={() => props.logout()}
				id="logout"
			/>
			<div id="logged_in_info">{props.username || ""}</div>
		</nav>
	);
};
