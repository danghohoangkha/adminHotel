import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import callAPI from '../../utils/callAPI';
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
export default function SignIn() {
  let history = useHistory();
  const classes = useStyles();
  const [email,setEmail] = React.useState('')
  const [password,setPassWord]=React.useState('')
  const [error,setError]=React.useState(false)
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(email)
    console.log(password)
    callAPI(`login`, 'POST',{'email':email,'password':password}).then(res =>{
      console.log('login success')
      localStorage.setItem('token',res.data.token)
      localStorage.setItem('fullName',res.data.user[0].fullName)
      localStorage.setItem('MaNV',res.data.user[0].MaNV)
      localStorage.setItem('ChucVu',res.data.user[0].ChucVu)
      console.log(localStorage.getItem('ChucVu'))
      setError(false)
      if(res.data.user[0].ChucVu.toString()==='1')
        {
          history.push('/')
        }
        else if(res.data.user[0].ChucVu.toString()==='2')
        {
          history.push('/ThongKe')
        }
        else{
          history.push('/createOrder')
        }
    }).catch(error=>{
      console.log(error)
      setError(true)
    })
  }
  const handleChangeEmail=(e)=>{
    setEmail(e.target.value)
  }
  const hangleChangePassword=(e)=>{
    setPassWord(e.target.value)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography component="h1" variant="h5" className={error ? "":classes.displaycls}>
          Đăng nhập thất bại
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>handleChangeEmail(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>hangleChangePassword(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}