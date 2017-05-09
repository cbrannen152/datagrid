import { connect } from 'react-redux';

import headerFormatter from '../../components/common/HeaderFormatter';
import actions from '../../actions';

const mapStateToProps = (state) => {

	return {
		grids: state.grids
	};
};

export default connect(
	mapStateToProps,
	{ ...actions }
)(headerFormatter);