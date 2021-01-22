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
import { set } from 'react-ga';
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
export default function AddRoom() {
  let history = useHistory();
  const classes = useStyles();

  const [error,setError]=React.useState(false)
  const [success,setSuccess]=React.useState(false)
  const [totalOrder,setTotalOrder]=React.useState(0);
  const [phieuDatPhong,setPhieuDatPhong]=React.useState([])
  const [HinhThucTT,setHinhThucTT]=React.useState('')
  const [MaPDP,setMaPDP]=React.useState('')
  const typePay = [{title : 'tiền mặt'},{title:'ví điện tử'}]
  const handleSubmit = (e)=>{
    e.preventDefault()
    callAPI(`createOrder`, 'POST',{'totalOrder' : totalOrder,'HinhThucTT' : HinhThucTT,'MaPDP' : MaPDP,'MaNV' : localStorage.getItem('MaNV')}).then(res =>{
      console.log('Oke')
      setSuccess(true)
    }).catch(error=>{
      console.log(error)
      setError(true)
    })
  }
  React.useEffect(()=>{
    callAPI('phieudatphong','GET',null).then(res=>{
      console.log(res.data)
      let arr = []
      res.data.forEach(element => {
        let temp={}
        temp['MaPDP']='Ma Phieu Dat Phong: ' + element.MaPDP + ' | Ma Khach Hang: ' +element.HoTen
        arr.push(temp)
      });
      console.log(arr)
      setPhieuDatPhong(arr)
    }).catch(error)
    {
      console.log(error)
    }
  },[])
  const handleChangeCbb = (event,value,type)=>{
    if(type===1)
    {
      console.log(value.title)
      setHinhThucTT(value.title)
    }
    else 
    {
      setMaPDP(value.MaPDP.split(' ')[4])
    }
  }
  const handleChangeInPut = (e)=>{
    setTotalOrder(e.target.value)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Thêm hóa đơn
        </Typography>
        <Typography component="h1" variant="h5" className={error ? "":classes.displaycls}>
          Thêm Hóa đơn thất bại
        </Typography>
        <Typography component="h1" variant="h5" className={success ? "":classes.displaycls}>
          Thêm hóa đơn thành công
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Autocomplete
            id="combo-box-demo"
            options={typePay}
            getOptionLabel={(option) => option.title}
            style={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Hình thức thanh toán" variant="outlined" />}
            required
            onChange={(event,value)=>handleChangeCbb(event,value,1)}
            />
            <Autocomplete
            id="combo-box-demo"
            options={phieuDatPhong}
            getOptionLabel={(option) => option.MaPDP}
            style={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Phiếu đặt phòng" variant="outlined" />}
            required
            onChange={(event,value)=>handleChangeCbb(event,value,2)}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Total"
            label="Total"
            name="Total"
            type = "Number"
            InputProps={{ inputProps: { min: 0 } }}
            autoFocus
            onChange={(e)=>handleChangeInPut(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}