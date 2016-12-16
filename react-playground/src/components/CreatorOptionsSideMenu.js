import React, { PropTypes } from 'react';
import { SIDEBAR_FILTER_HEADERS } from '../constants/action-types';

const CreatorOptionsSideMenu = ({ onOptionHeaderClick, onOptionFilterClick }) => {

	return (
		<div>
			<button data-choice='creators' onClick={(e) =>  onOptionHeaderClick(e) } className='filter-title btn-text side-bar-choice' data-menu-group={SIDEBAR_FILTER_HEADERS.SHOW_CREATOR_OPTIONS}>creators</button>
			<div className='sub-choices'>
				<button onClick={ onOptionFilterClick } data-choice='dashboard' className='btn-text filter-option'>Dashboard</button>
				<button onClick={ onOptionFilterClick } data-choice='manage' className='btn-text filter-option'>Manage</button>
				<button onClick={ onOptionFilterClick } data-choice='analytics' className='btn-text filter-option'>Analytics</button>
			</div>
		</div>
	);

};

CreatorOptionsSideMenu.propTypes = {
	onOptionHeaderClick: PropTypes.func.isRequired,
	onOptionFilterClick: PropTypes.func.isRequired
};

export default CreatorOptionsSideMenu;