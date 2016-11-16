import React, { Component } from 'react';
import ToDoList from './ToDoList';

class TextInput extends Component {

	constructor(props, context) {
			super(props, context);
			this.state = {
					toDoTitle: undefined
			}
	}

    handleChange(event) {
        this.setState({
            toDoTitle: event.target.value
        });
    }

	handleSubmit(e) {
        e.preventDefault();
		this.props.addToDo(this.state.toDoTitle);
	}

    render() {
        return (
        		<form className='text-wrapper'>
      				<input
        					className='text'
        					type='text'
        					placeholder='Enter to do'
                            onChange={ this.handleChange.bind(this) }
        					value={ this.state.toDoTitle }
    					/>
    					<button type='submit' onClick={ this.handleSubmit.bind(this) }>submit</button>
        		</form>
        )
    }
}

export default TextInput;
