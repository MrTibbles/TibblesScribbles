// import fetch from 'isomorphic-fetch';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	// LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS
} from '../constants/action-types';

export const requestLogin = (creds) => {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds
	};
};

export const receiveLogin = (creds) => {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		creds
	};
};

// export const loginFailure = (msg) => {
// 	return {
// 		type: LOGIN_FAILURE,
// 		isFetching: false,
// 		isAuthenticated: false,
// 		msg
// 	};
// };

export const requestLogOut = () => {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true,
		isAuthenticated: true
	};
};

export const receiveLogOut = () => {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false
	};
};

export const logOutUser = () => {
	return dispatch => {
		dispatch(requestLogOut);
		localStorage.removeItem('id_token');
		dispatch(receiveLogOut());
	};
};

export const loginUser = (creds) => {

	// let config = {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	},
	// 	body: `username=${creds.username}&password=${creds.password}`
	// }

	return dispatch => {
		dispatch(requestLogin(creds));
		dispatch(receiveLogin(creds));
		// return fetch('http://localhost:3001/sessions/create', config)
		// 	.then(response => 
		// 		response.json()
		// 		.then(user => ({ user, response }))
		// 	).then({ user, response }) => {

		// 			if (!response.ok) {
		// 				dispatch(loginFailure(user.message))
		// 				return Promise.reject(user);
		// 			} else {
		// 				localStorage.setItem('id_token', user.id_token);
		// 				dispatch(receiveLogin(user));
		// 			}
		// 		}
		// 	)
		// 	.catch(err => console.log('Login error: ', err));
	};
};