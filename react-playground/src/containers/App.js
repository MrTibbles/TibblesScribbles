import React from 'react';
// import { connect } from 'react-redux';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

  render() {
    // const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div className='hidden'></div>
    );
  }

}

// App.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   isAuthenticated: PropTypes.bool.isRequired,
//   errorMessage: PropTypes.string
// };

// const mapStateToProps = (state) => {

//   const { auth } = state;
//   const { isAuthenticated, errorMessage } = auth;

//   return {
//     isAuthenticated,
//     errorMessage
//   };

// };

// export default connect(mapStateToProps)(App);

export default App;