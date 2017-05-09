import Immutable from 'immutable';

export function rowModel(object) {
	return Immutable.fromJS({
		...object,
		data_grid_row_visible: true,
		guid: guid()
	});
}

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}