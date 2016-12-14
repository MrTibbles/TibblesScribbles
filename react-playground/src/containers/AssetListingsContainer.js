import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/productListingsActions';
import AssetListings from './AssetListings';

const AssetListingsContainer = ({ actions, products, isFetching, receivedAt }) => {

	const ini = () => {
		actions.shouldFetchProducts();
	};

	const handleRefresh = () => {
		actions.refreshProducts();
		actions.shouldFetchProducts();
	};

	return (
		<section>			
			<button onClick={ ini }>Start</button>
			{receivedAt &&		
				<span>Received at: { new Date(receivedAt).toLocaleTimeString() }</span>
			}
			{!isFetching &&
				<a href='#' onClick={ handleRefresh }>Refresh Listings</a>
			}
			<AssetListings products={ products } />
		</section>
	);

};

AssetListingsContainer.propTypes = {
	products: PropTypes.array,
	isFetching: PropTypes.bool,
	receivedAt: PropTypes.bool,
	actions: PropTypes.object.isRequired	
};

const mapStateToProps = (state) => {
	const { selectedCreatorId, productsByCreatorId }	= state;
	const { isFetching, receivedAt, items: products } = productsByCreatorId[selectedCreatorId] ||
		{ isFetching: true, items: [] };

	return {
		selectedCreatorId,
		products,
		isFetching,
		receivedAt
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