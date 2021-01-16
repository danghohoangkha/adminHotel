import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    success: {
        backgroundColor: theme.palette.success.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
        },
    },
    warning: {
        backgroundColor: theme.palette.warning.main,
        color: '#fff',
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
        },
    },
    editbtn:{
        minWidth: '40px',
        width: '20%',
        display:'inline',
        backgroundColor: theme.palette.success.main,
        borderRadius : '0%',
        paddingTop:'8px',
        paddingBottom:'8px',
        marginRight : '4px',
        color:'white',
        '&:hover': {
            backgroundColor: theme.palette.success.dark,
          },
    },
    Test1:{
        padding: '0px'
    },
    viewbtn:{
        minWidth: '40px',
        width: '20%',
        paddingTop:'8px',
        paddingBottom:'8px',
        display:'inline',
        borderRadius : '0%',
        backgroundColor: theme.palette.warning.main,
        '&:hover': {
            backgroundColor: theme.palette.warning.dark,
          },
        color:'white'
    }
}));

export default useStyles;