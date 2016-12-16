import React, { PropTypes } from 'react';
import { SIDEBAR_FILTER_HEADERS } from '../constants/action-types';

const DeveloperOptionsSideMenu = ({ onOptionHeaderClick, onOptionFilterClick }) => {

	return (
		<div>
			<button data-choice='developers' onClick={(e) => onOptionHeaderClick(e) } className='filter-title btn-text side-bar-choice' data-menu-group={SIDEBAR_FILTER_HEADERS.SHOW_DEVELOPER_OPTIONS}>developers</button>
			<div className='sub-choices'>
				<button onClick={ onOptionFilterClick } data-choice='embed' className='btn-text filter-option selected'>Embed</button>
				<button onClick={ onOptionFilterClick } data-choice='api' className='btn-text filter-option'>API</button>
			</div>
		</div>
	);

};

DeveloperOptionsSideMenu.propTypes = {
	onOptionHeaderClick: PropTypes.func.isRequired,
	onOptionFilterClick: PropTypes.func.isRequired
};

export default DeveloperOptionsSideMenu;