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
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
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
  const [LoaiP,setLoaiP] = React.useState('')
  const [GiaThue,setGiaThue]=React.useState('')
  const [KhuyenMai,setKhuyenMai]=React.useState('')
  const [SoNguoiToiDa,setSoNguoiToiDa]=React.useState(1)
  const [MoTa,setMoTa]=React.useState('')
  const [TenP,setTenP]=React.useState('')
  const [error,setError]=React.useState(false)
  const [success,setSuccess]=React.useState(false)
  const typeRoom = [{title : 'đôisang'},{title:'đôithường'},{title:'đơnsang'},{title:'đơnthường'}]
  const handleSubmit = (e)=>{
    e.preventDefault()
    callAPI(`addRoom`, 'POST',{'TenP':TenP,'LoaiP':LoaiP,'GiaThue':GiaThue,'KhuyenMai':KhuyenMai,'SoNguoiToiDa':SoNguoiToiDa,'MoTa':MoTa}).then(res =>{
        setSuccess(true)
    }).catch(error=>{
      console.log(error)
      setError(true)
    })
  }

  const handleChangeCbb = (value)=>{
    setLoaiP(value.title)
  }
  const handleChangeInPut = (e,type)=>{
      if(type===4)
      {
          setMoTa(e.target.value)
      }
      else if(type===0)
      {
        setTenP(e.target.value)
      }
      else if(type===1)
      {
          setGiaThue(e.target.value)
      }
      else if(type===2)
      {
          setKhuyenMai(e.target.value)
      }
      else
      {
          setSoNguoiToiDa(e.target.value)
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
          Thêm phòng thất bại
        </Typography>
        <Typography component="h1" variant="h5" className={success ? "":classes.displaycls}>
          Thêm phòng thành công
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <Autocomplete
            id="combo-box-demo"
            options={typeRoom}
            getOptionLabel={(option) => option.title}
            style={{ width: 400 }}
            renderInput={(params) => <TextField {...params} label="Loại phòng" variant="outlined" />}
            onChange={(event, newValue) => handleChangeCbb(newValue)}
            required
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Ten phong"
            label="Ten phong"
            name="TenPhong"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,0)}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="GiaThue"
            label="GiaThue"
            name="GiaThue"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,1)}
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="KhuyenMai"
            label="KhuyenMai"
            name="KhuyenMai"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,2)}
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="SoNguoiToiDa"
            label="SoNguoiToiDa"
            name="SoNguoiToiDa"
            type = "Number" 
            InputProps={{ inputProps: { min: 1, max: 4 } }}
            autoFocus
            onChange={(e)=>handleChangeInPut(e,3)}
          />
           {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="MoTa"
            label="MoTa"
            name="MoTa"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,4)}
          /> */}
           <TextareaAutosize aria-label="empty textarea" rowsMin={3} placeholder='Mô tả ' onChange={(e)=>handleChangeInPut(e,4)}/>
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