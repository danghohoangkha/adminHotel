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
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
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
  let history = useHistory();
  let [dataRoom,setDataRoom]=React.useState([])
  const classes = useStyles();
  const [TrangThai,setTrangThai]=React.useState('')
  const [LoaiP,setLoaiP] = React.useState('')
  const [GiaThue,setGiaThue]=React.useState('')
  const [KhuyenMai,setKhuyenMai]=React.useState('')
  const [SoNguoiToiDa,setSoNguoiToiDa]=React.useState(1)
  const [MoTa,setMoTa]=React.useState('')
  const [error,setError]=React.useState(false)
  const [success,setSuccess]=React.useState(false)
  const typeRoom = [{title : 'đôisang'},{title:'đôithường'},{title:'đơnsang'},{title:'đơnthường'}]
  const handleSubmit = (e)=>{
    e.preventDefault()
    callAPI(`updateRoom/${location.match.params.id}`, 'POST',{'LoaiP':LoaiP,'GiaThue':GiaThue,'KhuyenMai':KhuyenMai,'SoNguoiToiDa':SoNguoiToiDa,'MoTa':MoTa,'TrangThai':TrangThai}).then(res =>{
        console.log('Vao day roi ne')
        window.location.reload()
        setSuccess(true);
    }).catch(error=>{
      console.log(error)
      setError(true);
    })
  }
  React.useEffect(()=>{
    callAPI(`getRoom/${location.match.params.id}`,'GET',null).then(res=>{
        setDataRoom(res.data[0])
        setLoaiP(res.data[0].LoaiP)
        setGiaThue(res.data[0].GiaThue)
        setKhuyenMai(res.data[0].KhuyenMai)
        setSoNguoiToiDa(res.data[0].SoNguoiToiDa)
        setMoTa(res.data[0].MoTa)
        setTrangThai(res.data[0].TrangThai)
    }).catch(error=>{
        console.log(error)  
    })
  },[])
  const handleChangeCbb = (event,value,type)=>{
    console.log(event)
    if(type===1)
    {
      setLoaiP(value.title)
    }
    else{
      setTrangThai(value.value)
    }
    
  }
  const deleteRoom = ()=>{
    callAPI(`deleteRoom/${location.match.params.id}`,'POST',null).then(res=>{
      history.push('/room-management')
    }).catch(error)
    {
      console.log(error)
    }
  }
  const handleChangeInPut = (e,type)=>{
      if(type===4)
      {
          setMoTa(e.target.value)
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
          Chỉnh sửa phòng
        </Typography>
        <Typography component="h1" variant="h5" className={success ? "":classes.displaycls}>
          Chỉnh sửa phòng thành công
        </Typography>
        <Typography component="h1" variant="h5" className={error ? "":classes.displaycls}>
          Chỉnh sửa phòng thất bại
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <h5>Loại phòng</h5>
            <Autocomplete
            id="combo-box-demo"
            options={typeRoom}
            getOptionLabel={(option) => option.title}
            style={{ width: 400,marginBottom:15 }}
            renderInput={(params) => <TextField {...params} label={dataRoom.LoaiP} variant="outlined" />}
            onChange={(event, newValue) => handleChangeCbb(event,newValue,1)}
            required
            />
            <h5>Giá thuê</h5>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="GiaThue"
            label={dataRoom.GiaThue}
            name="GiaThue"
            
            autoFocus
            onChange={(e)=>handleChangeInPut(e,1)}
          />
            <h5>Khuyến mãi</h5>
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="KhuyenMai"
            label={dataRoom.KhuyenMai}
            name="KhuyenMai"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,2)}
          />
          <h5>Số người tối đa</h5>
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="SoNguoiToiDa"
            label={dataRoom.SoNguoiToiDa}
            name="SoNguoiToiDa"
            type = "Number" 
            InputProps={{ inputProps: { min: 1, max: 4 } }}
            autoFocus
            onChange={(e)=>handleChangeInPut(e,3)}
          />
          <h5>Mô tả</h5>
           {/* <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="MoTa"
            label={dataRoom.MoTa}
            name="MoTa"
            autoFocus
            onChange={(e)=>handleChangeInPut(e,4)}
          /> */}
          <TextareaAutosize aria-label="empty textarea" rowsMin={3} placeholder={dataRoom.MoTa} onChange={(e)=>handleChangeInPut(e,4)}/>
          <h5>Trạng thái phòng</h5>
          <Autocomplete
            id="combo-box-demo"
            options={[{title:'Sẵn sàng',value : 1},{title:'Đang thuê',value:2},{title:'Đang sữa chữa',value:3}]}
            getOptionLabel={(option) => option.title}
            style={{ width: 400,marginBottom:15 }}
            renderInput={(params) => <TextField {...params} label={dataRoom.length === 0 ? '' :dataRoom.TrangThai.toString() === '3' ? 'Đang sữa chữa' : dataRoom.TrangThai.toString()==='2' ? 'Đang cho thuê' : 'Sẵn sàng'} variant="outlined" />}
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
            Edit
          </Button>
        </form>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {deleteRoom}
        >
            Xóa phòng
        </Button>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}