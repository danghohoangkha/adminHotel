import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";

import EnhancedTableHead from './EnhanceTableHead'
import EnhancedTableToolbar from './EnhanceTableToolbar.js'
// import { convertDateToString } from '../../services/date'
import {stableSort, getComparator} from './services'
import Progress from '../../components/Progress'
import useStyles from './styles'
import CallAPI from '../../utils/callAPI'
import { useLoginContext } from '../../context/context';
import {useHistory} from 'react-router-dom';
export default function EnhancedTable(props) {
  let history=useHistory();
  const [rows, setRows] = React.useState([]);
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  const [page, setPage] = React.useState(0);
  const [isLoad,setIsLoad]=React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState({
    searchText: "",
  });
  React.useEffect( ()=>{
     CallAPI('get_all_user', 'GET', null).then(res =>{
      setRows(res.data.user);
      setIsLoad(false);
      console.log('12345');
    }).catch(error=>{
      throw(error)
    })
  }, [])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSetFilter = (newFilter) => {
    setFilter(newFilter)
    setPage(0);
  };

  const filterList = (newFilter) => {
    const textSearchRows = rows.filter(row => { 
      return row.TenTaiKhoan.toLowerCase().includes(newFilter.searchText.toLowerCase()) ||
        row.Email.toLowerCase().includes(newFilter.searchText.toLowerCase()) 
    })

    return textSearchRows;
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const actualRows = filterList(filter);
  return (
    <div className={classes.root}>
      <Progress isOpen={isLoad} />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar area = {props.area} onSetFilter={handleSetFilter} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(actualRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${row.MaNV}`;
                  return (
                    <TableRow
                      key={index}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.MaTK}
                      </TableCell>
                      <TableCell align="left">{row.TenTaiKhoan}</TableCell>
                      <TableCell align="left">{row.Email}</TableCell>                     
                      <TableCell align="left">{row.TrangThai.toString() === '1' ? 'Active' : 'Block' }</TableCell>
                      <TableCell>
                      <Link to = {`/user-profile-lite/${row.MaTK}`} style = {{textDecoration: "none"}}>
                          <IconButton className={classes.editbtn}><VisibilityIcon /></IconButton>
                      </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

    </div>
  );
}
