import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from './TextInput';
import ToDoList from './ToDoList';
import { bindActionCreators } from 'redux';
import actions from '../actions/actions';

class App extends Component {

		render() {
				return (
						<section className='container'>
								<TextInput addToDo={ this.props.actions.addToDo } />
								<ToDoList todos={ this.props.todos }/>
						</section>
				)
		}

}

function mapStateToProps(state) {
		return state;
}

function mapDispatchToProps(dispatch) {
		return {
				actions: bindActionCreators(actions, dispatch)
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);