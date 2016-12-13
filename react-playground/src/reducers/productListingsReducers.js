import * as types from '../constants/action-types';

export const selectedCreatorId = (state = '0x0', action) => {
	switch (action.types) {
		case types.SELECT_CREATOR_ID:
			return action.creatorId;
		default:
			return state;
	}
};

export const products = (state = { isFetching: true, didInvalidate: false, products: [] }, action) => {
	switch (action.type) {
		case types.REFRESH_ASSETS:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case types.ASSETS_REQUESTED:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case types.ASSET_REQUEST_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				products: action.products,
				receivedAt: action.receivedAt
			});
		default:
			return state;
	}
};

export const productsByCreatorId = (state = {}, action) => {
	switch (action.type) {
		case types.REFRESH_ASSETS:
		case types.ASSETS_REQUESTED:
		case types.ASSET_REQUEST_SUCCESS:
			return Object.assign({}, state, {
				creatorProducts: products(state[action.creatorId], action)
			});
		default:
			return state;
	}
};