import React from 'react';
import HeaderBar from '../components/HeaderBar';

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

HomePage

export default HomePage;
