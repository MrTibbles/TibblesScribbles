import React, { PropTypes } from 'react';

const BalanceChecker = ({ requestBalance, address, balance }) => {

	const handleChange = (e) => {
    address = e.currentTarget.value; 
    requestBalance('0xYAAS');
  };

  return (
    <section className='balance-inputs'>
      <div className='row'>
        <div className='col-xs-12'>
          <input
            className='text'
            value={ address }
            onChange={ handleChange }
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-12'>
          <input
            value={ balance }
            readOnly
          />
        </div>
      </div>
    </section>
  );
};

BalanceChecker.propTypes = {
	address: PropTypes.string,
	balance: PropTypes.number,
  requestBalance: PropTypes.func,
};

export default BalanceChecker;
