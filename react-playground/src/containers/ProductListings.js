import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { shouldFetchProducts } from '../actions/productListingsActions';
import ProductListingItem from '../components/ProductListingItem';

class ProductListings extends React.Component {

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

	componentWillReceiveProps(nextProps) {
		console.info('nextProps: ', nextProps);
	}

	refreshProductListings(creatorId) {
		const { dispatch } = this.props;
		dispatch(shouldFetchProducts(creatorId));
	}

	render() {
		const { products, receivedAt, isFetching } = this.props;

		return (
			<section className="Product-wrapper">
				<p>
					{receivedAt &&
						<span>Received at: { new Date(receivedAt).toLocaleTimeString()}. { ' ' }</span>
					}
				</p>
				{!isFetching &&
					<a href='#' onClick={ this.refreshProductListings }>Refresh Listings</a>
				}
				{isFetching && products.length === 0 &&
					<h3>Loading...</h3>
				}
				{products.length > 0 &&
					products.map((product, idx) =>
						<ProductListingItem product={ product } key={ idx } />
					)
				}
			</section>
		);
	}

}

ProductListings.propTypes = {
	products: PropTypes.array.isRequired,
	dispatch: PropTypes.func.isRequired,
	isFetching: PropTypes.bool.isRequired,
	receivedAt: PropTypes.number
};

function mapStateToProps(state) {
	const { productListings } = state;
	const {
		isFetching,
		receivedAt,
		productItems: products } = productListings || {
			isFetching: true, 
			productItems: []
		};

	return {
		products,
		isFetching,
		receivedAt
	};
}

export default connect(mapStateToProps)(ProductListings);