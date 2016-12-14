import React from 'react';

export const Login = ({ errorMessage }) => {

	const handleClick = (event) => {
		console.info(event);
	};

	return (
		<div className='account-info col-xs-8'>
			<button onClick={ (event) => handleClick(event) } className='btn btn-hollow btn-login'>sign up / log in</button>
		</div>
	);
};

Login.propTypes = {
	onLoginClick: PropTypes.func.isRequired,
	errorMessage: PropTypes.string
};

export default Login;