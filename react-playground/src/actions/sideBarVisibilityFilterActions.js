import { SET_SIDEBAR_VISIBILITY_FILTER } from '../constants/action-types';

const setSideBarVisibilityFilter = (optionHeader) => {
	return {
		type: SET_SIDEBAR_VISIBILITY_FILTER,
		optionHeader
	};
};

export const showSideBarSubMenu = (ele) => {

	const subMenuGroups = document.querySelectorAll('.sub-choices');
	let subMenuToShow = ele.currentTarget.dataset['menuGroup'];
	let subMenuEleToShow = ele.target.nextSibling;

	for (let i = subMenuGroups.length - 1; i >= 0; i--) {
		subMenuGroups[i].classList.remove('active');
	}
	subMenuEleToShow.classList.add('active');

	return dispatch => {
		dispatch(setSideBarVisibilityFilter(subMenuToShow));
	};

};

export default showSideBarSubMenu;