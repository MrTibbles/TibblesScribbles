import web3Lib from 'web3';
import * as types from '../constants/constants';

const web3 = new web3Lib();

export const requestBalance = (address) => {
	return {
		type: types.BALANCE_REQUESTED,
		address
	};
};

export const receiveBalanceInfo = (address, val) => {
		return {
			type: types.BALANCE_REQUEST_SUCCESS,
			address,
			balance: val,
			balanceCheckTime: Date.now()
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
				console.info(val);
				dispatch(receiveBalanceInfo(address, val));
			});
			balanceProm.catch(function(reason) {
				console.error(reason);
			});
		};
};