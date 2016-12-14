import React, { PropTypes } from 'react';
import * as types from '../actions/authenticationActions';
import Login from './Login';
import Logout from './Logout';

const HeaderBar = ({ dispatch, isAuthenticated, errorMessage }) => {

	return (
		<header className='header-bar'>
			<div className='wide-wrap'>
				<div className='col-xs-4'>
					<figure className='main-logo'>
						<a href='/'><img src='images/JAAK-logo@3x.150x24.png' alt='JAAK' /></a>
					</figure>
				</div>
				{!isAuthenticated && 
					<Login
						errorMessage={ errorMessage }
						onLoginClick={ creds => dispatch(types.loginUser(creds))}
					/>
				}
				{isAuthenticated && 
					<Logout
						onLogOutClick={ () => dispatch(types.logOutUser()) }
					/>
				}
			</div>
		</header>
	);

};

HeaderBar.propTypes = {
	dispatch: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string
};

export default HeaderBar;