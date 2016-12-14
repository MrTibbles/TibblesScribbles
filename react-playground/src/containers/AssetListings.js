import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { shouldFetchProducts } from '../actions/productListingsActions';
import ProductListingItem from '../components/ProductListingItem';

class AssetListing extends React.Component {

	constructor(props, context) {
		super(props, context);		

		console.info('context: ', context);

		this.refreshProductListings = this.refreshProductListings.bind(this);
	}

	componentDidMount() {
		console.info('mounted');
		const { dispatch } = this.props;

		dispatch(shouldFetchProducts());
	}

	ComponentWillReceiveProps(nextProps) {
		// if (nextProps.selectedCreatorId !== this.)
		console.info('nextProps: ', nextProps);
	}

	refreshProductListings(creatorId) {
		const { dispatch } = this.props;
		dispatch(shouldFetchProducts(creatorId));
	}

	render() {
		const { products } = this.props;

		return (
			<section className="Product-wrapper">
				<button onClick={ this.refreshProductListings() }>refresh</button>
				{products.length &&
					products.map((product, idx) =>
						<ProductListingItem product={ product } key={ idx } />
					)
				}
			</section>
		);
	}

}

AssetListing.propTypes = {
	products: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	const { productsByCreatorId } = state;
	const { isFetching, receivedAt, productItems: products } = productsByCreatorId || { isFetching: true, productItems: []};

	return {
		products,
		isFetching,
		receivedAt
	};
}

export default connect(mapStateToProps)(AssetListing);