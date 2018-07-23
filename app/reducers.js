const init_state = {
	hi: null
};

export default (state = init_state, action) => {
	switch (action.type) {
		case "SENT_DOCUMENTS": {
			return Object.assign({}, state, {});
		}

		default:
			return state;
	}
};
