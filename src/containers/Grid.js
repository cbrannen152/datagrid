import Immutable from 'immutable';
import { connect } from 'react-redux';

import dataGrid from '../components/Grid';

const mapStateToProps = (state) => {
	return {
		grid: state.grids.get('testGrid'),	
		data: state.data
	};
};

export default connect(
	mapStateToProps,
	{  }
)(dataGrid);