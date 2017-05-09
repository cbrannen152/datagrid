import { routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { getState } from '../index';
import reducers from '../reducers/index';

/*
Higher order reducer
*/
export function ignoreIfNotRoute(reducer, route) {

	const initialState = reducer(undefined, {});

	return (state = initialState, action) => {

		// If no access to state, return standard reducer call
		if (!getState) {
			return reducer(state, action);
		}

		const routingState = getState().routing;

		// If no access to routing state, return standard reducer call
		if (!routingState || !routingState.locationBeforeTransitions) {
			return reducer(state, action);
		}

		// If route matches, call standard reducer, else ignore
		if (routingState.locationBeforeTransitions.pathname.toLowerCase().includes(route.toLowerCase())) {
			return reducer(state, action);
		} else {
			return state;
		}

	};

}

export function getStore() {
	return createStore(
		combineReducers({
			...reducers,
			routing: routerReducer
		}),
		{},
		compose(
			applyMiddleware(thunkMiddleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		));
}
