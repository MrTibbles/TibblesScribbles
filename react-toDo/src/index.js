import React from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
import configStore from './store/store';
import { Provider } from 'react-redux'; // wraps app to give store as a prop to app

// let: keeps to current scope
let initialState = {
		todos: []
};

let store = configStore(initialState);

render(
		<Provider store={ store }>
				<App />
		</Provider>,
		document.getElementById('app')
)