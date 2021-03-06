import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
	{ id: 'id', disablePadding: true, label: 'ID' },
	{ id: 'HoTen', disablePadding: false, label: 'Name' },
	{ id: 'GioiTinh', disablePadding: false, label: 'GioiTinh' },
	{ id: 'DiaChi', disablePadding: false, label: 'Address' },
	{ id: 'ChucVu', disablePadding: false, label: 'ChucVu' },
	
];

const EnhancedTableHead = (props) => {
	const { classes, order, orderBy, onRequestSort } = props;

	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};
	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">

				</TableCell>
				{headCells.map((headCell) => {
					if (headCell.id !== 'id') {
						return (
							<TableCell
								key={headCell.id}
								align='left'
								padding={headCell.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === headCell.id ? order : false}
								width = {'20%'}
							>
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={orderBy === headCell.id ? order : 'asc'}
									onClick={createSortHandler(headCell.id)}
								>
									{headCell.label}
									{orderBy === headCell.id ? (
										<span className={classes.visuallyHidden}>
											{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
										</span>
									) : null}
								</TableSortLabel>
							</TableCell>
						)
					}
					else {
						return (
							<TableCell
								key={headCell.id}
								align='left'
								padding={headCell.disablePadding ? 'none' : 'default'}
								width='20%'
							>
								{headCell.label}
							</TableCell>
						)
					}
				})}

			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;