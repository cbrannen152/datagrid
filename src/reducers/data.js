import Immutable from 'immutable';
import {rowModel} from '../constants/rowModel';

const defaultState = Immutable.fromJS({
	name: 'testModels',
	past: [],
	present: { rows: getrows() },
	future: []
});

function getrows() {
	var _rows = [];
	for (var i = 0; i < 10; i++) {
		var row = rowModel();
		row = row.set('Editable', i.toString());
		row = row.set('Sortable', i.toString());
		row = row.set('Resize', i.toString());
		row = row.set('Filter', i.toString());
		row = row.set('Default', i.toString());
		row = row.set('NonEditable', i.toString());
		row = row.set('Error', i.toString());
		_rows[i] = row;
	}
	return _rows;
}

const data = (state = defaultState, action) => {
	return state;
};

export default {data};