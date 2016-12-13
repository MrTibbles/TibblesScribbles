import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/checkBalanceActions';
import { web3 } from '../utils/web3-utilities';

const BalanceChecker = ({ actions, address, balanceInfo }) => {

	const handleChange = (e) => {
    address = e.currentTarget.value;     
  };

  const requestBalance = () => {
    if (address.length === 42) {
      actions.fetchBalanceIfNeeded(address);
    }
  };

  return (    
    <section className='balance-inputs'>
      <div className='row'>
        <div className='col-xs-6'>
          <input
            className='text'
            value={ address }
            onChange={ handleChange }
          />
        </div>
        <div className='col-xs-6'>
          <button className='btn btn-blue' onClick={ requestBalance }>submit</button>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <p>{ web3.fromWei(balanceInfo.balance) } ETH</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <input
            value="0xe0b472b69def6ab26d92156bc5f97671cf109203"
            readOnly
          />
        </div>
      </div>
    </section>
  );
};

BalanceChecker.propTypes = {
  actions: PropTypes.object.isRequired,
	address: PropTypes.string,
	balanceInfo: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    balanceInfo: state.checkBalance
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BalanceChecker);
