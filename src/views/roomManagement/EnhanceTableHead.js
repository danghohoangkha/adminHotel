import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headCells = [
	{ id: 'id', disablePadding: true, label: 'Id' },
	{id: 'LoaiP',disablePadding:true,label:'LoaiP'},
	{id: 'GiaThue', disablePadding: false, label: 'GiaThue' },
	{ id: 'KhuyenMai', disablePadding: false, label: 'KhuyenMai' },
	{ id: 'SoNguoiToiDa', disablePadding: false, label: 'SoNguoiToiDa' },
	{ id: 'MoTa', disablePadding: false, label: 'MoTa' },
	{ id: 'TrangThai', disablePadding: false, label: 'TrangThai' },
	{ id: 'Xemchitiet', disablePadding: false, label: 'XemChiTiet' },
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
					if (headCell.id !== 'MoTa') {
						return (
							<TableCell
								key={headCell.id}
								align='left'
								padding={headCell.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === headCell.id ? order : false}
								width = {'7%'}
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
					else{
						return (
							<TableCell
								key={headCell.id}
								align='left'
								padding={headCell.disablePadding ? 'none' : 'default'}
								width='40%'
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