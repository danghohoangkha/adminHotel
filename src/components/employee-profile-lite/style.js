import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    chatMess:{
        marginTop:'5rem'
    },
    inlineChat:{
        display:"inline"
    },
    hidecls:{
        display:"none"
    },
    selectRoot: {
        height: 40,
        display: "table"
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
      },
      select: {
        height: 40,
        paddingTop: 0,
        paddingBottom: 0,
        display: "table-cell",
        verticalAlign: "middle"
      },
      input:{
          height:40
      },
      deleteBtn:{
          marginTop:'20px'
      }
}));

export default useStyles;