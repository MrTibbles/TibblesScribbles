import React, { PropTypes } from 'react';
import ProductListingItem from '../components/ProductListingItem';

class AssetListing extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.refreshProductListings = this.refreshProductListings.bind(this);
	}

	refreshProductListings(creatorId) {
		this.props.shouldFetchProducts(creatorId);
	}

	render() {
		const { products } = this.props;

		return (
			<section className="Product-wrapper">
				<h1>Products</h1>
				<ProductListingItem products={ products } />
			</section>
		)
	}

};

AssetListing.propTypes = {
	products: PropTypes.array.isRequired
};

export default AssetListing;