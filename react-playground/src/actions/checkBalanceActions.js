import * as types from '../constants/constants';
import { web3 } from '../utils/web3-utilities';

export const selectAddress = (address) => {
  return {
    type: types.SELECT_ADDRESS,
    address
  };
};

export const requestBalance = (address) => {
  return {
    type: types.BALANCE_REQUESTED,
    address
  };
};

export const receiveBalance = (address, val) => {
  return {
    type: types.BALANCE_REQUEST_SUCCESS,
    address,
    balance: val,
    receviedAt: Date.now()
  };
};

export const fetchBalance = (address) => {
  return (dispatch) => {
    dispatch(requestBalance(address));
    let balanceProm = new Promise((resolve, reject) => {
      web3.eth.getBalance(address, function(err, val) {
        if (err) reject(err);
        resolve(val.toNumber());
      });
    });

    balanceProm.then(function(val) {
      dispatch(receiveBalance(address, val));
    });

    balanceProm.catch(function(reason) {
      console.error(reason);
    });

  };
};

export const fetchBalanceIfNeeded = address => (dispatch) => {
  return dispatch(fetchBalance(address));
};
