import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { shouldFetchProducts, selectProduct } from '../actions/productListingsActions';
import ProductListingItem from '../components/ProductListingItem';

class ProductListings extends React.Component {

	constructor(props) {
		super(props);
		this.refreshProductListings = this.refreshProductListings.bind(this);
		this.onProductClick = this.onProductClick.bind(this);
	}

	componentDidMount() {
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

	onProductClick(ele) {
		const { dispatch } = this.props;
		dispatch(selectProduct(ele));
	}

	render() {
		const { products, isFetching } = this.props;

		return (
			<section className="latest-products">
				{isFetching && products.length === 0 &&
					<h3>Loading...</h3>
				}
				{products.length > 0 &&
					products.map((product, idx) =>
						<ProductListingItem product={ product } key={ idx } onProductClick={ this.onProductClick } />
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
	product: PropTypes.object,
	onProductClick: PropTypes.func	
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