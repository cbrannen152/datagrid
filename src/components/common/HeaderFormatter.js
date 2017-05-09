import React from 'react';
import Immutable from 'immutable';

const sortDirection = {
	ASC: { name: 'ASC', icon: 'mif-sortdown' },
	DESC: { name: 'DESC', icon: 'mif-sortup' },
	NONE: { name: 'NONE', icon: 'mif-sort' }
};

class HeaderFormatter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortDirection: sortDirection.NONE,
			filterValue: ''
		};
	}

	onClick() {

		if (this.props.column.sortable
			&& this.props.dataName) {

			let newSortDirection = this.state.sortDirection;

			switch (this.state.sortDirection) {
				case sortDirection.NONE:
					newSortDirection = sortDirection.ASC;
					break;

				case sortDirection.ASC:
					newSortDirection = sortDirection.DESC;
					break;

				case sortDirection.DESC:
					newSortDirection = sortDirection.NONE;
					break;
			}

			this.setState({ sortDirection: newSortDirection });
			this.props.sortRowModel(this.props.dataName, this.props.column.key, newSortDirection.name);

		}
	}

	onFilterChange(e) {


		this.setState({ filterValue: e.target.value });
		let filter = {};
		filter[this.props.column.key] = e.target.value;
		this.props.filterRowModel(this.props.dataName, Immutable.fromJS(filter));
	}

	render() {

		return (
			<div style={{ cursor: 'pointer' }}>
				<div style={{ width: this.props.column.width, padding: '3px', height: '35px', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
					onClick={this.onClick.bind(this)}>
					{this.props.column.name}
					{this.props.column.sortable ? <div className={this.state.sortDirection.icon} /> : null}
				</div>
				{this.props.column.filterable ?
					<div className='form-group'>
						<input type='text' className='form-control input-sm' placeholder='Search' value={this.state.filterValue}
							onChange={this.onFilterChange.bind(this)} />
					</div> : false
				}
			</div>
		);
	}
}


export default HeaderFormatter;