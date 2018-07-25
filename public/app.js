(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;require.register("fs", function(exports, require, module) {
  module.exports = {};
});
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("app.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _methods = require("./methods");

var _Patients = require("./containers/Patients");

var _Patients2 = _interopRequireDefault(_Patients);

var _Calendar = require("./containers/Calendar");

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Nav = require("./components/Nav");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
	}

	_createClass(App, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var dispatch = this.props.dispatch;

			var mode = window.location.pathname;

			(0, _methods.fetch_data)(dispatch, mode); //mode can be demo or logged in
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_reactRouterDom.BrowserRouter,
				null,
				_react2.default.createElement(
					"div",
					{ id: "router" },
					_react2.default.createElement("div", { className: "darken" }),
					_react2.default.createElement(_Nav.Nav, { username: this.props.username, logout: _methods.logout }),
					_react2.default.createElement(
						_reactRouterDom.Switch,
						null,
						_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _Patients2.default }),
						_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/demo", component: _Patients2.default }),
						_react2.default.createElement(_reactRouterDom.Route, { path: "/patients", component: _Patients2.default }),
						_react2.default.createElement(_reactRouterDom.Route, { path: "/appointments", component: _Calendar2.default })
					)
				)
			);
		}
	}]);

	return App;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		username: state.default.username
	};
};
exports.default = (0, _reactRedux.connect)(mapStateToProps)(App);

});

require.register("components/Nav.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Nav = undefined;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = exports.Nav = function Nav(props) {
	return _react2.default.createElement(
		"nav",
		null,
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ to: "/patients", className: "tab", id: "patient_route_tab" },
			_react2.default.createElement("i", { className: "fa fa-user-md", "aria-hidden": "true" })
		),
		_react2.default.createElement(
			_reactRouterDom.Link,
			{ to: "/appointments", className: "tab", id: "calendar_route_tab" },
			_react2.default.createElement("i", { className: "fa fa-calendar", "aria-hidden": "true" })
		),
		_react2.default.createElement("i", {
			className: "fa fa-sign-out",
			"aria-hidden": "true",
			onClick: function onClick() {
				return props.logout();
			},
			id: "logout"
		}),
		_react2.default.createElement(
			"div",
			{ id: "logged_in_info" },
			props.username || ""
		)
	);
};

});

require.register("components/patient/AddPatientPanel.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddPatientPanel = function (_Component) {
	_inherits(AddPatientPanel, _Component);

	function AddPatientPanel(props) {
		_classCallCheck(this, AddPatientPanel);

		var _this = _possibleConstructorReturn(this, (AddPatientPanel.__proto__ || Object.getPrototypeOf(AddPatientPanel)).call(this, props));

		_this.state = {
			gender: null
		};
		return _this;
	}

	_createClass(AddPatientPanel, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var patients = this.props.patients;

			return _react2.default.createElement(
				"div",
				{ id: "add_patient_container" },
				_react2.default.createElement(
					"button",
					{
						id: "close_patient_panel_btn",
						onClick: this.props.close_patient_panel
					},
					_react2.default.createElement("i", { className: "fa fa-window-close-o", "aria-hidden": "true" }),
					" "
				),
				_react2.default.createElement(
					"div",
					{ id: "add_patient_fields" },
					_react2.default.createElement("input", { type: "text", placeholder: "patient_name", name: "patient_name" }),
					_react2.default.createElement("input", {
						type: "date",
						placeholder: "patient_birth_date",
						defaultValue: "1990-01-01",
						name: "patient_birth_date"
					}),
					_react2.default.createElement(
						"select",
						{
							onChange: function onChange(e) {
								return _this2.setState({
									gender: e.target.value.toLowerCase()
								});
							},
							name: "patient_gender"
						},
						_react2.default.createElement(
							"option",
							null,
							"Male"
						),
						_react2.default.createElement(
							"option",
							null,
							"Female"
						)
					),
					_react2.default.createElement(
						"div",
						{ id: "label" },
						_react2.default.createElement(
							"label",
							{ htmlFor: "patient_smoker" },
							"Smoker"
						),
						_react2.default.createElement("input", { type: "checkbox", name: "patient_smoker", id: "patient_smoker" })
					),
					this.state.gender === "female" ? _react2.default.createElement(
						"div",
						{ id: "label" },
						_react2.default.createElement(
							"label",
							{ htmlFor: "patient_gravida" },
							"Gravida"
						),
						_react2.default.createElement("input", {
							type: "checkbox",
							name: "patient_gravida",
							id: "patient_gravida"
						})
					) : "",
					_react2.default.createElement("input", { type: "text", placeholder: "address", name: "patient_address" }),
					_react2.default.createElement("input", { type: "number", placeholder: "phone", name: "patient_phone" }),
					_react2.default.createElement(
						"button",
						{
							id: "submit_new_patient",
							onClick: function onClick() {
								return _this2.add_patient(patients);
							}
						},
						"add"
					)
				)
			);
		}
	}, {
		key: "add_patient",
		value: function add_patient(patients) {
			var gender = document.querySelector("select[name=patient_gender]").value;

			var patient_details = {
				name: document.querySelector("input[name=patient_name]").value,
				date: document.querySelector("input[name=patient_birth_date]").value,
				gender: gender,
				address: document.querySelector("input[name=patient_address]").value,
				phone: document.querySelector("input[name=patient_phone]").value,
				gravida: gender === "female" ? document.querySelector("input[name=patient_gravida]").value : "",
				smoker: document.querySelector("input[name=patient_smoker]").value
			};

			this.props.add_patient(patient_details, patients);
			this.props.close_patient_panel();
		}
	}]);

	return AddPatientPanel;
}(_react.Component);

exports.default = AddPatientPanel;

});

require.register("components/patient/PatientProfile.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _profile = require("./profile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientsList = function (_Component) {
	_inherits(PatientsList, _Component);

	function PatientsList(props) {
		_classCallCheck(this, PatientsList);

		var _this = _possibleConstructorReturn(this, (PatientsList.__proto__ || Object.getPrototypeOf(PatientsList)).call(this, props));

		_this.state = {
			active_tab: "notes",
			selected_diagnosis_option: ""
		};
		return _this;
	}

	_createClass(PatientsList, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var selected_patient = this.props.props.selected_patient;

			return _react2.default.createElement(
				"div",
				{ className: "patients_route" },
				_react2.default.createElement(
					"div",
					{ id: "patient_tabs_container" },
					_react2.default.createElement(
						"div",
						{ id: "selected_patient_container" },
						_react2.default.createElement(
							"strong",
							null,
							"ID:",
							selected_patient.id,
							"\u2003\u2003",
							selected_patient.name,
							"\u2003\u2003",
							selected_patient.age,
							" y.o"
						),
						_react2.default.createElement(
							"a",
							{
								id: "close_patient_tab",
								onClick: function onClick(e) {
									return _this2.remove_selected_patient();
								}
							},
							_react2.default.createElement("i", { className: "fa fa-window-close-o", "aria-hidden": "true" })
						)
					),
					_react2.default.createElement(
						"div",
						{ id: "patient_tabs" },
						_react2.default.createElement(
							"a",
							{
								className: "patient_tab",
								onClick: function onClick(e) {
									return _this2.set_active_tab("info", e.target);
								}
							},
							"Info"
						),
						_react2.default.createElement(
							"a",
							{
								className: "patient_tab",
								onClick: function onClick(e) {
									return _this2.set_active_tab("notes", e.target);
								}
							},
							"Notes"
						),
						_react2.default.createElement(
							"a",
							{
								className: "patient_tab",
								onClick: function onClick(e) {
									return _this2.set_active_tab("vitals", e.target);
								}
							},
							"Vitals"
						),
						_react2.default.createElement(
							"a",
							{
								className: "patient_tab",
								onClick: function onClick(e) {
									return _this2.set_active_tab("lab", e.target);
								}
							},
							"Lab"
						),
						_react2.default.createElement(
							"a",
							{
								className: "patient_tab",
								onClick: function onClick(e) {
									return _this2.set_active_tab("medicine", e.target);
								}
							},
							"Medicine"
						),
						_react2.default.createElement(
							"a",
							{
								className: "patient_tab",
								onClick: function onClick(e) {
									return _this2.set_active_tab("appointments", e.target);
								}
							},
							"Appointments"
						)
					)
				),
				this.show_route(this.props)
			);
		}
	}, {
		key: "remove_selected_patient",
		value: function remove_selected_patient() {
			this.props.clear_searched_patients();
			this.props.actions.remove_selected_patient();
		}
	}, {
		key: "set_selected_diagnosis_option",
		value: function set_selected_diagnosis_option(option) {
			this.setState({ selected_diagnosis_option: option });
		}
	}, {
		key: "show_route",
		value: function show_route(props) {
			var _props$props = props.props,
			    selected_patient = _props$props.selected_patient,
			    lab_list = _props$props.lab_list,
			    diagnosis_list = _props$props.diagnosis_list,
			    medicine_dose_list = _props$props.medicine_dose_list,
			    medicine_list = _props$props.medicine_list;
			var _props$actions = props.actions,
			    add_item = _props$actions.add_item,
			    add_appointment = _props$actions.add_appointment,
			    add_dropdown_item = _props$actions.add_dropdown_item,
			    stop_medicine = _props$actions.stop_medicine;


			if (this.state.active_tab === "notes") {
				return _react2.default.createElement(_profile.Notes, { patient: selected_patient, add_note: add_item });
			}

			if (this.state.active_tab === "vitals") {
				return _react2.default.createElement(_profile.Vitals, { patient: selected_patient, add_vitals: add_item });
			}

			if (this.state.active_tab === "lab") {
				return _react2.default.createElement(_profile.Lab, {
					add_lab_item: add_item,
					lab_list: lab_list,
					patient: selected_patient
				});
			}

			if (this.state.active_tab === "info") {
				return _react2.default.createElement(_profile.Info, {
					patient: selected_patient,
					create_diagnosis: this.create_diagnosis.bind(this),
					selected_option: this.state.selected_diagnosis_option,
					set_selected_option: this.set_selected_diagnosis_option.bind(this),
					add_dropdown_item: this.props.add_dropdown_item,
					diagnosis_list: diagnosis_list
				});
			}

			if (this.state.active_tab === "appointments") {
				return _react2.default.createElement(_profile.Appointments, {
					patient: selected_patient,
					add_appointment: add_appointment
				});
			}

			if (this.state.active_tab === "medicine") {
				return _react2.default.createElement(_profile.Medicine, {
					stop_medicine: stop_medicine,
					create_diagnosis: this.create_diagnosis.bind(this),
					selected_option: this.state.selected_diagnosis_option,
					set_selected_option: this.set_selected_diagnosis_option.bind(this),
					medicine_dose_list: medicine_dose_list,
					add_dropdown_item: add_dropdown_item,
					medicine_list: medicine_list,
					diagnosis_list: diagnosis_list,
					patient: selected_patient,
					add_medicine: add_item
				});
			}
		}
	}, {
		key: "set_active_tab",
		value: function set_active_tab(tab, el) {
			var tabs = document.querySelectorAll(".patient_tab");

			Array.prototype.map.call(tabs, function (tab) {
				tab.className = "patient_tab";
			});

			el.className = "patient_tab active_patient_tab";

			this.setState({ active_tab: tab });
		}
	}, {
		key: "create_diagnosis",
		value: function create_diagnosis() {
			var treatment = document.querySelector("#create_diagnosis_treatment");

			if (treatment && this.state.selected_diagnosis_option) {
				var diagnosis_bj = {
					date: (0, _moment2.default)().format("MMM Do YYYY"),
					diagnosis: this.state.selected_diagnosis_option,
					treatment: treatment.value
				};

				treatment.value = "";
				this.setState({ selected_diagnosis_option: "" });
				this.props.actions.add_item(diagnosis_bj, this.props.props.selected_patient, "diagnosis");
			}
		}
	}]);

	return PatientsList;
}(_react.Component);

exports.default = PatientsList;

});

require.register("components/patient/PatientsList.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientsList = function (_Component) {
	_inherits(PatientsList, _Component);

	function PatientsList() {
		_classCallCheck(this, PatientsList);

		return _possibleConstructorReturn(this, (PatientsList.__proto__ || Object.getPrototypeOf(PatientsList)).apply(this, arguments));
	}

	_createClass(PatientsList, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    searched_patients = _props.searched_patients,
			    patients = _props.patients,
			    render_patients = _props.render_patients,
			    search_patient = _props.search_patient,
			    toggle_patient_panel = _props.toggle_patient_panel;


			return _react2.default.createElement(
				"div",
				{ id: "patients_list_container", className: "patients_route" },
				_react2.default.createElement("input", {
					type: "text",
					placeholder: "search patient...",
					id: "search_patient_input",
					onChange: function onChange(e) {
						return search_patient(e);
					}
				}),
				_react2.default.createElement(
					"button",
					{ id: "add_patient_btn", onClick: function onClick() {
							return toggle_patient_panel();
						} },
					_react2.default.createElement("i", { className: "fa fa-user-plus", "aria-hidden": "true" })
				),
				_react2.default.createElement(
					"h3",
					null,
					"Name"
				),
				_react2.default.createElement(
					"h3",
					null,
					"Birth"
				),
				_react2.default.createElement(
					"h3",
					null,
					"Age"
				),
				_react2.default.createElement(
					"h3",
					null,
					"Gender"
				),
				_react2.default.createElement(
					"h3",
					null,
					"Address"
				),
				_react2.default.createElement(
					"h3",
					null,
					"Phone"
				),
				searched_patients.length > 0 ? render_patients(searched_patients) : render_patients(patients)
			);
		}
	}]);

	return PatientsList;
}(_react.Component);

exports.default = PatientsList;

});

require.register("components/patient/actions.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.add_patient = add_patient;
exports.add_dropdown_item = add_dropdown_item;
exports.stop_medicine = stop_medicine;
exports.remove_selected_patient = remove_selected_patient;
exports.show_patient_profile = show_patient_profile;
exports.add_item = add_item;
exports.add_appointment = add_appointment;
function add_patient(patient, patients) {
	if (patient.name && patient.date && patient.gender && patient.address) {
		var updated_patients = patients.slice(),
		    birth = patient.date.split("-"),
		    reversed_birth = birth.reverse().join("-"),
		    date1 = new Date(),
		    date2 = new Date(patient.date),
		    time_diff = Math.abs(date2.getTime() - date1.getTime()),
		    diff_years = Math.ceil(time_diff / (1000 * 3600 * 24) / 365),
		    new_patient = {
			name: patient.name,
			birth: reversed_birth,
			gender: patient.gender,
			id: Math.floor(Math.random() * (999999 - 100000)) + 100000,
			age: diff_years,
			gravida: patient.gravida,
			hypertension: patient.hypertension,
			diabetes: patient.diabetes,
			phone: patient.phone,
			smoker: patient.smoker,
			address: patient.address,
			notes: [],
			lab: [],
			appointments: [],
			vitals: [],
			medicine: [],
			diagnosis: []
		};

		updated_patients.unshift(new_patient);

		return {
			type: "ADD_PATIENT",
			payload: { patients: updated_patients }
		};
	}
}

function add_dropdown_item(item, category) {
	// don't add medicine that have no strength added
	if (category == "medicine_list") {
		var validate_medicine = item.match(/\d+\s?(ml|mg)$/);
		if (!validate_medicine) return { type: "NOTHING" };
	}

	return {
		type: "ADD_DROPDOWN_ITEM",
		payload: {
			item: item,
			category: category
		}
	};
}

function stop_medicine(patient, medicine) {
	var updated_patient = patient;
	var index = updated_patient.medicine.indexOf(medicine);
	updated_patient.medicine[index].active = false;

	return {
		type: "STOP_MEDICINE",
		payload: { updated_patient: updated_patient }
	};
}

function remove_selected_patient() {
	return {
		type: "SELECTED_PATIENT",
		payload: { selected_patient: null }
	};
}

function show_patient_profile(patient) {
	return {
		type: "SELECTED_PATIENT",
		payload: { selected_patient: patient }
	};
}

function add_item(item, patient, property) {
	var updated_patient = patient[property].unshift(item);

	return {
		type: "ADD_ITEM",
		payload: { updated_patient: updated_patient }
	};
}

function add_appointment(appointment, patient) {
	return {
		type: "ADD_APPOINTMENT",
		payload: {
			appointment: appointment,
			patient_name: patient
		}
	};
}

});

;require.register("components/patient/profile/AddLabDetailsPanel.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddLabModule = require('./AddLabModule');

var _AddLabModule2 = _interopRequireDefault(_AddLabModule);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddLabDetailsPanel = function (_Component) {
    _inherits(AddLabDetailsPanel, _Component);

    function AddLabDetailsPanel() {
        _classCallCheck(this, AddLabDetailsPanel);

        return _possibleConstructorReturn(this, (AddLabDetailsPanel.__proto__ || Object.getPrototypeOf(AddLabDetailsPanel)).apply(this, arguments));
    }

    _createClass(AddLabDetailsPanel, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { id: 'add_lab_details_panel_container' },
                _react2.default.createElement(
                    'button',
                    { onClick: function onClick() {
                            return _this2.props.toggle_add_lab_panel();
                        }, id: 'add_lab_details_panel_close_btn' },
                    'X'
                ),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(_AddLabModule2.default, { lab_list: this.props.lab_list,
                    set_selected_option: this.props.set_selected_option,
                    category: 'lab' }),
                _react2.default.createElement(
                    'button',
                    { id: 'create_lab_btn', onClick: function onClick() {
                            return _this2.construct_lab_details();
                        } },
                    'Create'
                )
            );
        }
    }, {
        key: 'construct_lab_details',
        value: function construct_lab_details() {
            var lab_results = document.querySelectorAll('input[name="lab_result_input"]'),
                lab_names = document.querySelectorAll("#search_item_input"),
                tests = [];

            for (var i = 0; i < lab_names.length; i++) {
                if (lab_results[i].value && lab_names[i].value) {
                    tests.push({
                        "name": lab_names[i].value.trim(),
                        "result": lab_results[i].value
                    });
                }
            }

            var lab_obj = {
                "date": (0, _moment2.default)().format("YYYY-MM-DD"), // h:mm:ss a for later
                "tests": tests
            };
            return this.props.construct_lab(lab_obj);
        }
    }]);

    return AddLabDetailsPanel;
}(_react.Component);

exports.default = AddLabDetailsPanel;

});

require.register("components/patient/profile/AddLabModule.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Searchable = require("../../util/Searchable");

var _Searchable2 = _interopRequireDefault(_Searchable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddLabModule = function (_Component) {
	_inherits(AddLabModule, _Component);

	function AddLabModule() {
		_classCallCheck(this, AddLabModule);

		return _possibleConstructorReturn(this, (AddLabModule.__proto__ || Object.getPrototypeOf(AddLabModule)).apply(this, arguments));
	}

	_createClass(AddLabModule, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ id: "lab_dropdown_container" },
					_react2.default.createElement(_Searchable2.default, {
						options_list: this.props.lab_list,
						set_selected_option: this.props.set_selected_option,
						category: "lab"
					})
				),
				_react2.default.createElement("input", { type: "text", name: "lab_result_input", placeholder: "result" })
			);
		}
	}]);

	return AddLabModule;
}(_react.Component);

exports.default = AddLabModule;

});

require.register("components/patient/profile/AddNote.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDraftWysiwyg = require('react-draft-wysiwyg');

var _draftjsToHtml = require('draftjs-to-html');

var _draftjsToHtml2 = _interopRequireDefault(_draftjsToHtml);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditorComponent = function EditorComponent() {
    return _react2.default.createElement(_reactDraftWysiwyg.Editor, null);
};

var AddNote = function (_Component) {
    _inherits(AddNote, _Component);

    function AddNote(props) {
        _classCallCheck(this, AddNote);

        var _this = _possibleConstructorReturn(this, (AddNote.__proto__ || Object.getPrototypeOf(AddNote)).call(this, props));

        _this.state = {
            editorState: _draftJs.EditorState.createEmpty()
        };
        return _this;
    }

    _createClass(AddNote, [{
        key: 'onEditorStateChange',
        value: function onEditorStateChange(editorState) {
            this.setState({ editorState: editorState });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { id: 'create_note_container' },
                _react2.default.createElement(
                    'div',
                    { id: 'close_create_note_panel' },
                    _react2.default.createElement(
                        'button',
                        { onClick: this.props.close_create_notes_panel, id: 'close_create_note_btn' },
                        'X'
                    )
                ),
                _react2.default.createElement(
                    'select',
                    { name: 'create_note_title' },
                    _react2.default.createElement(
                        'option',
                        null,
                        'title'
                    ),
                    _react2.default.createElement(
                        'option',
                        null,
                        'primary Journal'
                    ),
                    _react2.default.createElement(
                        'option',
                        null,
                        'out-patient'
                    ),
                    _react2.default.createElement(
                        'option',
                        null,
                        'in-patient'
                    ),
                    _react2.default.createElement(
                        'option',
                        null,
                        'discharged summary'
                    ),
                    _react2.default.createElement(
                        'option',
                        null,
                        'treatment plan'
                    )
                ),
                _react2.default.createElement(_reactDraftWysiwyg.Editor, {
                    editorState: this.state.editorState,
                    onEditorStateChange: function onEditorStateChange(val) {
                        return _this2.onEditorStateChange(val);
                    } }),
                _react2.default.createElement(
                    'button',
                    { id: 'create_note_btn', onClick: function onClick() {
                            return _this2.construct_note();
                        } },
                    'Create'
                )
            );
        }
    }, {
        key: 'construct_note',
        value: function construct_note() {
            var title = document.querySelector("select[name=create_note_title]"),
                contentState = (0, _draftJs.convertToRaw)(this.state.editorState.getCurrentContent()),
                markup = (0, _draftjsToHtml2.default)(contentState);

            if (!title.value.match(/^\s*$/)) {

                var note = {
                    date: (0, _moment2.default)().format("MM-DD-YYYY"),
                    title: title.value,
                    content: markup
                };

                title.value = "";
                this.setState({ editorState: _draftJs.EditorState.createEmpty() });
                this.props.add_note(note, this.props.patient, "notes");
                this.props.close_create_notes_panel();
            }
        }
    }]);

    return AddNote;
}(_react.Component);

exports.default = AddNote;

});

require.register("components/patient/profile/Appointments.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Appointments = function (_Component) {
    _inherits(Appointments, _Component);

    function Appointments(props) {
        _classCallCheck(this, Appointments);

        var _this = _possibleConstructorReturn(this, (Appointments.__proto__ || Object.getPrototypeOf(Appointments)).call(this, props));

        _this.state = {
            start_date: null,
            end_date: null
        };
        return _this;
    }

    _createClass(Appointments, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'patient_profile_route' },
                _react2.default.createElement(
                    'div',
                    { className: 'patient_appointments_container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'patient_upcoming_apt' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Upcoming'
                        ),
                        this.props.patient.appointments.map(function (apt, x) {
                            return _this2.render_date(apt, "upcoming", x);
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'patient_past_apt' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Past'
                        ),
                        this.props.patient.appointments.map(function (apt, x) {
                            return _this2.render_date(apt, "past", x);
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'add_appointment_sidebar' },
                        _react2.default.createElement(_reactDatetime2.default, {
                            inputProps: { placeholder: "start" },
                            value: this.state.start_date,
                            onChange: function onChange(val) {
                                return _this2.set_date(val, "start");
                            } }),
                        _react2.default.createElement(_reactDatetime2.default, {
                            inputProps: { placeholder: "end" },
                            value: this.state.end_date,
                            onChange: function onChange(val) {
                                return _this2.set_date(val, "end");
                            } }),
                        _react2.default.createElement('textarea', { id: 'add_appointment_patient_profile_description' }),
                        _react2.default.createElement(
                            'button',
                            { onClick: function onClick() {
                                    return _this2.add_appointment();
                                } },
                            'Create Appointment'
                        )
                    )
                )
            );
        }
    }, {
        key: 'set_date',
        value: function set_date(val, type) {
            if (type === "start") {
                this.setState({ start_date: val._d });
            }

            if (type === "end") {
                this.setState({ end_date: val._d });
            }
        }
    }, {
        key: 'render_date',
        value: function render_date(date, condition, key) {
            var current_date = (0, _moment2.default)().format("MM-DD-YYYY, h:mm a"),
                end_date = (0, _moment2.default)(date.end).format("MM-DD-YYYY, h:mm a"),
                start_date = (0, _moment2.default)(date.start).format("MM-DD-YYYY, h:mm a");

            if (condition === "upcoming" && end_date >= current_date) {
                return _react2.default.createElement(
                    'div',
                    { key: key, className: 'apt_div' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            { id: 'span_date_title' },
                            'Start:'
                        ),
                        ' ',
                        start_date
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            { id: 'span_date_title' },
                            'End:'
                        ),
                        ' ',
                        end_date
                    )
                );
            }

            if (condition === "past" && end_date < current_date) {
                return _react2.default.createElement(
                    'div',
                    { key: key, className: 'apt_div' },
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            { id: 'span_date_title' },
                            'Start:'
                        ),
                        ' ',
                        start_date
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                            'span',
                            { id: 'span_date_title' },
                            'End:'
                        ),
                        ' ',
                        end_date
                    )
                );
            }
        }
    }, {
        key: 'add_appointment',
        value: function add_appointment() {
            var description = document.querySelector("#add_appointment_patient_profile_description"),
                patient = this.props.patient.name,
                start_date = new Date(this.state.start_date),
                end_date = new Date(this.state.end_date),
                appointment = {
                date: (0, _moment2.default)().format("MM-DD-YYYY, h:mm"),
                title: patient,
                desc: description.value,
                start: start_date,
                end: end_date
            };

            this.props.add_appointment(appointment, patient, "appointment");

            description.value = "";

            this.setState({
                start_date: null,
                end_date: null
            });
        }
    }]);

    return Appointments;
}(_react.Component);

exports.default = Appointments;

});

require.register("components/patient/profile/Diagnosis.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _DropDown = require("../../util/DropDown");

var _DropDown2 = _interopRequireDefault(_DropDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Diagnosis = function (_Component) {
	_inherits(Diagnosis, _Component);

	function Diagnosis() {
		_classCallCheck(this, Diagnosis);

		return _possibleConstructorReturn(this, (Diagnosis.__proto__ || Object.getPrototypeOf(Diagnosis)).apply(this, arguments));
	}

	_createClass(Diagnosis, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ id: "diagnosis_container" },
				_react2.default.createElement(
					"button",
					{
						id: "btn_add_diagnosis",
						onClick: function onClick(e) {
							return _this2.props.create_diagnosis(e);
						}
					},
					"Create Diagnosis"
				),
				_react2.default.createElement(
					"div",
					{ id: "dropdown_diagnosis_container" },
					_react2.default.createElement(_DropDown2.default, {
						selected_option: this.props.selected_option,
						set_selected_option: this.props.set_selected_option,
						category_list: this.props.category_list,
						add_dropdown_item: this.props.add_dropdown_item,
						items: this.props.items,
						category: this.props.category
					})
				),
				_react2.default.createElement("textarea", { id: "create_diagnosis_treatment", placeholder: "treatment" }),
				this.render_diagnosis()
			);
		}
	}, {
		key: "render_diagnosis",
		value: function render_diagnosis() {
			return _react2.default.createElement(
				"div",
				{ id: "diagnosis_list_container" },
				this.props.patient.diagnosis.map(function (diagnosis, x) {
					return _react2.default.createElement(
						"div",
						{ key: x, id: "diagnosis" },
						_react2.default.createElement(
							"h4",
							null,
							diagnosis.date.match(/\d+$/)[0]
						),
						_react2.default.createElement(
							"h4",
							null,
							diagnosis.diagnosis
						),
						_react2.default.createElement(
							"h4",
							null,
							diagnosis.treatment
						)
					);
				})
			);
		}
	}]);

	return Diagnosis;
}(_react.Component);

exports.default = Diagnosis;

});

require.register("components/patient/profile/Info.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Diagnosis = require('./Diagnosis');

var _Diagnosis2 = _interopRequireDefault(_Diagnosis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Info = function (_Component) {
    _inherits(Info, _Component);

    function Info() {
        _classCallCheck(this, Info);

        return _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));
    }

    _createClass(Info, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'patient_profile_route' },
                _react2.default.createElement(
                    'div',
                    { id: 'patients_info_container' },
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'ID:'
                        ),
                        ' ',
                        this.props.patient.id
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Name:'
                        ),
                        ' ',
                        this.props.patient.name
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Birth:'
                        ),
                        ' ',
                        this.props.patient.birth
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Age:'
                        ),
                        ' ',
                        this.props.patient.age
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Gender:'
                        ),
                        ' ',
                        this.props.patient.gender
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Gravida:'
                        ),
                        ' ',
                        this.props.patient.gravida
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Smoker:'
                        ),
                        ' ',
                        this.props.patient.smoker,
                        ' years'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Address:'
                        ),
                        ' ',
                        this.props.patient.address
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        ' ',
                        _react2.default.createElement(
                            'u',
                            null,
                            'Phone:'
                        ),
                        ' ',
                        this.props.patient.phone
                    )
                ),
                _react2.default.createElement(_Diagnosis2.default, {
                    create_diagnosis: this.props.create_diagnosis,
                    patient: this.props.patient,
                    selected_option: this.props.selected_option,
                    set_selected_option: this.props.set_selected_option,
                    category_list: 'diagnosis_list',
                    add_dropdown_item: this.props.add_dropdown_item,
                    items: this.props.diagnosis_list,
                    category: 'diagnosis' })
            );
        }
    }]);

    return Info;
}(_react.Component);

exports.default = Info;

});

require.register("components/patient/profile/Lab.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AddLabDetailsPanel = require("./AddLabDetailsPanel");

var _AddLabDetailsPanel2 = _interopRequireDefault(_AddLabDetailsPanel);

var _methods = require("../../../methods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lab = function (_Component) {
	_inherits(Lab, _Component);

	function Lab(props) {
		_classCallCheck(this, Lab);

		var _this = _possibleConstructorReturn(this, (Lab.__proto__ || Object.getPrototypeOf(Lab)).call(this, props));

		_this.state = {
			lab_analysis_list: [],
			lab_details: [],
			add_lab_details_panel: false,
			selected_options: []
		};
		return _this;
	}

	_createClass(Lab, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.construct_lab_list();
			this.construct_lab_details();
		}
	}, {
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(nextProps) {
			this.construct_lab_list();
			this.construct_lab_details();
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ className: "patient_profile_route" },
				_react2.default.createElement(
					"div",
					{ id: "lab_container" },
					_react2.default.createElement(
						"div",
						{ id: "lab_analysis_container" },
						_react2.default.createElement(
							"div",
							{ id: "lab_analysis_list_container" },
							_react2.default.createElement(
								"strong",
								null,
								"Lab analysis list"
							),
							this.render_lab_analysis_list()
						),
						_react2.default.createElement(
							"div",
							{ id: "lab_analysis_unit_container" },
							_react2.default.createElement(
								"strong",
								null,
								"Unit"
							),
							this.render_lab_unit_list()
						)
					),
					_react2.default.createElement(
						"div",
						{ id: "patient_lab_details_container" },
						this.render_columns()
					),
					_react2.default.createElement(
						"button",
						{
							id: "add_lab_details_btn",
							onClick: function onClick() {
								return _this2.toggle_add_lab_panel();
							}
						},
						_react2.default.createElement("i", { className: "fa fa-plus-square", "aria-hidden": "true" })
					),
					this.state.add_lab_details_panel ? _react2.default.createElement(_AddLabDetailsPanel2.default, {
						construct_lab: this.construct_lab.bind(this),
						set_selected_option: this.set_selected_option.bind(this),
						lab_list: this.props.lab_list,
						toggle_add_lab_panel: this.toggle_add_lab_panel.bind(this)
					}) : ""
				)
			);
		}
	}, {
		key: "construct_lab",
		value: function construct_lab(lab_obj) {
			this.setState({ selected_options: [] });
			this.props.add_lab_item(lab_obj, this.props.patient, "lab");

			return this.toggle_add_lab_panel();
		}
	}, {
		key: "set_selected_option",
		value: function set_selected_option(option) {
			var new_selected_options = this.state.selected_options;
			new_selected_options.push(option);

			this.setState({ selected_options: new_selected_options });
		}
	}, {
		key: "toggle_add_lab_panel",
		value: function toggle_add_lab_panel() {
			this.state.add_lab_details_panel ? this.setState({ add_lab_details_panel: false }) : this.setState({ add_lab_details_panel: true });

			(0, _methods.darken)();
		}
	}, {
		key: "render_lab_unit_list",
		value: function render_lab_unit_list() {
			_react2.default.createElement(
				"div",
				{ id: "lab_analysis_unit_container" },
				" "
			);
		}
	}, {
		key: "render_lab_analysis_list",
		value: function render_lab_analysis_list() {
			return _react2.default.createElement(
				"div",
				{ id: "lab_analysis_div_container" },
				this.state.lab_analysis_list.map(function (item, x) {
					return _react2.default.createElement(
						"div",
						{ id: "lab_analysis_div", key: x },
						item
					);
				})
			);
		}
	}, {
		key: "render_columns",
		value: function render_columns() {
			var _this3 = this;

			return _react2.default.createElement(
				"div",
				{ id: "patient_lab_columns_container" },
				this.state.lab_details.map(function (lab, x) {
					return _react2.default.createElement(
						"div",
						{ key: x, id: "patient_lab_column" },
						_react2.default.createElement(
							"strong",
							null,
							lab.date
						),
						_this3.state.lab_analysis_list.map(function (lab_analysis_item, z) {
							return _this3.render_lab_analysis_div(lab, lab_analysis_item, z);
						})
					);
				})
			);
		}
	}, {
		key: "render_lab_analysis_div",
		value: function render_lab_analysis_div(lab, lab_analysis_item, key) {
			var filtered_tests = lab.tests.filter(function (test) {
				return test.name === lab_analysis_item;
			});

			return filtered_tests.length > 0 ? _react2.default.createElement(
				"div",
				{ key: key, id: "lab_test_exists" },
				filtered_tests[0]["result"]
			) : _react2.default.createElement("div", { key: key, id: "lab_test_not_exists" });
		}
	}, {
		key: "construct_lab_list",
		value: function construct_lab_list() {
			var lab_analysis_list = this.state.lab_analysis_list.slice();

			this.props.patient.lab.map(function (lab, x) {
				return lab.tests.map(function (test, z) {
					return lab_analysis_list.indexOf(test.name) === -1 ? lab_analysis_list.push(test.name) : null;
				});
			});

			lab_analysis_list = lab_analysis_list.sort(function (a, b) {
				return a > b ? 1 : a < b ? -1 : 0;
			});

			return this.setState({ lab_analysis_list: lab_analysis_list });
		}
	}, {
		key: "construct_lab_details",
		value: function construct_lab_details() {
			this.setState({
				lab_details: this.props.patient.lab.sort(function (a, b) {
					return a["date"] < b["date"] ? 1 : a["date"] > b["date"] ? -1 : 0;
				})
			});
		}
	}]);

	return Lab;
}(_react.Component);

exports.default = Lab;

});

require.register("components/patient/profile/Medicine.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _DropDown = require("../../util/DropDown");

var _DropDown2 = _interopRequireDefault(_DropDown);

var _Searchable = require("../../util/Searchable");

var _Searchable2 = _interopRequireDefault(_Searchable);

var _Diagnosis = require("./Diagnosis");

var _Diagnosis2 = _interopRequireDefault(_Diagnosis);

var _reactPikaday = require("react-pikaday");

var _reactPikaday2 = _interopRequireDefault(_reactPikaday);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Medicine = function (_Component) {
	_inherits(Medicine, _Component);

	function Medicine(props) {
		_classCallCheck(this, Medicine);

		var _this = _possibleConstructorReturn(this, (Medicine.__proto__ || Object.getPrototypeOf(Medicine)).call(this, props));

		_this.state = {
			selected_medicine_option: "",
			selected_medicine_dose_option: "",
			start_date: null,
			end_date: null
		};
		return _this;
	}

	_createClass(Medicine, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ className: "patient_profile_route" },
				_react2.default.createElement(
					"div",
					{ id: "medicine_container" },
					_react2.default.createElement(
						"div",
						{ id: "create_medicine_container" },
						_react2.default.createElement(
							"div",
							{ id: "parent_medicine_dropdown_container" },
							_react2.default.createElement(
								"div",
								{ id: "medicine_dropdown_container" },
								_react2.default.createElement(_Searchable2.default, {
									options_list: this.props.medicine_list,
									set_selected_option: this.set_selected_medicine_option.bind(this),
									add_dropdown_item: this.props.add_dropdown_item,
									category: "medicine"
								})
							)
						),
						_react2.default.createElement(
							"div",
							{ id: "parent_medicine_dose_dropdown_container" },
							_react2.default.createElement(
								"div",
								{ id: "medicine_dose_dropdown_container" },
								_react2.default.createElement(_DropDown2.default, {
									selected_option: this.state.selected_medicine_dose_option,
									set_selected_option: this.set_selected_medicine_dose_option.bind(this),
									category_list: "medicine_dose_list",
									add_dropdown_item: this.props.add_dropdown_item,
									items: this.props.medicine_dose_list,
									category: "dose"
								})
							)
						),
						_react2.default.createElement(_reactPikaday2.default, {
							placeholder: "start",
							onChange: function onChange(date) {
								return _this2.setState({
									start_date: date.toDateString()
								});
							}
						}),
						_react2.default.createElement(_reactPikaday2.default, {
							placeholder: "end",
							onChange: function onChange(date) {
								return _this2.setState({
									end_date: date.toDateString()
								});
							}
						}),
						_react2.default.createElement(
							"button",
							{ onClick: function onClick() {
									return _this2.create_medicine();
								} },
							"Create"
						)
					),
					_react2.default.createElement(
						"div",
						{ id: "active_medicine_container" },
						_react2.default.createElement(
							"u",
							null,
							"Current Medicine"
						),
						this.render_active_medicine()
					),
					_react2.default.createElement(
						"div",
						{ id: "inactive_medicine_container" },
						_react2.default.createElement(
							"u",
							null,
							"Past Medicine"
						),
						this.render_inactive_medicine()
					)
				),
				_react2.default.createElement(_Diagnosis2.default, {
					create_diagnosis: this.props.create_diagnosis,
					patient: this.props.patient,
					selected_option: this.props.selected_option,
					set_selected_option: this.props.set_selected_option,
					category_list: "diagnosis_list",
					add_dropdown_item: this.props.add_dropdown_item,
					items: this.props.diagnosis_list,
					category: "diagnosis"
				})
			);
		}
	}, {
		key: "stop_medicine",
		value: function stop_medicine(medicine) {
			this.props.stop_medicine(this.props.patient, medicine);
		}
	}, {
		key: "render_active_medicine",
		value: function render_active_medicine() {
			var _this3 = this;

			return _react2.default.createElement(
				"div",
				{ id: "medicine_list_container" },
				this.props.patient.medicine.map(function (medicine, x) {
					return (0, _moment2.default)(medicine.end) > (0, _moment2.default)() && medicine.active ? _react2.default.createElement(
						"div",
						{ key: x, id: "medicine" },
						_react2.default.createElement(
							"h4",
							null,
							(0, _moment2.default)(medicine.start).format("MM-DD-YYYY")
						),
						_react2.default.createElement(
							"h4",
							null,
							(0, _moment2.default)(medicine.end).format("MM-DD-YYYY")
						),
						_react2.default.createElement(
							"h4",
							null,
							medicine.name.match(/(\w+)/)[0]
						),
						_react2.default.createElement(
							"h4",
							null,
							medicine.strength
						),
						_react2.default.createElement(
							"h4",
							null,
							medicine.dose
						),
						_react2.default.createElement(
							"div",
							{
								id: "stop_medicine",
								onClick: function onClick() {
									return _this3.stop_medicine(medicine);
								}
							},
							"stop"
						)
					) : "";
				})
			);
		}
	}, {
		key: "render_inactive_medicine",
		value: function render_inactive_medicine() {
			return _react2.default.createElement(
				"div",
				{ id: "medicine_list_container" },
				this.props.patient.medicine.map(function (medicine, x) {
					return (0, _moment2.default)(medicine.end) < (0, _moment2.default)() || !medicine.active ? _react2.default.createElement(
						"div",
						{ key: x, id: "medicine" },
						_react2.default.createElement(
							"h4",
							null,
							(0, _moment2.default)(medicine.start).format("MM-DD-YYYY")
						),
						_react2.default.createElement(
							"h4",
							null,
							(0, _moment2.default)(medicine.end).format("MM-DD-YYYY")
						),
						_react2.default.createElement(
							"h4",
							null,
							medicine.name.match(/(\w+)/)[0]
						),
						_react2.default.createElement(
							"h4",
							null,
							medicine.strength
						),
						_react2.default.createElement(
							"h4",
							null,
							medicine.dose
						),
						_react2.default.createElement(
							"h4",
							null,
							medicine.active
						)
					) : "";
				})
			);
		}
	}, {
		key: "create_medicine",
		value: function create_medicine() {
			var _state = this.state,
			    selected_medicine_option = _state.selected_medicine_option,
			    selected_medicine_dose_option = _state.selected_medicine_dose_option,
			    start_date = _state.start_date,
			    end_date = _state.end_date;


			if (selected_medicine_option && selected_medicine_dose_option && start_date && end_date && selected_medicine_option !== "medicine") {
				var medicine_active = (0, _moment2.default)(end_date) > (0, _moment2.default)() ? true : false;

				var medicine = {
					start: (0, _moment2.default)(start_date).format("YYYY-MM-DD"),
					end: (0, _moment2.default)(end_date).format("YYYY-MM-DD"),
					name: selected_medicine_option,
					dose: selected_medicine_dose_option,
					strength: selected_medicine_option.match(/\d+\s?(ml|mg)$/)[1],
					active: medicine_active
				};

				var input = document.querySelector("#search_item_input");
				input.value = "";

				this.setState({
					selected_medicine_option: "",
					selected_medicine_dose_option: "",
					start_date: null,
					end_date: null
				});

				this.props.add_medicine(medicine, this.props.patient, "medicine");
			}
		}
	}, {
		key: "set_selected_medicine_option",
		value: function set_selected_medicine_option(option) {
			console.log(option);
			this.setState({ selected_medicine_option: option });
		}
	}, {
		key: "set_selected_medicine_dose_option",
		value: function set_selected_medicine_dose_option(option) {
			this.setState({ selected_medicine_dose_option: option });
		}
	}]);

	return Medicine;
}(_react.Component);

exports.default = Medicine;

});

require.register("components/patient/profile/Notes.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AddNote = require("./AddNote");

var _AddNote2 = _interopRequireDefault(_AddNote);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactHtmlParser = require("react-html-parser");

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _methods = require("../../../methods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Notes = function (_Component) {
	_inherits(Notes, _Component);

	function Notes(props) {
		_classCallCheck(this, Notes);

		var _this = _possibleConstructorReturn(this, (Notes.__proto__ || Object.getPrototypeOf(Notes)).call(this, props));

		_this.state = {
			show_create_notes_panel: false
		};
		return _this;
	}

	_createClass(Notes, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    patient = _props.patient,
			    add_note = _props.add_note;

			return _react2.default.createElement(
				"div",
				{ className: "patient_profile_route" },
				this.state.show_create_notes_panel ? _react2.default.createElement(_AddNote2.default, {
					close_create_notes_panel: this.toggle_show_create_notes_panel.bind(this),
					add_note: add_note,
					patient: patient
				}) : "",
				_react2.default.createElement(
					"div",
					{ id: "create_note_btn_container" },
					_react2.default.createElement(
						"button",
						{
							id: "create_note_btn",
							onClick: function onClick() {
								return _this2.toggle_show_create_notes_panel();
							}
						},
						_react2.default.createElement("i", { className: "fa fa-plus" })
					),
					_react2.default.createElement(
						"button",
						{
							id: "expand_notes_btn",
							onClick: function onClick() {
								return _this2.expand_recent_notes();
							}
						},
						"Expand All"
					)
				),
				this.show_notes(this.props)
			);
		}
	}, {
		key: "toggle_show_create_notes_panel",
		value: function toggle_show_create_notes_panel() {
			this.setState({
				show_create_notes_panel: !this.state.show_create_notes_panel
			});
			(0, _methods.darken)();
		}
	}, {
		key: "show_notes",
		value: function show_notes(props) {
			var _this3 = this;

			return _react2.default.createElement(
				"div",
				{ id: "notes_container" },
				props.patient.notes.map(function (note, x) {
					return _react2.default.createElement(
						"div",
						{
							key: x,
							className: "note",
							onClick: function onClick(e) {
								return _this3.expand_note(e.target);
							}
						},
						_react2.default.createElement(
							"span",
							{ id: "note_date" },
							note.date
						),
						_react2.default.createElement(
							"span",
							null,
							note.title
						),
						_react2.default.createElement(
							"div",
							{ id: "note_content" },
							(0, _reactHtmlParser2.default)(note.content)
						)
					);
				})
			);
		}
	}, {
		key: "parse_note",
		value: function parse_note(content) {
			return _react2.default.createElement("div", null);
		}
	}, {
		key: "expand_note",
		value: function expand_note(e) {
			if (e.className !== "note") {
				var parent = e.parentNode;
				return parent.lastChild.classList.toggle("show");
			}
			e.childNodes[2].classList.toggle("show");
		}
	}, {
		key: "expand_recent_notes",
		value: function expand_recent_notes(e) {
			var _this4 = this;

			var notes = document.querySelectorAll(".note");
			Array.prototype.map.call(notes, function (note) {
				return _this4.expand_note(note);
			});
		}
	}]);

	return Notes;
}(_react.Component);

exports.default = Notes;

});

require.register("components/patient/profile/Vitals.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Vitals = function (_Component) {
    _inherits(Vitals, _Component);

    function Vitals() {
        _classCallCheck(this, Vitals);

        return _possibleConstructorReturn(this, (Vitals.__proto__ || Object.getPrototypeOf(Vitals)).apply(this, arguments));
    }

    _createClass(Vitals, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'patient_profile_route' },
                _react2.default.createElement(
                    'div',
                    { id: 'vitals_container' },
                    _react2.default.createElement(
                        'table',
                        null,
                        _react2.default.createElement(
                            'tbody',
                            null,
                            _react2.default.createElement(
                                'tr',
                                { id: 'vitals_head' },
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Date'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Time'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Bloodpressure mmHg'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Pulse /min'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Temperature C'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Respiratory Rate /min'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Saturation %'
                                ),
                                _react2.default.createElement(
                                    'th',
                                    null,
                                    'Oxygen L'
                                )
                            )
                        ),
                        this.render_vitals()
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'add_vitals_container' },
                        _react2.default.createElement('input', { name: 'vitals_date', type: 'date', placeholder: 'date' }),
                        _react2.default.createElement('input', { name: 'vitals_time', placeholder: 'time' }),
                        _react2.default.createElement('input', { type: 'number', name: 'vitals_bloodpressure_systolic', placeholder: 'sys' }),
                        _react2.default.createElement(
                            'strong',
                            null,
                            '/'
                        ),
                        _react2.default.createElement('input', { type: 'number', name: 'vitals_bloodpressure_diastolic', placeholder: 'dia' }),
                        _react2.default.createElement('input', { type: 'number', name: 'vitals_pulse', placeholder: 'pulse' }),
                        _react2.default.createElement('input', { type: 'number', name: 'vitals_temperature', placeholder: 'temperature' }),
                        _react2.default.createElement('input', { type: 'number', name: 'vitals_respiratory_rate', placeholder: 'respiratory' }),
                        _react2.default.createElement('input', { type: 'number', name: 'vitals_saturation', placeholder: 'saturation' }),
                        _react2.default.createElement('input', { type: 'number', name: 'vitals_oxygen', placeholder: 'oxygen' }),
                        _react2.default.createElement(
                            'button',
                            { onClick: function onClick() {
                                    return _this2.add_vitals();
                                } },
                            'Add vitals'
                        )
                    )
                )
            );
        }
    }, {
        key: 'add_vitals',
        value: function add_vitals() {

            var date = document.querySelector("input[name=vitals_date]"),
                time = document.querySelector("input[name=vitals_time]"),
                blood_pressure_systolic = document.querySelector("input[name=vitals_bloodpressure_systolic]"),
                blood_pressure_diastolic = document.querySelector("input[name=vitals_bloodpressure_diastolic]"),
                pulse = document.querySelector("input[name=vitals_pulse]"),
                temperature = document.querySelector("input[name=vitals_temperature]"),
                respiratory_rate = document.querySelector("input[name=vitals_respiratory_rate]"),
                saturation = document.querySelector("input[name=vitals_saturation]"),
                oxygen = document.querySelector("input[name=vitals_oxygen]");

            var vitals = {
                date: date.value ? date.value : (0, _moment2.default)().format("DD-MM-YYYY"),
                time: time.value ? time.value : (0, _moment2.default)().format('h:mm:ss a'),
                bloodpressure: {
                    "systolic": blood_pressure_systolic.value,
                    "diastolic": blood_pressure_diastolic.value
                },
                temperature: temperature.value,
                pulse: pulse.value,
                respiratory_rate: respiratory_rate.value,
                saturation: saturation.value,
                oxygen: oxygen.value
            };

            this.props.add_vitals(vitals, this.props.patient, "vitals");

            date.value = "", time.value = "", blood_pressure_systolic.value = "", blood_pressure_diastolic.value = "", pulse.value = "", temperature.value = "", respiratory_rate.value = "", saturation.value = "", oxygen.value = "";
        }
    }, {
        key: 'render_vitals',
        value: function render_vitals() {
            return _react2.default.createElement(
                'tbody',
                { className: 'vitals_records' },
                this.props.patient.vitals.map(function (vital, x) {
                    return _react2.default.createElement(
                        'tr',
                        { key: x },
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.date
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.time
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.bloodpressure.systolic,
                            '/',
                            vital.bloodpressure.diastolic
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.pulse,
                            ' '
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.temperature
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.respiratory_rate
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.saturation
                        ),
                        _react2.default.createElement(
                            'th',
                            null,
                            vital.oxygen
                        )
                    );
                })
            );
        }
    }]);

    return Vitals;
}(_react.Component);

{/* date
    time
    bloodpressure, systolic /diastolic
    pulse, integer
    temperature, celsius
    respiratory_rate, integer
    saturation, percentage
    oxygen ,liter */}
exports.default = Vitals;

});

require.register("components/patient/profile/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vitals = require("./Vitals.jsx");

Object.defineProperty(exports, "Vitals", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Vitals).default;
  }
});

var _Appointments = require("./Appointments.jsx");

Object.defineProperty(exports, "Appointments", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Appointments).default;
  }
});

var _Notes = require("./Notes.jsx");

Object.defineProperty(exports, "Notes", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Notes).default;
  }
});

var _Info = require("./Info.jsx");

Object.defineProperty(exports, "Info", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Info).default;
  }
});

var _Lab = require("./Lab.jsx");

Object.defineProperty(exports, "Lab", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Lab).default;
  }
});

var _Medicine = require("./Medicine.jsx");

Object.defineProperty(exports, "Medicine", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Medicine).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

});

;require.register("components/util/BookPanel.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactDatetime = require("react-datetime");

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BookPanel = function (_Component) {
	_inherits(BookPanel, _Component);

	function BookPanel(props) {
		_classCallCheck(this, BookPanel);

		var _this = _possibleConstructorReturn(this, (BookPanel.__proto__ || Object.getPrototypeOf(BookPanel)).call(this, props));

		_this.state = {
			start_date: props.selected_slot.start,
			end_date: props.selected_slot.end
		};
		return _this;
	}

	_createClass(BookPanel, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ id: "book_panel_container" },
				_react2.default.createElement(
					"button",
					{ id: "close_book_panel_btn", onClick: this.props.close_book_panel },
					_react2.default.createElement("i", { className: "fa fa-window-close-o", "aria-hidden": "true" })
				),
				_react2.default.createElement(
					"div",
					{ id: "book_panel_fields" },
					_react2.default.createElement(_reactDatetime2.default, {
						defaultValue: this.props.selected_slot.start,
						value: this.state.start_date,
						onChange: function onChange(val) {
							return _this2.set_date(val, "start");
						}
					}),
					_react2.default.createElement(_reactDatetime2.default, {
						defaultValue: this.props.selected_slot.end,
						value: this.state.end_date,
						onChange: function onChange(val) {
							return _this2.set_date(val, "end");
						}
					}),
					_react2.default.createElement(
						"select",
						{ name: "book_patient_select" },
						_react2.default.createElement("option", null),
						this.props.patients.map(function (patient, x) {
							return _react2.default.createElement(
								"option",
								{ key: x },
								patient.name
							);
						})
					),
					_react2.default.createElement("textarea", {
						placeholder: "description...",
						name: "book_appointment_description"
					}),
					_react2.default.createElement(
						"button",
						{ onClick: function onClick() {
								return _this2.construct_appointment();
							} },
						"Create"
					)
				)
			);
		}
	}, {
		key: "set_date",
		value: function set_date(val, type) {
			if (type === "start") {
				this.setState({ start_date: val._d });
			}

			if (type === "end") {
				this.setState({ end_date: val._d });
			}
		}
	}, {
		key: "construct_appointment",
		value: function construct_appointment() {
			var description = document.querySelector("textarea[name=book_appointment_description]"),
			    patient = document.querySelector("select[name=book_patient_select]"),
			    start_date = new Date(this.state.start_date),
			    end_date = new Date(this.state.end_date);

			if (!patient.value.match(/^\s*$/)) {
				var appointment = {
					date: (0, _moment2.default)().format("MM-DD-YYYY, h:mm"),
					title: patient.value,
					desc: description.value,
					start: start_date,
					end: end_date
				};

				this.props.history.push("/patients");
				this.props.add_appointment(appointment, patient.value, this.props.dispatch);
				this.props.close_book_panel();

				description.value = "", patient.value = "";

				this.setState({
					start_date: null,
					end_date: null
				});
			}
		}
	}]);

	return BookPanel;
}(_react.Component);

exports.default = BookPanel;

});

require.register("components/util/DropDown.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDown = function (_Component) {
	_inherits(DropDown, _Component);

	function DropDown() {
		_classCallCheck(this, DropDown);

		return _possibleConstructorReturn(this, (DropDown.__proto__ || Object.getPrototypeOf(DropDown)).apply(this, arguments));
	}

	_createClass(DropDown, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{
					id: "dropdown_container",
					onClick: function onClick(e) {
						return _this2.toggle_select_dropdown_option(e);
					}
				},
				_react2.default.createElement(
					"div",
					{ id: "dropdown_selected_option" },
					this.props.selected_option,
					_react2.default.createElement("i", { className: "fa fa-chevron-down", "aria-hidden": "true" })
				),
				_react2.default.createElement(
					"div",
					{ id: "dropdown_options_container" },
					this.props.items.map(function (item, x) {
						return _react2.default.createElement(
							"div",
							{
								key: x,
								id: "dropdown_option",
								onClick: function onClick(e) {
									return _this2.props.set_selected_option(e.target.textContent);
								}
							},
							item
						);
					}),
					this.props.category == "dose" ? _react2.default.createElement(
						"div",
						{ id: "medicine_dosage_container" },
						_react2.default.createElement("input", {
							type: "number",
							onKeyPress: function onKeyPress(e) {
								return _this2.create_new_dosage_dropdown_option(e);
							}
						}),
						"+",
						_react2.default.createElement("input", {
							type: "number",
							onKeyPress: function onKeyPress(e) {
								return _this2.create_new_dosage_dropdown_option(e);
							}
						}),
						"+",
						_react2.default.createElement("input", {
							type: "number",
							onKeyPress: function onKeyPress(e) {
								return _this2.create_new_dosage_dropdown_option(e);
							}
						}),
						"+",
						_react2.default.createElement("input", {
							type: "number",
							onKeyPress: function onKeyPress(e) {
								return _this2.create_new_dosage_dropdown_option(e);
							}
						})
					) : _react2.default.createElement("strong", {
						contentEditable: true,
						"data-text": "New " + this.props.category,
						onKeyPress: function onKeyPress(e) {
							return _this2.create_new_dropdown_option(e);
						}
					})
				)
			);
		}
	}, {
		key: "create_new_dosage_dropdown_option",
		value: function create_new_dosage_dropdown_option(e) {
			if (e.key === "Enter") {
				e.preventDefault();

				var inputs = document.querySelectorAll("#medicine_dosage_container input");
				var inputs_validation_counter = 0;
				var dosage_value = "";

				for (var i = 0; i < inputs.length; i++) {
					var value = inputs[i].value;
					var separator = "+";

					if (i == inputs.length - 1) separator = "";
					if (value) {
						inputs_validation_counter++;
						dosage_value += value + separator;
					}
				}

				if (inputs_validation_counter == 4) {
					//add dosage if all inputs are filled in

					this.props.add_dropdown_item(dosage_value, this.props.category_list);
					Array.from(inputs).map(function (el) {
						return el.value = "";
					});
				}
			}
		}
	}, {
		key: "create_new_dropdown_option",
		value: function create_new_dropdown_option(e) {
			if (e.key === "Enter") {
				e.preventDefault();
				this.props.add_dropdown_item(e.target.textContent, this.props.category_list);
				e.target.textContent = "";
			}
		}
	}, {
		key: "toggle_select_dropdown_option",
		value: function toggle_select_dropdown_option(e) {
			if (e.target.id == "medicine_dosage_container") {
				return;
			}
			if (e.target.parentNode.id == "medicine_dosage_container") {
				return;
			}
			if (e.target.nodeName === "I") {
				var parent = e.target.parentNode;
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
	}]);

	return DropDown;
}(_react.Component);

exports.default = DropDown;

});

require.register("components/util/Searchable.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Searchable = function (_Component) {
	_inherits(Searchable, _Component);

	function Searchable(props) {
		_classCallCheck(this, Searchable);

		var _this = _possibleConstructorReturn(this, (Searchable.__proto__ || Object.getPrototypeOf(Searchable)).call(this, props));

		_this.state = {
			searched_options: []
		};
		return _this;
	}

	_createClass(Searchable, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return _react2.default.createElement(
				"div",
				{ id: "searchable_container" },
				_react2.default.createElement("input", {
					type: "text",
					placeholder: "search/create " + this.props.category + " (require dosage strength e.g. 500mg/ml)",
					id: "search_item_input",
					onChange: function onChange(e) {
						return _this2.search_item(e);
					},
					onKeyPress: function onKeyPress(e) {
						return _this2.add_item(e);
					}
				}),
				this.state.searched_options.length > 0 ? this.render_options() : ""
			);
		}
	}, {
		key: "add_item",
		value: function add_item(e) {
			var input_value = e.target.value;
			var searched_options = this.state.searched_options;

			if (e.key == "Enter" && !this.item_not_in_list(input_value)) {
				e.preventDefault();

				var category = this.props.category;
				if (category == "medicine") category += "_list";

				this.props.add_dropdown_item(input_value, category);
				e.target.value = "";
				return this.setState({ searched_options: [] });
			}
		}
	}, {
		key: "item_not_in_list",
		value: function item_not_in_list(option) {
			var options_list = this.props.options_list;

			var index = options_list.indexOf(option);

			if (index > -1) return true;else return false;
		}
	}, {
		key: "search_item",
		value: function search_item(e) {
			var value = e.target.value,
			    searched_options = [];
			if (value === "") {
				return this.setState({
					searched_options: []
				});
			}
			this.props.add_dropdown_item;
			if (value.length > 0) {
				for (var i = 0; i < this.props.options_list.length; i++) {
					var option = this.props.options_list[i],
					    option_name = option.toLowerCase();

					if (option_name.startsWith(value)) {
						searched_options.push(option);
					}
				}
			}

			return this.setState({ searched_options: searched_options });
		}
	}, {
		key: "set_option",
		value: function set_option(e) {
			this.props.set_selected_option(e.target.textContent);
			e.target.parentNode.previousSibling.value = e.target.textContent;

			return this.setState({ searched_options: [] });
		}
	}, {
		key: "render_options",
		value: function render_options() {
			var _this3 = this;

			return _react2.default.createElement(
				"div",
				{ id: "searchable_options_container" },
				this.state.searched_options.map(function (option, x) {
					return _react2.default.createElement(
						"div",
						{ id: "found_option", key: x, onClick: function onClick(e) {
								return _this3.set_option(e);
							} },
						option
					);
				})
			);
		}
	}]);

	return Searchable;
}(_react.Component);

exports.default = Searchable;

});

require.register("containers/Calendar.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactBigCalendar = require("react-big-calendar");

var _reactBigCalendar2 = _interopRequireDefault(_reactBigCalendar);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _BookPanel = require("../components/util/BookPanel");

var _BookPanel2 = _interopRequireDefault(_BookPanel);

var _reactRouterDom = require("react-router-dom");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _reactDnd = require("react-dnd");

var _dragAndDrop = require("react-big-calendar/lib/addons/dragAndDrop");

var _dragAndDrop2 = _interopRequireDefault(_dragAndDrop);

var _reactRedux = require("react-redux");

var _methods = require("../methods");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_reactBigCalendar2.default.momentLocalizer(_moment2.default);
var DragAndDropCalendar = (0, _dragAndDrop2.default)(_reactBigCalendar2.default);

var Appointments = function (_Component) {
	_inherits(Appointments, _Component);

	function Appointments(props) {
		_classCallCheck(this, Appointments);

		var _this = _possibleConstructorReturn(this, (Appointments.__proto__ || Object.getPrototypeOf(Appointments)).call(this, props));

		_this.state = {
			show_book_panel: false,
			selected_slot: ""
		};
		return _this;
	}

	_createClass(Appointments, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    patients = _props.patients,
			    events = _props.events,
			    dispatch = _props.dispatch;

			return _react2.default.createElement(
				"div",
				{ className: "route_view", id: "appointments_route" },
				this.state.show_book_panel ? _react2.default.createElement(_BookPanel2.default, {
					history: this.props.history,
					selected_slot: this.state.selected_slot,
					close_book_panel: this.close_book_panel.bind(this),
					patients: patients,
					add_appointment: _methods.add_appointment,
					dispatch: dispatch
				}) : "",
				_react2.default.createElement(DragAndDropCalendar, {
					onEventDrop: this.moveEvent.bind(this),
					selectable: true,
					events: events,
					step: 15,
					timeslots: 2,
					min: this.get_min_time(),
					defaultView: "week",
					onSelectEvent: function onSelectEvent(event) {
						return _this2.navigate_to_patient(event, dispatch);
					},
					onSelectSlot: function onSelectSlot(slot_info) {
						return _this2.book_slot(slot_info);
					},
					formats: {
						eventTimeRangeFormat: function eventTimeRangeFormat() {
							return "";
						}
					}
				})
			);
		}
	}, {
		key: "moveEvent",
		value: function moveEvent(_ref) {
			var event = _ref.event,
			    start = _ref.start,
			    end = _ref.end;

			(0, _methods.move_appointment)(event, start, end, this.props.dispatch);
		}
	}, {
		key: "navigate_to_patient",
		value: function navigate_to_patient(event, dispatch) {
			this.props.history.push("/patients");
			(0, _methods.navigate_to_patient_profile)(event.title, dispatch);
		}
	}, {
		key: "book_slot",
		value: function book_slot(slot_info) {
			this.setState({
				show_book_panel: true,
				selected_slot: slot_info
			});
			(0, _methods.darken)();
		}
	}, {
		key: "close_book_panel",
		value: function close_book_panel() {
			(0, _methods.darken)();
			this.setState({ show_book_panel: false });
		}
	}, {
		key: "get_min_time",
		value: function get_min_time() {
			var time = new Date();

			time.setHours(7);
			time.setMinutes(0);
			time.setSeconds(0);

			return time;
		}
	}]);

	return Appointments;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	return {
		patients: state.default.patients,
		events: state.default.events
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactRouterDom.withRouter)(Appointments));

});

require.register("containers/Patients.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _redux = require("redux");

var _PatientProfile = require("../components/patient/PatientProfile");

var _PatientProfile2 = _interopRequireDefault(_PatientProfile);

var _PatientsList = require("../components/patient/PatientsList");

var _PatientsList2 = _interopRequireDefault(_PatientsList);

var _AddPatientPanel = require("../components/patient/AddPatientPanel");

var _AddPatientPanel2 = _interopRequireDefault(_AddPatientPanel);

var _reactRedux = require("react-redux");

var _actions = require("../components/patient/actions");

var PatientsActionCreators = _interopRequireWildcard(_actions);

var _methods = require("../methods");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientsContainer = function (_Component) {
	_inherits(PatientsContainer, _Component);

	function PatientsContainer(props) {
		_classCallCheck(this, PatientsContainer);

		var _this = _possibleConstructorReturn(this, (PatientsContainer.__proto__ || Object.getPrototypeOf(PatientsContainer)).call(this, props));

		_this.state = {
			searched_patients: [],
			search_match: false,
			show_add_patient_panel: false
		};

		_this.boundActionCreators = (0, _redux.bindActionCreators)(PatientsActionCreators, _this.props.dispatch);
		return _this;
	}

	_createClass(PatientsContainer, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var searched_patients = this.state.searched_patients,
			    _props = this.props,
			    selected_patient = _props.selected_patient,
			    patients = _props.patients,
			    remove_selected_patient = _props.remove_selected_patient,
			    add_appointment = _props.add_appointment,
			    add_patient = _props.add_patient,
			    add_item = _props.add_item,
			    diagnosis_list = _props.diagnosis_list,
			    add_dropdown_item = _props.add_dropdown_item;


			return _react2.default.createElement(
				"div",
				{ className: "route_view" },
				this.state.show_add_patient_panel ? _react2.default.createElement(_AddPatientPanel2.default, {
					add_patient: this.boundActionCreators.add_patient,
					patients: patients,
					close_patient_panel: function close_patient_panel() {
						return _this2.toggle_patient_panel();
					}
				}) : "",
				this.render_view(this.props, this.state, this.boundActionCreators)
			);
		}
	}, {
		key: "render_view",
		value: function render_view(props, state, boundActionCreators) {
			var patients = props.patients,
			    selected_patient = props.selected_patient;
			var searched_patients = state.searched_patients;


			return selected_patient ? _react2.default.createElement(_PatientProfile2.default, {
				actions: boundActionCreators,
				clear_searched_patients: this.clear_searched_patients.bind(this),
				props: props,
				darken: _methods.darken
			}) : _react2.default.createElement(_PatientsList2.default, {
				patients: patients,
				searched_patients: searched_patients,
				render_patients: this.render_patients.bind(this),
				search_patient: this.search_patient.bind(this),
				toggle_patient_panel: this.toggle_patient_panel.bind(this)
			});
		}
	}, {
		key: "toggle_patient_panel",
		value: function toggle_patient_panel() {
			this.setState({
				show_add_patient_panel: !this.state.show_add_patient_panel
			});
			(0, _methods.darken)();
		}
	}, {
		key: "clear_searched_patients",
		value: function clear_searched_patients() {
			return this.setState({
				searched_patients: [],
				search_match: false
			});
		}
	}, {
		key: "search_patient",
		value: function search_patient(e) {
			var value = e.target.value,
			    searched_patients = [];

			if (value === "") {
				return this.setState({
					searched_patients: [],
					search_match: false
				});
			}

			if (value.length > 0) {
				for (var i = 0; i < this.props.patients.length; i++) {
					var patient = this.props.patients[i],
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
	}, {
		key: "render_patients",
		value: function render_patients(patients) {
			var _this3 = this;

			if (this.state.search_match === true) {
				return;
			}

			return _react2.default.createElement(
				"div",
				{ className: "patients_list" },
				(patients || []).map(function (patient, x) {
					return _react2.default.createElement(
						"div",
						{
							key: x,
							className: "patient",
							onClick: function onClick() {
								return _this3.boundActionCreators.show_patient_profile(patient);
							}
						},
						_react2.default.createElement(
							"span",
							null,
							patient.name
						),
						_react2.default.createElement(
							"span",
							null,
							patient.birth
						),
						_react2.default.createElement(
							"span",
							null,
							patient.age
						),
						_react2.default.createElement(
							"span",
							null,
							patient.gender
						),
						_react2.default.createElement(
							"span",
							null,
							patient.address
						),
						_react2.default.createElement(
							"span",
							null,
							patient.phone
						)
					);
				})
			);
		}
	}]);

	return PatientsContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
	var _state$default = state.default,
	    lab_list = _state$default.lab_list,
	    diagnosis_list = _state$default.diagnosis_list,
	    medicine_list = _state$default.medicine_list,
	    medicine_dose_list = _state$default.medicine_dose_list,
	    patients = _state$default.patients,
	    selected_patient = _state$default.selected_patient;

	return {
		lab_list: lab_list,
		diagnosis_list: diagnosis_list,
		medicine_list: medicine_list,
		medicine_dose_list: medicine_dose_list,
		patients: patients,
		selected_patient: selected_patient
	};
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(PatientsContainer);

});

require.register("initialize.js", function(exports, require, module) {
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _store = require("./store");

var _store2 = _interopRequireDefault(_store);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
	_reactDom2.default.render(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: _store2.default },
		_react2.default.createElement(_app2.default, null)
	), document.querySelector("#app"));
});

});

require.register("methods.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.navigate_to_patient_profile = exports.move_appointment = exports.add_appointment = exports.darken = exports.logout = exports.fetch_data = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_data = fetch_data;
exports.logout = logout;
exports.darken = darken;
exports.add_appointment = add_appointment;
exports.move_appointment = move_appointment;
exports.navigate_to_patient_profile = navigate_to_patient_profile;


function darken() {
	var darken_div = document.querySelector(".darken");
	darken_div.classList.toggle("darken_show");
}

function fetch_data(dispatch, mode) {
	return _axios2.default.get("/data", {
		params: {
			mode: mode
		}
	}).then(function (res) {
		dispatch({
			type: "INIT_STATE",
			payload: res.data
		});
	});
}

function logout() {
	_axios2.default.get("/logout").then(function (res) {
		window.location = "/";
	});
}

function navigate_to_patient_profile(patient_name, dispatch) {
	dispatch({
		type: "NAVIGATE_TO_PATIENT_PROFILE",
		payload: {
			patient_name: patient_name
		}
	});
}

function move_appointment(event, start, end, dispatch) {
	var moved_appointment = {
		title: event.title,
		start: start,
		end: end,
		desc: event.desc
	};

	dispatch({
		type: "MOVE_APPOINTMENT",
		payload: {
			moved_appointment: moved_appointment,
			event: event
		}
	});
}

function add_appointment(appointment, patient, dispatch) {
	dispatch({
		type: "ADD_APPOINTMENT",
		payload: {
			appointment: appointment,
			patient_name: patient
		}
	});
}

});

;require.register("reducers/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = require("./util.js");

var init_state = {};

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : init_state;
	var action = arguments[1];

	switch (action.type) {
		case "INIT_STATE":
			{
				var _action$payload = action.payload,
				    data = _action$payload.data,
				    lab_data = _action$payload.lab_data;

				(0, _util.set_demo)(data.username);
				return {
					...state,
					username: data.username,
					_id: data._id,
					email: data.email,
					password: data.password,
					lab_list: lab_data,
					patients: data.patients,
					selected_patient: null,
					diagnosis_list: data.diagnosis_list,
					medicine_list: data.medicine_list,
					medicine_dose_list: data.medicine_dose_list,
					events: (0, _util.update_calendar_events)(data.patients)
				};
			}
		case "ADD_DROPDOWN_ITEM":
			{
				var _action$payload2 = action.payload,
				    item = _action$payload2.item,
				    category = _action$payload2.category;

				return (0, _util.add_dropdown_item)(state, item, category);
			}

		case "ADD_PATIENT":
			return (0, _util.new_state)(state, action.payload, true);
		case "SELECTED_PATIENT":
			return (0, _util.new_state)(state, action.payload);
		case "STOP_MEDICINE":
			return (0, _util.update_patients)(state, action.payload.updated_patient, true);
		case "ADD_ITEM":
			return (0, _util.update_patients)(state, action.payload.updated_patient, true);
		case "ADD_APPOINTMENT":
			var _action$payload3 = action.payload,
			    patient_name = _action$payload3.patient_name,
			    appointment = _action$payload3.appointment;

			return (0, _util.add_appointment)(state, patient_name, appointment);
		case "MOVE_APPOINTMENT":
			var _action$payload4 = action.payload,
			    moved_appointment = _action$payload4.moved_appointment,
			    event = _action$payload4.event;

			return (0, _util.move_appointment)(state, moved_appointment, event);
		case "NAVIGATE_TO_PATIENT_PROFILE":
			{
				var _patient_name = action.payload.patient_name;

				var patient = (0, _util.find_patient)(state, _patient_name);
				return {
					...state,
					selected_patient: patient
				};
			}
		default:
			return state;
	}
};

});

require.register("reducers/util.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.set_demo = set_demo;
exports.new_state = new_state;
exports.update_calendar_events = update_calendar_events;
exports.update_patients = update_patients;
exports.update_patient = update_patient;
exports.add_appointment = add_appointment;
exports.move_appointment = move_appointment;
exports.find_patient = find_patient;
exports.add_dropdown_item = add_dropdown_item;
exports.send_post_req = send_post_req;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var demo = void 0;

function set_demo(username) {
	if (username == "demo") return demo = true;
	return demo = false;
}

function new_state(state, payload, flag) {
	//send data to server if flag is true
	if (flag) send_post_req({ ...payload, type: "patients" });

	return {
		...state,
		...payload
	};
}

function update_calendar_events(patients) {
	var appointments = [];

	patients.map(function (patient) {
		patient.appointments.map(function (apt) {
			appointments.push({
				title: apt.title,
				start: new Date(apt.start),
				end: new Date(apt.end)
			});
		});
	});

	return appointments;
}

function update_patients(state, updated_patient, flag) {
	//if flag is set to true, return state, else return updated patients only
	var patient_index = state.patients.map(function (x) {
		return x.id;
	}).indexOf(updated_patient.id);

	var updated_patients = state.patients.slice();
	update_patients[patient_index] = updated_patient;

	send_post_req({ patients: updated_patients, type: "patients" });

	if (flag) {
		return {
			...state,
			patients: updated_patients
		};
	} else {
		return updated_patients;
	}
}

function update_patient(state, patient_name, type, data) {
	var patient_index = state.patients.map(function (x) {
		return x.name;
	}).indexOf(patient_name);

	var cloned_patients_list = state.patients.slice();
	var patient = cloned_patients_list[patient_index];

	if (type == "appointment") {
		patient.appointments.push(data);
		return patient;
	}
}

function add_appointment(state, patient_name, appointment) {
	var updated_patient = update_patient(state, patient_name, "appointment", appointment);

	var updated_patients = update_patients(state, updated_patient, false);
	var updated_events = update_calendar_events(updated_patients);

	return {
		...state,
		patients: updated_patients,
		events: updated_events
	};
}

function move_appointment(state, appointment, event) {
	var patients = state.patients.slice(0);
	var patient_index = patients.map(function (patient) {
		return patient.name;
	}).indexOf(event.title);

	var patient = patients[patient_index];
	var apt_index = patient.appointments.map(function (apt) {
		return new Date(apt.start).getTime();
	}).indexOf(new Date(event.start).getTime());

	patient.appointments.splice(apt_index, 1, appointment);

	send_post_req({ patients: patients, type: "patients" });

	return {
		...state,
		patients: patients,
		events: update_calendar_events(patients)
	};
}

function find_patient(state, patient_name) {
	var patient_index = state.patients.map(function (x) {
		return x.name;
	}).indexOf(patient_name);

	var cloned_patients_list = state.patients.slice();
	var patient = cloned_patients_list[patient_index];

	return patient;
}

function add_dropdown_item(state, item, category) {
	var updated_category = state[category].slice(0);
	updated_category.push(item);

	var obj = {};
	obj[category] = updated_category;

	send_post_req({ ...obj, type: "item" });

	return {
		...state,
		...obj
	};
}

function send_post_req(data) {
	if (!demo) {
		_axios2.default.post("/insert", data).then(function (res) {
			console.log("data inserted");
		});
	}
}

});

;require.register("store.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({ default: _reducers2.default });

var initialState = {};
var enhancers = [];
var middleware = [];

if ('production' === "development") {
	var devToolsExtension = window.devToolsExtension;

	if (typeof devToolsExtension === "function") {
		enhancers.push(devToolsExtension());
	}
}

var composedEnhancers = _redux.compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, middleware)].concat(enhancers));

var store = (0, _redux.createStore)(rootReducer, initialState, composedEnhancers);

exports.default = store;

});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

