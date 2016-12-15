import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	// LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE
} from '../constants/action-types';

const auth = (state = { isFetching: false, isAuthenticated: localStorage.getItem('id_token') ? true : false}, action) => {

	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isAuthenticated: false,
				user: action.creds
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: true,
				user: action.creds
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false
			});
		case LOGOUT_SUCCESS:
		case LOGOUT_FAILURE:
			return Object.assign({}, state, {
				isFetching: false,
				isAuthenticated: false
			});
		default:
			return state;
	}
	
};

export default auth;