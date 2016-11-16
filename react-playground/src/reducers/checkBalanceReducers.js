import * as types from '../constants/constants';

export const balanceRequest = (state = { isFetching: false, didInvalidate: false, balance: 0 }, action) => {
	switch (action.type) {
		case types.BALANCE_REQUESTED:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case types.BALANCE_REQUEST_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false
			});
		default:
			return state;
	}
};

export const checkBalance = (state = {}, action) => {
	switch (action.types) {
		case types.BALANCE_REQUESTED:
		case types.BALANCE_REQUEST_SUCCESS:
			return Object.assign({}, state, {
				[action.address]: balanceRequest(state[action.address], action)
			});
		default:
			return state;
	}
};