import * as types from '../constants/action-types';

export const selectedAddress = (state = '0x0', action) => {
	switch (action.type) {
		case types.SELECT_ADDRESS:
			return action.address;
		default:
			return state;
	}
};

export const balanceRequest = (state = { isFetching: false, didInvalidate: false, balance: 0 }, action) => {
	switch (action.type) {
		case types.REFRESH_BALANCE:
			return  Object.assign({}, state, {
				didInvalidate: true
			});
		case types.BALANCE_REQUESTED:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case types.BALANCE_REQUEST_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				balance: action.balance,
				lastUpdated: action.receviedAt
			});
		default:
			return state;
	}
};

export const checkBalance = (state = {}, action) => {
	switch (action.type) {
		case types.REFRESH_BALANCE:
		case types.BALANCE_REQUESTED:
		case types.BALANCE_REQUEST_SUCCESS:
			// return Object.assign({}, state, {
			// 	balanceInfo: balanceRequest(state[action.address], action)
			// });
			return Object.assign({}, state, balanceRequest(state[action.address], action));
		default:
			return state;
	}
};