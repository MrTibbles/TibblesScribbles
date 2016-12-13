import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { web3 } from '../utils/web3-utilities';
import AssetListing from '../components/AssetListing';

const AssetListings = ({ actions, creatorId }) => {

	actions.

	return (
		<AssetListing creatorId={ creatorId } />
	);

};

const mapStateToProps = (state) => {
	const { selectedCreatorId, creatorId }	= state;
	const { isFetching, lastUpdated, products: products } = productsByCreatorId[selectedCreatorId] || { isFetching: true, products };

	return {
		selectedCreatorId,
		products,
		isFetching,
		lastUpdated
	}
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps)(AssetListings);