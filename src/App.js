import React, { Component } from 'react';
import logo from './svg/logo.svg';
import './css/App.css';
import './css/dataGrid.css';
import Grid from './containers/Grid';

class App extends Component {
	render() {
		return (
		<div className="App">
			<Grid />
		</div>
		);
	}
}

export default App;
