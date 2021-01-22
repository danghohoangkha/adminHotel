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
  const [HoTen,setHoTen] = React.useState('')
  const [GioiTinh,setGioiTinh]=React.useState('')
  const [NgaySinh,setNgaySinh]=React.useState('1991-01-01')
  const [DiaChi,setDiaChi]=React.useState(1)
  const [LuongCoBan,setLuongCoBan]=React.useState('')
  const [LuongTangCa,setLuongTangCa]=React.useState(false)
  const [ChucVu,setChucVu]=React.useState(false)
  const [userName,setUserName]=React.useState('')
  const [passWord,setPassWord]=React.useState('')
  const [error,setError]=React.useState('')
  const male = [{title : 'nam'},{title:'nữ'}]
  const chucVu = [{title: 'kế toán',value : '2'},{title:'lễ tân',value: '3'}]
  const handleSubmit = (e)=>{
    e.preventDefault()
    callAPI(`AddEmployee`, 'POST',{'HoTen':HoTen,'GioiTinh':GioiTinh,'NgaySinh':NgaySinh,'DiaChi':DiaChi,'LuongCoBan':LuongCoBan,'LuongTangCa':LuongTangCa,'userName':userName,'passWord':passWord,'ChucVu':ChucVu}).then(res =>{
        console.log('Vao day roi ne')
        history.push('/employee-management')
    }).catch(error=>{
      console.log(error)
      setError(true)
    })
  }
  const handleChangeCbb = (event,value,type)=>{
    console.log(event)
    if(type===1)
    {
        setGioiTinh(value.title)
    }
    else 
    {
        setChucVu(value.value)
    }
  }
  const handleChangeInPut = (e,type)=>{
     if(type===1)
      {
         setHoTen(e.target.value)
      }
      else if(type===2)
      {
        setNgaySinh(e.target.value)
      }
      else if(type===3)
      {
        setDiaChi(e.target.value)
      }
      else if(type===4)
      {
        setLuongCoBan(e.target.value)
      }
      else if(type===5)
      {
        setLuongTangCa(e.target.value)
      }
      else if(type===6)
      {
        setUserName(e.target.value)
      }
      else if(type===7)
      {
        console.log(e.target.value)
        setPassWord(e.target.value)
      }

  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Thêm phòng
        </Typography>
        <Typography component="h1" variant="h5" className={error ? "":classes.displaycls}>
          Thêm nhân viên thất bại
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="HoTen"
            label="HoTen"
            name="HoTen"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,1)}
          />
            <Autocomplete
            id="combo-box-demo"
            options={male}
            getOptionLabel={(option) => option.title}
            style={{ width: 395 }}
            renderInput={(params) => <TextField {...params} label="GioiTinh" variant="outlined" />}
            onChange={(event, newValue,type) => handleChangeCbb(event,newValue,1)}
            required
            />
            <TextField
            id="date"
            label="NgaySinh"
            type="date"
            defaultValue="1991-01-01"
            className={classes.textField ,classes.distanceBtn}
            onChange={(event)=>handleChangeInPut(event,2)}
            InputLabelProps={{
            shrink: true,
            }}
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="DiaChi"
            label="DiaChi"
            name="DiaChi"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,3)}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="LuongCoBan"
            label="LuongCoBan"
            name="LuongCoBan"
            type = "Number" 
            InputProps={{ inputProps: { min: 0} }}
            autoFocus
            onChange={(e)=>handleChangeInPut(e,4)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="LuongTangCa"
            label="LuongTangCa"
            name="LuongTangCa"
            type = "Number" 
            InputProps={{ inputProps: { min: 0} }}
            autoFocus
            onChange={(e)=>handleChangeInPut(e,5)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="UserName"
            label="UserName"
            name="UserName"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,6)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="PassWord"
            label="PassWord"
            name="PassWord"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,7)}
          />
            <Autocomplete
            id="combo-box-demo"
            options={chucVu}
            getOptionLabel={(option) => option.title}
            style={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="ChucVu" variant="outlined" />}
            onChange={(event, newValue) => handleChangeCbb(event,newValue,2)}
            required
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