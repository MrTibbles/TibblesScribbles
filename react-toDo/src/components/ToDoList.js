import React, { Component } from 'react';

const ToDoList = ({todos}) => {

	const handleClicked = (e) => {
			// this.props.deleteLetter()
			console.info(e);
	}

	return (
			<ul className="todo-list">
					{
							todos.map((todo) => {
									return <li key={ todo.id }>{ todo.text }</li>
							})
					}
			</ul>
	);

};

export default ToDoList;