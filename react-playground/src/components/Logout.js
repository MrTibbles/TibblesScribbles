import React, { PropTypes } from 'react';

const Logout = ({ onLogOutClick }) => {

	return (
		<div className='account-info col-xs-8'>
			<button onClick={ () => onLogOutClick() } className='btn btn-hollow btn-login'>Log out</button>
		</div>
	);
};

Logout.propTypes = {
	onLogOutClick: PropTypes.func.isRequired
};

export default Logout;