import React from 'react';
import Immutable from 'immutable';
import { Grid, AutoSizer, ScrollSync } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';

import {classNames} from '../utils/classNames';
import { isEmptyOrSpaces } from '../utils/stringHelpers';

class DataGrid extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			rows: this.props.data.getIn(['present', 'rows']).filter(r => r.get('data_grid_row_visible'))
		};

		this.getColumnWidth = this.getColumnWidth.bind(this);
	}

	/**
	 * Provides the rows visible to the grid 
	 * 
	 */
	getRows() {
		return this.state.rows;
	}

	/**
	 * Find the size of the Immutable data in grid (required)
	 * 
	 * @returns int value
	 */
	getRowsSize() {
		return this.getRows().size;
	}

	/**
	 * This is a required function of the grid to return a row at index
	 * 
	 * @param {any} rowIndex the row Index to get
	 * @returns
	 */
	rowGetter(rowIndex) {
		return this.getRows().get(rowIndex);
	}

	/**
 	* Provides the columns visible to the grid 
 	* 
 	*/
	getColumns() {
		return this.props.grid.get('columns');
	}

	/**
	 * Find the size of the columns provided to the grid (required)
	 * 
	 * @returns int value
	 */
	getColumnsSize() {
		return this.getColumns().size;
	}

	/**
	 * Return the column for an given index
	 * 
	 * @param {any} columnIndex the column Index to get
	 * @returns
	 */
	columnGetter(columnIndex) {
		return this.getColumns().get(columnIndex);
	}

	/**
	 * Return the value of a cell at row and column index
	 * 
	 * @param {any} rowIndex
	 * @param {any} columnIndex
	 * @returns
	 * 
	 * @memberOf DataGrid
	 */
	cellValueGetter(rowIndex, columnIndex) {

		return this.rowGetter(rowIndex).get(this.columnGetter(columnIndex).key);
	}


	handleChange(e, rowIndex, columnIndex) {

		if (!isEmptyOrSpaces(e.target.value)
			&& e.target.value !== this.cellValueGetter(rowIndex, columnIndex)) {

			let setData = {
				rowIdx: rowIndex,
				cellKey: this.columnGetter(columnIndex).get('key'),
				updated: { [this.columnGetter(columnIndex).get('key')]: e.target.value }
			};

			this.props.updateRowModel(setData, this.props.data.get('name'));
		}
	}

	onCellSelected(e, rowIndex, columnIndex) {

		let coordinates = {
			rowIdx: rowIndex,
			idx: columnIndex
		};

		this.props.setSelectedCell(this.props.grid.get('name'),
			this.props.grid.get('parent'),
			coordinates, this.columnGetter(columnIndex).get('key'));
	}

	onFocusChange(e, rowIndex, columnIndex) {
		//clear previously selected cell style
		document.getElementById(rowIndex.toString().concat('-', columnIndex)).className.replace('selected', '');
	}

	/**
	 * Render the cell 
	 * 
	 * @param {any} { columnIndex, key, rowIndex, style }
	 * @returns
	 * 
	 * @memberOf Datagrid
	 */
	cellRenderer({ columnIndex, key, rowIndex, style }) {

		let selected;
		if (this.props.grid.get('selectedCell')) {
			selected = this.props.grid.getIn(['selectedCell', 'row']) === rowIndex
				&& this.props.grid.getIn(['selectedCell', 'column']) === columnIndex;
		}

		return (
			<input className={'data-grid-Cell'}
				id={key}
				key={key}
				style={style}
				value={this.cellValueGetter(rowIndex, columnIndex) || ''}
				readOnly={!this.columnGetter(columnIndex).get('editable')}
				onChange={(e) => this.handleChange(e, rowIndex, columnIndex)}
				onSelect={(e) => this.onCellSelected(e, rowIndex, columnIndex)}
				onFocus={(e) => this.onFocusChange(e, rowIndex, columnIndex)}
			/>
		);
	}


	handleSort(e, columnIndex) {

		if (this.columnGetter(columnIndex).get('sortable')) {

			let sortDirection;
			if (!this.columnGetter(columnIndex).get('sortDirection')) {
				sortDirection = 'ASC';
			}
			if (this.columnGetter(columnIndex).get('sortDirection') === 'ASC') {
				sortDirection = 'DESC';
			}
			if (this.columnGetter(columnIndex).get('sortDirection') === 'DESC') {
				sortDirection = 'ASC';
			}

			this.props.sortRowModel(this.props.data.get('name'), this.columnGetter(columnIndex).get('key'), sortDirection, this.props.grid.get('name'), columnIndex);
		}
	}

	/**
	 * Add filter to grid for column
	 * 
	 * @param {any} e
	 * @param {any} columnIndex
	 * 
	 * @memberOf DataGrid
	 */
	onFilterChange(e, columnIndex) {

		let filters = new Immutable.Map();

		this.props.grid.get('columns').map(c => {
			filters = !isEmptyOrSpaces(c.get('filterValue')) ? filters.set(c.get('key'), c.get('filterValue')) : filters;
		});

		if (isEmptyOrSpaces(e.target.value)) {
			filters = filters.delete(this.columnGetter(columnIndex).get('key'));
		} else {
			filters = filters.set(this.columnGetter(columnIndex).get('key'), e.target.value);
		}

		this.props.filterRowModel(this.props.data.get('name'), filters, this.props.grid.get('name'), columnIndex);

	}

	//Clear the filters from the grid and the data
	onClearFilters() {

		//Clear the gridFilter values in headers
		let filters = document.getElementsByClassName('gridFilter');
		[].forEach.call(filters, function (el) { el.value = null; });

		//Clear the filters in state for data and grid
		this.props.filterRowModel(this.props.data.get('name'), null, this.props.grid.get('name'));
	}

	onMappingChange(e) {
		console.log('mapping', e)
	}

	/**
	 * Render the header cells
	 * 
	 * @param {any} { columnIndex, key, rowIndex, style }
	 * @returns
	 * 
	 * @memberOf DataGrid
	 */
	headerCellRenderer(props) {

		let { columnIndex, key, style } = props;

		if (this.columnGetter(columnIndex)) {
			return (
				<div className='data-grid-HeaderCell'
					key={key}
					style={style}>
					{this.columnGetter(columnIndex).get('name')}

					{this.columnGetter(columnIndex).get('sortable') ?
						<div className={this.getSortIcon(this.columnGetter(columnIndex).get('sortDirection'))}
							onClick={(e) => this.handleSort(e, columnIndex)} /> : <div style={{ height: '22px' }} />
					}

					{this.columnGetter(columnIndex).get('filterable') ?
						<div>
							<input
								type='text'
								className='gridFilter form-control input-sm'
								placeholder='Search'
								value={this.columnGetter(columnIndex).get('filterValue')}
								onChange={(e) => this.onFilterChange(e, columnIndex)} />
						</div> : false
					}

				</div>
			);
		} else {
			return null;
		}
	}

	getSortIcon(sortDirection) {

		switch (sortDirection) {
			case 'ASC':
				return 'mif-sortdown';

			case 'DESC':
				return 'mif-sortup';

			default:
				return 'mif-sort';
		}
	}

	//TODO make this adaptable to fit to screen/cell weightings
	getColumnWidth({ index }) {
		return (100 * this.columnGetter(index).get('weighting'));
	}


	getHeaderSize() {

		let size = 25;
		let isSortable, isFilterable, isMappable;

		this.props.grid.get('columns').map(c => {
			c.get('sortable') ? isSortable = true : null;
			c.get('filterable') ? isFilterable = true : null;
			c.get('mappable') ? isMappable = true : null;
		});

		size = isSortable ? size + 22 : size;
		size = isFilterable ? size + 30 : size;
		size = isMappable ? size + 30 : size;

		return size;
	}

	getBodyGridSize() {

		return this.props.grid.get('gridHeight') ? this.props.grid.get('gridHeight') - this.getHeaderSize() : 750 - this.getHeaderSize();
	}

	componentWillReceiveProps(nextProps) {

		this.setState({ rows: nextProps.data.getIn(['present', 'rows']).filter(r => r.get('data_grid_row_visible')) });
	}

	render() {

		return (
			<ScrollSync>
				{({ onScroll, scrollLeft }) => (
					<div className={'gridContainer'}>
						
						<AutoSizer disableHeight>
							{({ width }) => (
								<div>
									<Grid ref='headerGrid'
										className={'headerGrid'}
										cellRenderer={this.headerCellRenderer.bind(this)}
										columnCount={this.getColumnsSize()}
										columnWidth={(width - scrollbarSize()) / this.getColumnsSize()}
										height={this.getHeaderSize()}
										rowCount={1}
										rowHeight={this.getHeaderSize()}
										width={width - scrollbarSize()}
										scrollLeft={scrollLeft}
									/>
								
										<Grid id='bodyGrid'
											className={'bodyGrid'}
											cellRenderer={this.cellRenderer.bind(this)}
											columnCount={this.getColumnsSize()}
											columnWidth={(width - scrollbarSize()) / this.getColumnsSize()}
											height={this.getBodyGridSize()}
											rowCount={this.getRowsSize()}
											overscanRowCount={20}
											rowHeight={30}
											width={width}
											onScroll={onScroll}
										/>
							
								</div>)}
						</AutoSizer>
					</div>
				)}
			</ScrollSync>
		);
	}
}


DataGrid.propTypes = {

};

DataGrid.defaultProps = {

};

export default DataGrid;
