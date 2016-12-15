import React, { PropTypes } from 'react';
import HeaderBar from '../components/HeaderBar';
// import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux';

import '../styles/jaak-steez.css';

class HomePage extends React.Component {

	render() {
		const { dispatch, isAuthenticated, errorMessage } = this.props;
		return (
			<HeaderBar
				isAuthenticated={ isAuthenticated }
				errorMessage={ errorMessage }
				dispatch={ dispatch }
			/>
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
