import * as types from '../constants/action-types';
import { jaakDB } from '../constants/contracts';
import asyncLoop from '../utils/asyncLoop';

export const selectCreatorId = (creatorId) => {
  return {
    type: types.SELECT_CREATOR_ID,
    creatorId
  };
};

export const refreshProducts = (creatorId) => {
  return {
    type: types.REFRESH_ASSETS,
    creatorId
  };
};

export const requestProducts = (creatorId) => {
  return {
    type: types.ASSETS_REQUESTED,
    creatorId
  };
};

export const receiveProducts = (creatorId, products) => {
  return {
    type: types.ASSET_REQUEST_SUCCESS,
    creatorId,
    products: products,
    receivedAt: Date.now()
  };
};

export const fetchProducts = (assetCount, creatorId) => {
  return dispatch => {
    dispatch(requestProducts(creatorId));
    let products = [];
    asyncLoop(assetCount, function(loop) {
      let productID, productName, assetID, assetAuthor, location, fileType;

      let
        productIDProm = function() {
          let prom = new Promise((resolve, reject) => {
            jaakDB.product_idFromIdx.call(loop.iteration(), function(err, value) {
              if (err) reject(err);
              productID = value;
              resolve();
            });
          });
          return prom;
        },
        productNameProm = function() {
          let prom = new Promise((resolve, reject) => {
            jaakDB.product.call(productID, function(err, value) {
              if (err) reject(err);
              productName = value[0];
              assetID = value[1];
              resolve();
            });
          });
          return prom;
        },
        assetAuthorProm = function() {
          let prom = new Promise((resolve, reject) => {
            jaakDB.asset.call(assetID, function(err, value) {
              if (err) reject(err);
              assetAuthor = value[4];
              fileType = Number(value[5]);
              resolve();
            });
          });
          return prom;
        },
        locationProm = function() {
          let prom = new Promise((resolve, reject) => {
            jaakDB.asset.call(assetID, function(err, value) {
              if (err) reject(err);
              location = value[7].replace('0x', '');
              resolve();
            });
          });
          return prom;
        };

      productIDProm()
        .then(productNameProm)
        .then(assetAuthorProm)
        .then(locationProm)
        .then(function() {
          products.push({
            productID: productID,
            title: productName,
            previewFile: location,
            author: assetAuthor,
            fileType: fileType
          });
          loop.next();
        })
        .catch(function(reason) {
          console.info(reason);
        });

    }, function() {
      return dispatch(receiveProducts(creatorId, products));
    });
  };
};

export const canFetchProducts = (creatorId) => {
	creatorId = creatorId || undefined;  
  console.info('creatorId: ', creatorId);

  let productsLength = jaakDB.product_quantity.call().toNumber();
  if (!productsLength) {
    return false;
  } else if (productsLength >= 1) {
    return productsLength;
  }
};

// export const shouldFetchProducts = (state, creatorId) => (dispatch) => {
export const shouldFetchProducts = (creatorId) => (dispatch) => {
  let productCount = canFetchProducts(creatorId);
  // let products = state.productsByCreatorId[creatorId];

  if (productCount) {
    return dispatch(fetchProducts(productCount));
  } else {
    return false;
  }
};
