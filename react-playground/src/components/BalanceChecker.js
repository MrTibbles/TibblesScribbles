import React, { PropTypes } from 'react';

const BalanceChecker = ({ addresss, balance }) => {
  return (
    <div>
      <h1>| G |</h1>
    </div>
  );
};

BalanceChecker.propTypes = {
	addresss: PropTypes.string,
	balance: PropTypes.number
};

export default BalanceChecker;
