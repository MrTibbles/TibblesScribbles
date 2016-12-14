import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/productListingsActions';
import AssetListings from './AssetListings';

export const AssetListingsContainer = (props) => {

	return (
		<AssetListings products={ props.products } />
	);

};

AssetListingsContainer.propTypes = {	
	actions: PropTypes.object.isRequired,
	products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
	return {
		products: state.products
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AssetListingsContainer);