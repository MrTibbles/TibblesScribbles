import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers/reducers';

let loggedCreateStore = compose(
		applyMiddleware(logger())
)(createStore);

export default function configureStore(initialState = { todos: [] }) {
		return loggedCreateStore(reducer, initialState);
}
