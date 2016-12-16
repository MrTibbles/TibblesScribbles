import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import showSideBarSubMenu from '../actions/sideBarVisibilityFilterActions';
import AssetTypeSideMenu from '../components/AssetTypeSideMenu';
import CreatorOptionsSideMenu from '../components/CreatorOptionsSideMenu';
import DeveloperOptionsSideMenu from '../components/DeveloperOptionsSideMenu';

const SideBar = ({ onOptionHeaderClick, onOptionFilterClick }) => {

	return (
		<div className="side-bar hidden-xs">
			<div className="upload-btn">
				<a href="/upload" className="btn btn-hollow">upload</a>
			</div>
			<AssetTypeSideMenu onOptionHeaderClick={ onOptionHeaderClick } onOptionFilterClick={ onOptionFilterClick } />
			<CreatorOptionsSideMenu onOptionHeaderClick={ onOptionHeaderClick } onOptionFilterClick={ onOptionFilterClick } />
			<DeveloperOptionsSideMenu onOptionHeaderClick={ onOptionHeaderClick } onOptionFilterClick={ onOptionFilterClick } />
		</div>
	);

};

const mapDispatchToProps = (dispatch) => {

	return {
		onOptionHeaderClick: (header) => {
			dispatch(showSideBarSubMenu(header));
		},
		onOptionFilterClick: (header) => {
			dispatch(showSideBarSubMenu(header));
		}
	};

};

SideBar.propTypes = {
	onOptionHeaderClick: PropTypes.func.isRequired,
	onOptionFilterClick: PropTypes.func.isRequired
};

export default connect(
	null,
	mapDispatchToProps
)(SideBar);