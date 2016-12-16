import React, { PropTypes } from 'react';
// import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';
import HeaderBar from '../components/HeaderBar';
import SideBar from './SideBar';
import ProductListings from './ProductListings';

class HomePage extends React.Component {

	render() {
		const { dispatch, isAuthenticated, errorMessage } = this.props;
		return (
			<div>
				<HeaderBar
					isAuthenticated={ isAuthenticated }
					errorMessage={ errorMessage }
					dispatch={ dispatch }
				/>
				<SideBar />
				<ProductListings />
			</div>
		);
	}
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

const mapStateToProps = (state) => {

  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage
  };

};

export default connect(mapStateToProps)(HomePage);
