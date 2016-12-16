import React, { PropTypes } from 'react';
import { SIDEBAR_FILTER_HEADERS } from '../constants/action-types';

const AssetTypeSideMenu = ({ onOptionHeaderClick, onOptionFilterClick }) => {

	return (
		<div>
			<button onClick={(e) => onOptionHeaderClick(e) } className='filter-title btn-text side-bar-choice first-group' data-menu-group={SIDEBAR_FILTER_HEADERS.SHOW_ASSET_TYPES}>latest</button>
			<div className='sub-choices active'>
				<button onClick={ onOptionFilterClick } className='btn-txt filter-option'>All</button>
				<button onClick={ onOptionFilterClick } className='btn-txt filter-option'>Music</button>
				<button onClick={ onOptionFilterClick } className='btn-txt filter-option'>TV</button>
				<button onClick={ onOptionFilterClick } className='btn-txt filter-option'>Movies</button>
				<select id='language' className='form-control' defaultValue='Genre'>
					<option value='Piano'>Piano</option>
					<option value='House'>House</option>
					<option value='Chilled'>Chilled</option>
				</select>
			</div>
		</div>
	);

};

AssetTypeSideMenu.propTypes = {
	onOptionHeaderClick: PropTypes.func.isRequired,
	onOptionFilterClick: PropTypes.func.isRequired
};

export default AssetTypeSideMenu;