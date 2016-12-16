import React, { PropTypes } from 'react';

const ProductListingItem = ({ product, onProductClick }) => {

	return (
			<div className='content-item' data-file={'type-' + product.fileType} onClick={(e) => onProductClick(e) }>
				<figure className='preview'>
					<img src={'http://localhost:32200/bzz:/' + product.previewFile + '/preview'} />
				</figure>
				<div className='info'>
					<div>
						<span className='item-title'>{ product.title }</span>					
					</div>
					<div>
						<span className='item-creator'>{ product.author }</span>					
					</div>
				</div>
			</div>
	);
};

ProductListingItem.propType = {
	product: PropTypes.object.isRequired,
	onProductClick: PropTypes.func.isRequired
};

export default ProductListingItem;