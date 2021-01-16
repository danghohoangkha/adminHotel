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

import EnhancedTableHead from '../matchManagement/EnhanceTableHead'
import EnhancedTableToolbar from '../matchOfUser/EnhanceTableToolbar.js'
import { convertDateToString } from '../../services/date'
import {stableSort, getComparator} from './services'
import Progress from '../../components/Progress'
import useStyles from './styles'
import CallAPI from '../../utils/callAPI'

export default function matchUser({location}) {
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
  let [isLogin]=useLoginContext()
  console.log(isLogin)
  if(isLogin===false)
  {
    history.push('/login')
  }
  React.useEffect(()=>{
    CallAPI(`getAllMatchOfUser/${location.match.id}`, 'GET', null).then(res =>{
      setRows(res.data);
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
      return row.name.toLowerCase().includes(newFilter.searchText.toLowerCase()) ||
        row.author.toLowerCase().includes(newFilter.searchText.toLowerCase()) 
    })

    return textSearchRows;
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const actualRows = filterList(filter);
  return (
    <div className={classes.root}>
      <Progress isOpen={isLoad} />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar area = {location.area} onSetFilter={handleSetFilter} />
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
                  const labelId = `enhanced-table-checkbox-${row.id}`;

                  return (
                    <TableRow
                      key={index}
                    >
                      {/* convertDateToString(row.date) */}
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.player1}</TableCell>
                      <TableCell align="left">{row.player2}</TableCell>
                      <TableCell align="left">{row.winner}</TableCell>
                      <TableCell align="left">{convertDateToString(row.createdDate)}</TableCell>
                      <TableCell align="left">{row.status.toString() === 1 ? 'Đã hoàn thành':'Chưa hoàn thành'}</TableCell>
                      <TableCell align="left">{row.password}</TableCell>
                      <TableCell>
                        <Link to = {'/'} style = {{textDecoration: "none"}}>
                            <IconButton className={classes.editbtn}><VisibilityIcon /></IconButton>
                        </Link>
                      </TableCell>
                      {/* <TableCell className={classes.Test1}>
                      <Link to = {'/app/news/crud'} style = {{textDecoration: "none"}}>
                          <IconButton className={classes.editbtn}><CreateIcon /></IconButton>
                      </Link>
                      <Link to = {'/app/news/crud'} style = {{textDecoration: "none"}}>
                      <IconButton className={classes.viewbtn}><VisibilityIcon /></IconButton>
                      </Link>
                      </TableCell> */}
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
