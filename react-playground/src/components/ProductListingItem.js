import React, { PropTypes } from 'react';

export const ProductListingItem = ({ product }) => {

	return (
			<li className="product-listing">{ product.author }</li>
	);
};

ProductListingItem.propType = {
	product: PropTypes.object.isRequired
};

export default ProductListingItem;