import { SET_SIDEBAR_VISIBILITY_FILTER, SIDEBAR_FILTER_HEADERS } from '../constants/action-types';

const sideBarVisibilityFilter = (state = 'SHOW_ASSET_TYPES', action) => {

	switch (action.type) {
		case SET_SIDEBAR_VISIBILITY_FILTER:
			return action.optionHeader;
		default:
			return state;
	}
};

export default sideBarVisibilityFilter;