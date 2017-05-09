import { connect } from 'react-redux';

import cellFormatter from '../../components/common/CellFormatter';

const mapStateToProps = (state) => {

	return {
		descriptors: {}
	};
};

export default connect(
	mapStateToProps,
	{}
)(cellFormatter);