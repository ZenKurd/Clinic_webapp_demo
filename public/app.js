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
var global = typeof window === 'undefined' ? this : window;
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
require.register("components/App.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MainFunctions = require("./MainFunctions");

var _reactRouterDom = require("react-router-dom");

var _Home = require("./Main/Home");

var _Home2 = _interopRequireDefault(_Home);

var _Patients = require("./Main/Patients");

var _Patients2 = _interopRequireDefault(_Patients);

var _Appointments = require("./Main/Appointments");

var _Appointments2 = _interopRequireDefault(_Appointments);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _config = require("./Util/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = { username: null };

		_this.logout = _MainFunctions.logout.bind(_this);
		_this.send_post_req = _MainFunctions.send_post_req.bind(_this);
		_this.darken = _MainFunctions.darken.bind(_this);
		_this.remove_selected_patient = _MainFunctions.remove_selected_patient.bind(_this);
		_this.add_item = _MainFunctions.add_item.bind(_this);
		_this.add_patient = _MainFunctions.add_patient.bind(_this);
		_this.navigate = _MainFunctions.navigate.bind(_this);
		_this.move_appointment = _MainFunctions.move_appointment.bind(_this);
		_this.add_appointment = _MainFunctions.add_appointment.bind(_this);
		_this.set_appointments = _MainFunctions.set_appointments.bind(_this);
		_this.add_dropdown_item = _MainFunctions.add_dropdown_item.bind(_this);
		_this.stop_medicine = _MainFunctions.stop_medicine.bind(_this);
		_this.show_patient_profile = _MainFunctions.show_patient_profile.bind(_this);
		return _this;
	}

	_createClass(App, [{
		key: "init_app_state",
		value: function init_app_state(data) {
			var _this2 = this;

			this.setState({
				username: data[0].username,
				_id: data[0]._id,
				email: data[0].email,
				password: data[0].password,
				lab_list: data[1],
				patients: data[0].patients,
				selected_patient: [],
				events: [],
				diagnosis_list: data[0].diagnosis_list,
				medicine_list: data[0].medicine_list,
				medicine_dose_list: data[0].medicine_dose_list
			});
			setTimeout(function () {
				return _this2.set_appointments();
			}, 1000);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this3 = this;

			if (window.location.pathname === "/demo") {
				return _axios2.default.get("/demo_data").then(function (res) {
					_this3.init_app_state(res.data, "demo");
				}).catch(function (error) {
					console.log(error);
				});
			} else {
				return _axios2.default.request({
					url: "/data",
					withCredentials: true,
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"Access-Control-Allow-Credentials": "true"
					}
				}).then(function (res) {
					_this3.init_app_state(res.data, "data");
				}).catch(function (error) {
					console.log(error);
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			return _react2.default.createElement(
				"div",
				{ id: "content" },
				_react2.default.createElement("div", { className: "darken" }),
				_react2.default.createElement(
					_reactRouterDom.BrowserRouter,
					null,
					_react2.default.createElement(
						"div",
						{ id: "route_container" },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: "/", className: "route_tab" },
							_react2.default.createElement("i", { className: "fa fa-home", "aria-hidden": "true" })
						),
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: "/patients", className: "route_tab" },
							_react2.default.createElement("i", { className: "fa fa-user-md", "aria-hidden": "true" })
						),
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ to: "/appointments", className: "route_tab" },
							_react2.default.createElement("i", { className: "fa fa-calendar", "aria-hidden": "true" })
						),
						_react2.default.createElement(
							"button",
							{ onClick: function onClick() {
									return _this4.logout();
								}, id: "logout" },
							"Logout"
						),
						_react2.default.createElement(
							"div",
							{ id: "logged_in_info" },
							"user: ",
							this.state.username || ""
						),
						_react2.default.createElement(
							_reactRouterDom.Switch,
							null,
							_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _Home2.default }),
							_react2.default.createElement(_reactRouterDom.Route, {
								path: "/patients",
								render: function render(props) {
									return _react2.default.createElement(_Patients2.default, {
										lab_list: _this4.state.lab_list,
										stop_medicine: _this4.stop_medicine.bind(_this4),
										show_patient_profile: _this4.show_patient_profile.bind(_this4),
										remove_selected_patient: _this4.remove_selected_patient.bind(_this4),
										add_dropdown_item: _this4.add_dropdown_item.bind(_this4),
										diagnosis_list: _this4.state.diagnosis_list,
										medicine_list: _this4.state.medicine_list,
										medicine_dose_list: _this4.state.medicine_dose_list,
										patients: _this4.state.patients,
										add_patient: _this4.add_patient.bind(_this4),
										add_appointment: _this4.add_appointment.bind(_this4),
										darken: _this4.darken,
										add_item: _this4.add_item.bind(_this4),
										selected_patient: _this4.state.selected_patient
									});
								}
							}),
							_react2.default.createElement(_reactRouterDom.Route, {
								path: "/appointments",
								render: function render(props) {
									return _react2.default.createElement(_Appointments2.default, {
										move_appointment: _this4.move_appointment.bind(_this4),
										navigate: _this4.navigate.bind(_this4),
										patients: _this4.state.patients,
										add_appointment: _this4.add_appointment.bind(_this4),
										events: _this4.state.events,
										darken: _this4.darken.bind(_this4)
									});
								}
							}),
							" ",
							"/>"
						)
					)
				)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;
});

require.register("components/Main/Appointments.jsx", function(exports, require, module) {
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

var _BookPanel = require("../Util/BookPanel");

var _BookPanel2 = _interopRequireDefault(_BookPanel);

var _reactRouterDom = require("react-router-dom");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _reactDnd = require("react-dnd");

var _dragAndDrop = require("react-big-calendar/lib/addons/dragAndDrop");

var _dragAndDrop2 = _interopRequireDefault(_dragAndDrop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_reactBigCalendar2.default.setLocalizer(_reactBigCalendar2.default.momentLocalizer(_moment2.default));
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

			return _react2.default.createElement(
				"div",
				{ className: "route_section", id: "appointments_route" },
				this.state.show_book_panel ? _react2.default.createElement(_BookPanel2.default, {
					history: this.props.history,
					selected_slot: this.state.selected_slot,
					close_book_panel: this.close_book_panel.bind(this),
					patients: this.props.patients,
					add_appointment: this.props.add_appointment
				}) : "",
				_react2.default.createElement(DragAndDropCalendar, {
					onEventDrop: this.moveEvent.bind(this),
					selectable: true,
					events: this.props.events,
					step: 15,
					timeslots: 2,
					min: this.get_min_time(),
					defaultView: "week",
					onSelectEvent: function onSelectEvent(event) {
						return _this2.navigate_to_patient(event);
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

			this.props.move_appointment(event, start, end);
		}
	}, {
		key: "navigate_to_patient",
		value: function navigate_to_patient(event) {
			this.props.history.push("/patients");
			this.props.navigate(event.title);
		}
	}, {
		key: "book_slot",
		value: function book_slot(slot_info) {
			this.setState({
				show_book_panel: true,
				selected_slot: slot_info
			});
			this.props.darken();
		}
	}, {
		key: "close_book_panel",
		value: function close_book_panel() {
			this.props.darken();
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

exports.default = (0, _reactRouterDom.withRouter)(Appointments);
});

require.register("components/Main/Home.jsx", function(exports, require, module) {
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

var Home = function (_Component) {
    _inherits(Home, _Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "route_section", id: "home_route" },
                _react2.default.createElement(
                    "h2",
                    null,
                    "Demo Clinic Web System"
                )
            );
        }
    }]);

    return Home;
}(_react.Component);

exports.default = Home;
});

require.register("components/Main/Patients.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PatientProfile = require('../Patient/PatientProfile');

var _PatientProfile2 = _interopRequireDefault(_PatientProfile);

var _PatientsList = require('../Patient/PatientsList');

var _PatientsList2 = _interopRequireDefault(_PatientsList);

var _AddPatientPanel = require('../Patient/AddPatientPanel');

var _AddPatientPanel2 = _interopRequireDefault(_AddPatientPanel);

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
            no_match: false,
            show_add_patient_panel: false
        };
        return _this;
    }

    _createClass(PatientsContainer, [{
        key: 'render',
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
                darken = _props.darken,
                diagnosis_list = _props.diagnosis_list,
                add_dropdown_item = _props.add_dropdown_item;


            return _react2.default.createElement(
                'div',
                { className: 'route_section', id: 'patients_route' },
                _react2.default.createElement(
                    'button',
                    { id: 'add_patient_btn', onClick: function onClick() {
                            return _this2.show_add_patient_panel();
                        } },
                    _react2.default.createElement('i', { className: 'fa fa-user-plus', 'aria-hidden': 'true' })
                ),
                this.state.show_add_patient_panel ? _react2.default.createElement(_AddPatientPanel2.default, {
                    add_patient: add_patient,
                    close_patient_panel: function close_patient_panel() {
                        return _this2.close_patient_panel();
                    } }) : "",
                selected_patient.length > 0 ? _react2.default.createElement(_PatientProfile2.default, {
                    lab_list: this.props.lab_list,
                    stop_medicine: this.props.stop_medicine,
                    medicine_dose_list: this.props.medicine_dose_list,
                    add_dropdown_item: add_dropdown_item,
                    diagnosis_list: diagnosis_list,
                    medicine_list: this.props.medicine_list,
                    patient: selected_patient,
                    remove_selected_patient: remove_selected_patient,
                    add_appointment: add_appointment,
                    add_item: add_item,
                    darken: darken }) : _react2.default.createElement(_PatientsList2.default, {
                    patients: patients,
                    searched_patients: searched_patients,
                    render_patients: this.render_patients.bind(this),
                    search_patient: this.search_patient.bind(this)
                })
            );
        }
    }, {
        key: 'close_patient_panel',
        value: function close_patient_panel() {
            this.setState({ show_add_patient_panel: false });
            this.props.darken();
        }
    }, {
        key: 'show_add_patient_panel',
        value: function show_add_patient_panel() {
            this.setState({ show_add_patient_panel: true });
            this.props.darken();
        }
    }, {
        key: 'search_patient',
        value: function search_patient(e) {
            var value = e.target.value,
                searched_patients = [];

            if (value === "") {
                return this.setState({
                    searched_patients: [],
                    no_match: false
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
                    return this.setState({ no_match: true });
                }
            }

            return this.setState({
                no_match: false,
                searched_patients: searched_patients
            });
        }
    }, {
        key: 'render_patients',
        value: function render_patients(patients) {
            var _this3 = this;

            if (this.state.no_match === true) {
                return;
            }

            return _react2.default.createElement(
                'div',
                { className: 'patients_list' },
                patients.map(function (patient, x) {
                    return _react2.default.createElement(
                        'div',
                        { key: x, className: 'patient', onClick: function onClick() {
                                return _this3.props.show_patient_profile(patient);
                            } },
                        _react2.default.createElement(
                            'span',
                            null,
                            patient.name
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            patient.birth
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            patient.age
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            patient.gender
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            patient.address
                        ),
                        _react2.default.createElement(
                            'span',
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

exports.default = PatientsContainer;
});

;require.register("components/MainFunctions.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.logout = exports.send_post_req = exports.show_patient_profile = exports.stop_medicine = exports.add_dropdown_item = exports.set_appointments = exports.add_appointment = exports.move_appointment = exports.navigate = exports.add_item = exports.add_patient = exports.darken = exports.remove_selected_patient = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('./Util/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.remove_selected_patient = remove_selected_patient;
exports.darken = darken;
exports.add_patient = add_patient;
exports.add_item = add_item;
exports.navigate = navigate;
exports.move_appointment = move_appointment;
exports.add_appointment = add_appointment;
exports.set_appointments = set_appointments;
exports.add_dropdown_item = add_dropdown_item;
exports.stop_medicine = stop_medicine;
exports.show_patient_profile = show_patient_profile;
exports.send_post_req = send_post_req;
exports.logout = logout;


function send_post_req() {
    if (this.state.username) {
        _axios2.default.post('/insert', {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://ec2-34-212-25-151.us-west-2.compute.amazonaws.com:3000",
                "Access-Control-Allow-Credentials": "true"
            }
        }, { data: this.state }).then(function (res) {
            console.log("data inserted");
        }).catch(function (error) {
            console.log(error);
        });
    }
}

function logout() {
    if (this.state.username) {
        _axios2.default.get('/logout', {
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://ec2-34-212-25-151.us-west-2.compute.amazonaws.com:3000",
                "Access-Control-Allow-Credentials": "true"
            }
        }).then(function (res) {
            window.location = "/";
        }).catch(function (error) {
            console.log(error);
        });
    }
}

function remove_selected_patient() {
    this.setState({ selected_patient: [] });
}

function darken() {
    var darken_div = document.querySelector(".darken");
    darken_div.classList.toggle("darken_show");
}

function add_patient(patient) {
    var _this = this;

    if (patient.name && patient.date && patient.gender && patient.address) {

        var updated_patients = this.state.patients.slice(),
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
            "medicine": [],
            "diagnosis": []
        };

        updated_patients.unshift(new_patient);

        this.setState({ patients: updated_patients });
        setTimeout(function () {
            return _this.send_post_req();
        }, 2000);
    }
}

function add_item(item, patient, property) {
    var _this2 = this;

    var patients = this.state.patients.slice();

    for (var i = 0; i < patients.length; i++) {
        if (patients[i].name === patient.name) {
            patients[i][property].unshift(item);
        }
    }

    this.setState({ patients: patients });

    setTimeout(function () {
        return _this2.send_post_req();
    }, 2000);
}

function navigate(patient) {
    var selected_patient = void 0,
        patients = this.state.patients;

    for (var i = 0; i < patients.length; i++) {
        if (patients[i].name === patient) {
            selected_patient = patients[i];
        }
    }

    this.setState({ selected_patient: [selected_patient] });
}

function move_appointment(event, start, end) {
    var _this3 = this;

    var patients = this.state.patients.slice(),
        appointments = [],
        patient_index = void 0,
        appointment_index = void 0,
        appointment = {
        "title": event.title,
        "start": start,
        "end": end,
        "desc": event.desc
    };

    for (var i = 0; i < patients.length; i++) {
        if (patients[i].name === event.title) {

            for (var j = 0; j < patients[i].appointments.length; j++) {
                if (patients[i].appointments[j].start === event.start) {

                    patient_index = i;
                    appointment_index = j;
                    patients[i].appointments.push(appointment);
                    break;
                }
            }
        }
    }

    if (typeof patient_index === "number") {
        patients[patient_index].appointments.splice(appointment_index, 1);
    }

    patients.map(function (patient) {
        patient.appointments.map(function (apt) {
            appointments.push(apt);
        });
    });

    this.setState({
        patients: patients,
        events: appointments
    });

    setTimeout(function () {
        return _this3.send_post_req();
    }, 2000);
}

function add_appointment(appointment, patient) {
    var _this4 = this;

    var patients = this.state.patients.slice(),
        selected_patient = void 0,
        appointments = [];

    for (var i = 0; i < patients.length; i++) {
        if (patients[i].name === patient) {
            selected_patient = patients[i];
            patients[i].appointments.unshift(appointment);
        }
    }

    this.state.patients.map(function (patient) {
        patient.appointments.map(function (apt) {
            appointments.push(apt);
        });
    });

    this.setState({
        patients: patients,
        events: appointments,
        selected_patient: [selected_patient]
    });

    setTimeout(function () {
        return _this4.send_post_req();
    }, 2000);
}

function set_appointments() {
    var _this5 = this;

    var appointments = [];

    this.state.patients.map(function (patient) {
        patient.appointments.map(function (apt) {
            appointments.push({
                title: apt.title,
                start: new Date(apt.start),
                end: new Date(apt.end)
            });
        });
    });

    this.setState({ events: appointments });

    setTimeout(function () {
        return _this5.send_post_req();
    }, 1000);
}

function add_dropdown_item(item, category) {
    var _this6 = this;

    var new_items = this.state[category].slice();
    new_items.push(item);

    if (category === "diagnosis_list") {
        this.setState({ diagnosis_list: new_items });
    }
    if (category === "medicine_list") {
        this.setState({ medicine_list: new_items });
    }

    if (category === "medicine_dose_list") {
        this.setState({ medicine_dose_list: new_items });
    }

    setTimeout(function () {
        return _this6.send_post_req();
    }, 2000);
}

function stop_medicine(patient, medicine) {
    var _this7 = this;

    var patients = this.state.patients.slice();

    for (var i = 0; i < patients.length; i++) {
        if (patients[i].name === patient.name) {

            for (var j = 0; j < patients[i].medicine.length; j++) {
                if (patients[i].medicine[j] === medicine) {
                    patients[i].medicine[j]["stopped"] = "stopped";
                    break;
                }
            }
        }
    }

    this.setState({ patients: patients });

    setTimeout(function () {
        return _this7.send_post_req();
    }, 2000);
}

function show_patient_profile(patient) {
    this.setState({ selected_patient: [patient] });
}

function remove_selected_patient() {
    this.setState({ selected_patient: [] });
}
});

;require.register("components/Patient/AddPatientPanel.jsx", function(exports, require, module) {
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

            return _react2.default.createElement(
                "div",
                { id: "add_patient_container" },
                _react2.default.createElement(
                    "button",
                    { id: "close_patient_panel_btn", onClick: this.props.close_patient_panel },
                    _react2.default.createElement("i", { className: "fa fa-window-close-o", "aria-hidden": "true" }),
                    "  "
                ),
                _react2.default.createElement(
                    "div",
                    { id: "add_patient_fields" },
                    _react2.default.createElement("input", { type: "text", placeholder: "patient_name", name: "patient_name" }),
                    _react2.default.createElement("input", { type: "date", placeholder: "patient_birth_date", defaultValue: "1990-01-01", name: "patient_birth_date" }),
                    _react2.default.createElement(
                        "select",
                        { onChange: function onChange(e) {
                                return _this2.setState({
                                    gender: e.target.value.toLowerCase()
                                });
                            },
                            name: "patient_gender" },
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
                        _react2.default.createElement("input", { type: "checkbox", name: "patient_gravida", id: "patient_gravida" })
                    ) : "",
                    _react2.default.createElement("input", { type: "text", placeholder: "address", name: "patient_address" }),
                    _react2.default.createElement("input", { type: "number", placeholder: "phone", name: "patient_phone" }),
                    _react2.default.createElement(
                        "button",
                        { id: "submit_new_patient", onClick: function onClick() {
                                return _this2.add_patient();
                            } },
                        "add"
                    )
                )
            );
        }
    }, {
        key: "add_patient",
        value: function add_patient() {
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

            this.props.add_patient(patient_details);
            this.props.close_patient_panel();
        }
    }]);

    return AddPatientPanel;
}(_react.Component);

exports.default = AddPatientPanel;
});

require.register("components/Patient/PatientProfile.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Vitals = require('./Profile/Vitals');

var _Vitals2 = _interopRequireDefault(_Vitals);

var _Appointments = require('./Profile/Appointments');

var _Appointments2 = _interopRequireDefault(_Appointments);

var _Notes = require('./Profile/Notes');

var _Notes2 = _interopRequireDefault(_Notes);

var _Info = require('./Profile/Info');

var _Info2 = _interopRequireDefault(_Info);

var _Lab = require('./Profile/Lab');

var _Lab2 = _interopRequireDefault(_Lab);

var _Medicine = require('./Profile/Medicine');

var _Medicine2 = _interopRequireDefault(_Medicine);

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
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                selected_diagnosis_option: ""
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { id: 'patients_profile_route', className: 'route_section' },
                _react2.default.createElement(
                    'div',
                    { id: 'patient_tabs_container' },
                    _react2.default.createElement(
                        'div',
                        { id: 'selected_patient_container' },
                        _react2.default.createElement(
                            'strong',
                            null,
                            'ID:',
                            this.props.patient[0].id,
                            '\u2003\u2003',
                            this.props.patient[0].name,
                            '\u2003\u2003',
                            this.props.patient[0].age,
                            ' y.o'
                        )
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'patient_tab', onClick: function onClick(e) {
                                return _this2.set_active_tab("info", e.target);
                            } },
                        'Info'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'patient_tab', onClick: function onClick(e) {
                                return _this2.set_active_tab("notes", e.target);
                            } },
                        'Notes'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'patient_tab', onClick: function onClick(e) {
                                return _this2.set_active_tab("vitals", e.target);
                            } },
                        'Vitals'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'patient_tab', onClick: function onClick(e) {
                                return _this2.set_active_tab("lab", e.target);
                            } },
                        'Lab'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'patient_tab', onClick: function onClick(e) {
                                return _this2.set_active_tab("medicine", e.target);
                            } },
                        'Medicine'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'patient_tab', onClick: function onClick(e) {
                                return _this2.set_active_tab("appointments", e.target);
                            } },
                        'Appointments'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'patient_tab', id: 'close_patient_tab', onClick: function onClick(e) {
                                return _this2.remove_selected_patient();
                            } },
                        _react2.default.createElement('i', { className: 'fa fa-window-close-o', 'aria-hidden': 'true' })
                    )
                ),
                this.show_route(this.props)
            );
        }
    }, {
        key: 'remove_selected_patient',
        value: function remove_selected_patient() {
            this.props.remove_selected_patient();
        }
    }, {
        key: 'set_selected_diagnosis_option',
        value: function set_selected_diagnosis_option(option) {
            this.setState({ selected_diagnosis_option: option });
        }
    }, {
        key: 'show_route',
        value: function show_route(props) {
            if (this.state.active_tab === "notes") {
                return _react2.default.createElement(_Notes2.default, {
                    patient: props.patient[0],
                    add_note: props.add_item,
                    darken: props.darken });
            }

            if (this.state.active_tab === "vitals") {
                return _react2.default.createElement(_Vitals2.default, {
                    patient: props.patient[0],
                    add_vitals: props.add_item });
            }

            if (this.state.active_tab === "lab") {
                return _react2.default.createElement(_Lab2.default, {
                    add_lab_item: this.props.add_item,
                    lab_list: this.props.lab_list,
                    darken: props.darken,
                    patient: props.patient[0] });
            }

            if (this.state.active_tab === "info") {
                return _react2.default.createElement(_Info2.default, {
                    patient: props.patient[0],
                    create_diagnosis: this.create_diagnosis.bind(this),
                    selected_option: this.state.selected_diagnosis_option,
                    set_selected_option: this.set_selected_diagnosis_option.bind(this),
                    add_dropdown_item: this.props.add_dropdown_item,
                    diagnosis_list: props.diagnosis_list });
            }

            if (this.state.active_tab === "appointments") {
                return _react2.default.createElement(_Appointments2.default, {
                    patient: props.patient[0],
                    add_appointment: props.add_appointment });
            }

            if (this.state.active_tab === "medicine") {
                return _react2.default.createElement(_Medicine2.default, {
                    stop_medicine: this.props.stop_medicine,
                    create_diagnosis: this.create_diagnosis.bind(this),
                    selected_option: this.state.selected_diagnosis_option,
                    set_selected_option: this.set_selected_diagnosis_option.bind(this),
                    medicine_dose_list: this.props.medicine_dose_list,
                    add_dropdown_item: this.props.add_dropdown_item,
                    medicine_list: this.props.medicine_list,
                    diagnosis_list: props.diagnosis_list,
                    patient: props.patient[0],
                    add_medicine: props.add_item });
            }
        }
    }, {
        key: 'set_active_tab',
        value: function set_active_tab(tab, el) {
            var tabs = document.querySelectorAll(".patient_tab");

            Array.prototype.map.call(tabs, function (tab) {
                tab.className = "patient_tab";
            });

            el.className = "patient_tab active_patient_tab";

            this.setState({ active_tab: tab });
        }
    }, {
        key: 'create_diagnosis',
        value: function create_diagnosis() {
            var treatment = document.querySelector("#create_diagnosis_treatment");

            if (treatment && this.state.selected_diagnosis_option) {
                var diagnosis_bj = {
                    "date": (0, _moment2.default)().format("MMM Do YYYY"),
                    "diagnosis": this.state.selected_diagnosis_option,
                    "treatment": treatment.value
                };

                treatment.value = "";
                this.setState({ selected_diagnosis_option: "" });
                this.props.add_item(diagnosis_bj, this.props.patient[0], "diagnosis");
            }
        }
    }]);

    return PatientsList;
}(_react.Component);

exports.default = PatientsList;
});

;require.register("components/Patient/PatientsList.jsx", function(exports, require, module) {
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
                search_patient = _props.search_patient;

            return _react2.default.createElement(
                "div",
                { id: "patients_container" },
                _react2.default.createElement("input", { type: "text",
                    placeholder: "search patient...",
                    id: "search_patient_input",
                    onChange: function onChange(e) {
                        return search_patient(e);
                    } }),
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

require.register("components/Patient/Profile/AddLabDetailsPanel.jsx", function(exports, require, module) {
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

require.register("components/Patient/Profile/AddLabModule.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Searchable = require('../../Util/Searchable');

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
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'lab_dropdown_container' },
                    _react2.default.createElement(_Searchable2.default, {
                        options_list: this.props.lab_list,
                        set_selected_option: this.props.set_selected_option,
                        category: 'lab' })
                ),
                _react2.default.createElement('input', { type: 'text', name: 'lab_result_input', placeholder: 'result' })
            );
        }
    }]);

    return AddLabModule;
}(_react.Component);

exports.default = AddLabModule;
});

require.register("components/Patient/Profile/AddNote.jsx", function(exports, require, module) {
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

require.register("components/Patient/Profile/Appointments.jsx", function(exports, require, module) {
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

require.register("components/Patient/Profile/Diagnosis.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DropDown = require('../../Util/DropDown');

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
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { id: 'diagnosis_container' },
                _react2.default.createElement(
                    'button',
                    { id: 'btn_add_diagnosis',
                        onClick: function onClick(e) {
                            return _this2.props.create_diagnosis(e);
                        } },
                    'Create Diagnosis'
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'dropdown_diagnosis_container' },
                    _react2.default.createElement(_DropDown2.default, {
                        selected_option: this.props.selected_option,
                        set_selected_option: this.props.set_selected_option,
                        category_list: this.props.category_list,
                        add_dropdown_item: this.props.add_dropdown_item,
                        items: this.props.items,
                        category: this.props.category
                    })
                ),
                _react2.default.createElement('textarea', { id: 'create_diagnosis_treatment', placeholder: 'treatment' }),
                this.render_diagnosis()
            );
        }
    }, {
        key: 'render_diagnosis',
        value: function render_diagnosis() {
            return _react2.default.createElement(
                'div',
                { id: 'diagnosis_list_container' },
                this.props.patient.diagnosis.map(function (diagnosis, x) {
                    return _react2.default.createElement(
                        'div',
                        { key: x, id: 'diagnosis' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            diagnosis.date.match(/\d+$/)[0]
                        ),
                        _react2.default.createElement(
                            'h4',
                            null,
                            diagnosis.diagnosis
                        ),
                        _react2.default.createElement(
                            'h4',
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

require.register("components/Patient/Profile/Info.jsx", function(exports, require, module) {
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

require.register("components/Patient/Profile/Lab.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddLabDetailsPanel = require('./AddLabDetailsPanel');

var _AddLabDetailsPanel2 = _interopRequireDefault(_AddLabDetailsPanel);

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
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.construct_lab_list();
            this.construct_lab_details();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.construct_lab_list();
            this.construct_lab_details();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'patient_profile_route' },
                _react2.default.createElement(
                    'div',
                    { id: 'lab_container' },
                    _react2.default.createElement(
                        'div',
                        { id: 'lab_analysis_container' },
                        _react2.default.createElement(
                            'div',
                            { id: 'lab_analysis_list_container' },
                            _react2.default.createElement(
                                'strong',
                                null,
                                'Lab analysis list'
                            ),
                            this.render_lab_analysis_list()
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'lab_analysis_unit_container' },
                            _react2.default.createElement(
                                'strong',
                                null,
                                'Unit'
                            ),
                            this.render_lab_unit_list()
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'patient_lab_details_container' },
                        this.render_columns()
                    ),
                    _react2.default.createElement(
                        'button',
                        { id: 'add_lab_details_btn', onClick: function onClick() {
                                return _this2.toggle_add_lab_panel();
                            } },
                        _react2.default.createElement('i', { className: 'fa fa-plus-square', 'aria-hidden': 'true' })
                    ),
                    this.state.add_lab_details_panel ? _react2.default.createElement(_AddLabDetailsPanel2.default, {
                        construct_lab: this.construct_lab.bind(this),
                        set_selected_option: this.set_selected_option.bind(this),
                        lab_list: this.props.lab_list,
                        toggle_add_lab_panel: this.toggle_add_lab_panel.bind(this) }) : ""
                )
            );
        }
    }, {
        key: 'construct_lab',
        value: function construct_lab(lab_obj) {
            this.setState({ selected_options: [] });
            this.props.add_lab_item(lab_obj, this.props.patient, "lab");

            return this.toggle_add_lab_panel();
        }
    }, {
        key: 'set_selected_option',
        value: function set_selected_option(option) {
            var new_selected_options = this.state.selected_options;
            new_selected_options.push(option);

            this.setState({ selected_options: new_selected_options });
        }
    }, {
        key: 'toggle_add_lab_panel',
        value: function toggle_add_lab_panel() {
            this.state.add_lab_details_panel ? this.setState({ add_lab_details_panel: false }) : this.setState({ add_lab_details_panel: true });

            this.props.darken();
        }
    }, {
        key: 'render_lab_unit_list',
        value: function render_lab_unit_list() {
            _react2.default.createElement(
                'div',
                { id: 'lab_analysis_unit_container' },
                ' '
            );
        }
    }, {
        key: 'render_lab_analysis_list',
        value: function render_lab_analysis_list() {
            return _react2.default.createElement(
                'div',
                { id: 'lab_analysis_div_container' },
                this.state.lab_analysis_list.map(function (item, x) {
                    return _react2.default.createElement(
                        'div',
                        { id: 'lab_analysis_div', key: x },
                        item
                    );
                })
            );
        }
    }, {
        key: 'render_columns',
        value: function render_columns() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { id: 'patient_lab_columns_container' },
                this.state.lab_details.map(function (lab, x) {
                    return _react2.default.createElement(
                        'div',
                        { key: x, id: 'patient_lab_column' },
                        _react2.default.createElement(
                            'strong',
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
        key: 'render_lab_analysis_div',
        value: function render_lab_analysis_div(lab, lab_analysis_item, key) {
            var filtered_tests = lab.tests.filter(function (test) {
                return test.name === lab_analysis_item;
            });

            return filtered_tests.length > 0 ? _react2.default.createElement(
                'div',
                { key: key, id: 'lab_test_exists' },
                filtered_tests[0]["result"]
            ) : _react2.default.createElement('div', { key: key, id: 'lab_test_not_exists' });
        }
    }, {
        key: 'construct_lab_list',
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
        key: 'construct_lab_details',
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

require.register("components/Patient/Profile/Medicine.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _DropDown = require("../../Util/DropDown");

var _DropDown2 = _interopRequireDefault(_DropDown);

var _Searchable = require("../../Util/Searchable");

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
					return (0, _moment2.default)(medicine.end) > (0, _moment2.default)() && !medicine.stopped ? _react2.default.createElement(
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
					return (0, _moment2.default)(medicine.end) < (0, _moment2.default)() || medicine.stopped ? _react2.default.createElement(
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
							medicine.stopped
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
				var medicine = {
					start: (0, _moment2.default)(start_date).format("YYYY-MM-DD"),
					end: (0, _moment2.default)(end_date).format("YYYY-MM-DD"),
					name: selected_medicine_option,
					dose: selected_medicine_dose_option,
					strength: selected_medicine_option.match(/\-\s(\w+[\.\d+\w+\s]*)$/)[1]
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

require.register("components/Patient/Profile/Notes.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddNote = require('./AddNote');

var _AddNote2 = _interopRequireDefault(_AddNote);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactHtmlParser = require('react-html-parser');

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

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
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'patient_profile_route' },
                this.state.show_create_notes_panel ? _react2.default.createElement(_AddNote2.default, {
                    close_create_notes_panel: this.close_create_notes_panel.bind(this),
                    add_note: this.props.add_note,
                    patient: this.props.patient
                }) : "",
                _react2.default.createElement(
                    'div',
                    { id: 'create_note_btn_container' },
                    _react2.default.createElement(
                        'button',
                        { id: 'create_note_btn',
                            onClick: function onClick() {
                                return _this2.show_create_notes_panel();
                            } },
                        _react2.default.createElement('i', { className: 'fa fa-plus' })
                    ),
                    _react2.default.createElement(
                        'button',
                        { id: 'expand_notes_btn', onClick: function onClick() {
                                return _this2.expand_recent_notes();
                            } },
                        'Expand All'
                    )
                ),
                this.show_notes(this.props)
            );
        }
    }, {
        key: 'show_create_notes_panel',
        value: function show_create_notes_panel() {
            this.setState({ show_create_notes_panel: true });
            this.props.darken();
        }
    }, {
        key: 'close_create_notes_panel',
        value: function close_create_notes_panel() {
            this.setState({ show_create_notes_panel: false });
            this.props.darken();
        }
    }, {
        key: 'show_notes',
        value: function show_notes() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { id: 'notes_container' },
                this.props.patient.notes.map(function (note, x) {
                    return _react2.default.createElement(
                        'div',
                        { key: x, className: 'note', onClick: function onClick(e) {
                                return _this3.expand_note(e.target);
                            } },
                        _react2.default.createElement(
                            'span',
                            { id: 'note_date' },
                            note.date
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            note.title
                        ),
                        _react2.default.createElement(
                            'div',
                            { id: 'note_content' },
                            (0, _reactHtmlParser2.default)(note.content)
                        )
                    );
                })
            );
        }
    }, {
        key: 'parse_note',
        value: function parse_note(content) {
            return _react2.default.createElement('div', null);
        }
    }, {
        key: 'expand_note',
        value: function expand_note(e) {
            if (e.className !== "note") {
                var parent = e.parentNode;
                return parent.lastChild.classList.toggle("show");
            }
            e.childNodes[2].classList.toggle("show");
        }
    }, {
        key: 'expand_recent_notes',
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

require.register("components/Patient/Profile/Vitals.jsx", function(exports, require, module) {
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

require.register("components/Util/BookPanel.jsx", function(exports, require, module) {
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
			start_date: null,
			end_date: null
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
			    start_date = this.props.selected_slot.start,
			    end_date = this.props.selected_slot.end;

			if (this.state.start_date && this.state.end_date) {
				start_date = new Date(this.state.start_date);
				end_date = new Date(this.state.end_date);
			}

			if (!patient.value.match(/^\s*$/)) {
				var appointment = {
					date: (0, _moment2.default)().format("MM-DD-YYYY, h:mm"),
					title: patient.value,
					desc: description.value,
					start: start_date,
					end: end_date
				};

				this.props.history.push("/patients");
				this.props.add_appointment(appointment, patient.value, "appointment");
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

require.register("components/Util/DropDown.jsx", function(exports, require, module) {
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
                { id: "dropdown_container",
                    onClick: function onClick(e) {
                        return _this2.toggle_select_dropdown_option(e);
                    } },
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
                            { key: x, id: "dropdown_option", onClick: function onClick(e) {
                                    return _this2.props.set_selected_option(e.target.textContent);
                                } },
                            item
                        );
                    }),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement("strong", { contentEditable: true,
                            "data-text": "New " + this.props.category,
                            onKeyPress: function onKeyPress(e) {
                                return _this2.create_new_dropdown_option(e);
                            } })
                    )
                )
            );
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

require.register("components/Util/Searchable.jsx", function(exports, require, module) {
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
                _react2.default.createElement("input", { type: "text",
                    placeholder: "search " + this.props.category,
                    id: "search_item_input",
                    onChange: function onChange(e) {
                        return _this2.search_item(e, _this2.props.options_list);
                    } }),
                this.state.searched_options.length > 0 ? this.render_options() : ""
            );
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

require.register("components/Util/config.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ip_address = window.ip_address ? window.ip_address : "localhost";
exports.default = ip_address;
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require("./components/App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
	_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.querySelector("#app"));
});
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map