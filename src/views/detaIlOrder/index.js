import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import callAPI from '../../utils/callAPI';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import Input from '@material-ui/core/Input';
// import Select from '@material-ui/core/Select';
import {useLoginContext} from '../../context/context'
import { Label } from '@material-ui/icons';
import { FormLabel } from '@material-ui/core';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  displaycls:{
    display:"none"
  },
}));
export default function DetailRoom({location}) {
  const classes = useStyles();
  const [dataOrder,setDataOrder]=React.useState([])
  
  React.useEffect(()=>{
    callAPI(`getDetailOrder/${location.match.params.id}`,'GET',null).then(res=>{
      console.log(res.data[0])
      setDataOrder(res.data[0])
    }).catch(error=>{
      throw(error)
    })
  },[])
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      
        <form className={classes.form} noValidate >
            <h5>Mã HD</h5>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="MaHD"
            value={dataOrder.length ===0 ? '' :dataOrder.MaHD}
            name="MaHD"           
            autoFocus
           
          />
            <h5>NgayTao</h5>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="NgayTao"
            value={dataOrder.length ===0 ? '' :dataOrder.NgayTao}
            name="NgayTao"           
            autoFocus          
          />
            <h5>HinhThucTT</h5>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="HinhThucTT"
            value={dataOrder.length ===0 ? '' :dataOrder.HinhThucTT}
            name="HinhThucTT"
            autoFocus
            
          />
          <h5>TongTienThu</h5>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="TongTienThu"
            value={dataOrder.length ===0 ? '' :dataOrder.TongTienThu}
            name="TongTienThu"
            type = "Number" 
            autoFocus          
          />
          <h5>Ma phieu dat phong</h5>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="MaPDP"
            value={dataOrder.length ===0 ? '' :dataOrder.MaPDP}
            name="MaPDP"
            autoFocus

          />
            <h5>Ma nhan vien</h5>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="MaPDP"
            value={dataOrder.length ===0 ? '' :dataOrder.MaNV}
            name="MaPDP"
            autoFocus

          />
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}