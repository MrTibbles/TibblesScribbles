import React, { PropTypes } from 'react';

export const AssetListing = ({ products }) => {

	return (
		<ul>
			{products.map((product, i) => 
				<li key={ i }>{ product.previewLocation }</li>
			)}
		</ul>
	);
};

AssetListing.propTypes = {
	products: PropTypes.array.isRequired
};

export default AssetListing;