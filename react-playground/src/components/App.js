import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        <Link to="balance-checker">Balance</Link>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
