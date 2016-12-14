import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/productListingsActions';
import AssetListings from './AssetListings';

export const AssetListingsContainer = (state) => {

	const { products } = state;

	return (
		
		<AssetListings
			shouldFetchProducts={ actions.shouldFetchProducts }
			products={ products } />
	);

};

AssetListingsContainer.propTypes = {	
	actions: PropTypes.object.isRequired,
	products: PropTypes.object.isRequired
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