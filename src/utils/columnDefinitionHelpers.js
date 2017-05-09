import React from 'react';
import Immutable from 'immutable';

import CellFormatter from '../containers/common/CellFormatter';
import HeaderFormatter from '../containers/common/HeaderFormatter';

/**
 * Default column  definition
 * 
 * @export
 * @param {any} key
 * @param {any} name
 * @param {any} columnType
 * @param {number} [weighting=1]
 * @param {string} [descriptor='']
 * @returns
 */
export function DefaultColumnDef(key, name, columnType, weighting = 1, descriptor = '') {
	return ColumnDef(key, name, true, true, true, true, columnType, weighting, descriptor);
}

/**
 * Mapping columns readOnly
 * 
 * @export
 * @param {any} key
 * @param {any} name
 * @param {any} columnType
 * @param {number} [weighting=1]
 * @param {string} [descriptor='']
 * @returns
 */
export function MappingColumnDef(key, name, columnType, weighting = 1, descriptor = '') {
	return ColumnDef(key, name, false, true, true, true, columnType, weighting, descriptor);
}

/**
 * Return a column definition with get the rows data for error check
 * This need for columns which require mutliple values for validating eg: subject and grade
 * 
 * @export
 * @param {any} key
 * @param {any} name
 * @param {any} columnType
 * @param {number} [weighting=1]
 * @param {string} [descriptor='']
 * @returns
 */
export function ErrorColumnDef(key, name, columnType, weighting = 1, descriptor = '') {
	return {
		...ColumnDef(key, name, true, true, true, true, columnType, weighting, descriptor),
		getRowMetaData: (row) => row
	};
}

/**
 * Create a header which can be mapped to
 * 
 * @export
 * @param {any} key
 * @param {any} name
 * @param {any} columnType
 * @param {number} [weighting=1]
 * @param {string} [descriptor='']
 * @returns
 */
export function MappableHeaderColumnDef(key, name, columnType, weighting = 1, descriptor = '') {
	return {
		...ColumnDef(key, name, true, true, true, true, columnType, weighting, descriptor),
		mappable: true
	};
}

/**
 * Column definition
 * 
 * @export
 * @param {any} key
 * @param {any} name
 * @param {boolean} [editable=true]
 * @param {boolean} [sortable=true]
 * @param {boolean} [resizable=true]
 * @param {boolean} [filterable=true]
 * @param {number} [weighting=1]
 * @param {string} [descriptor='']
 * @returns
 */
export function ColumnDef(key, name, editable = true, sortable = true, resizable = true, filterable = true, columnType = '', weighting = 1, descriptor = '') {
	return {
		key: key,
		name: name,
		formatter: <CellFormatter />,
		editable: editable,
		sortable: sortable,
		resizable: resizable,
		filterable: filterable,
		columnType: columnType,
		weighting: weighting,
		descriptor: descriptor,
		headerRenderer: HeaderFormatter
	};
}

/**
 * Return column definitions from given list of keys

 * @export
 * @param {any} list
 * @param {any} readOnly sets columns to non editable false(default), true to set to readOnly
 * @returns
 */
export function ColumnsFromHeadersList(list, readOnly = false) {

	let columns = new Immutable.List();

	list.map(c => { columns = columns.push(Immutable.fromJS(ColumnDef(c, c, !readOnly))); });
	return columns;
}

/**
 * Return list of mappable column definitions from given list of keys
 * 
 * @export
 * @param {any} list
 * @param {any} readOnly sets columns to non editable false(default), true to set to readOnly
 * @returns
 */
export function MappableColumnsFromHeadersList(list, readOnly = false) {

	let columns = new Immutable.List();

	list.map(c => { columns = columns.push(Immutable.fromJS(MappableHeaderColumnDef(c, c, !readOnly))); });
	return columns;
}
