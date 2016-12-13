import web3Lib from 'web3';
export const web3 = new web3Lib();

const web3Provider = new web3.providers.HttpProvider('http://localhost:8545');

web3.setProvider(web3Provider);

if (!web3.isConnected()) {
	web3.setProvider(web3Provider);	
}