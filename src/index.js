
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import { getStore } from './utils/redux';

const store = getStore();

render(
	<Provider store={store}>
		<Router history={syncHistoryWithStore(browserHistory, store)} routes={routes} />
	</Provider>,
	document.getElementById('root')
);

// Helper function to get current state if applicable
export const getState = () => store.getState();
