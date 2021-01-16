import React from "react";
import { Container } from "shards-react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import callAPI from '../../utils/callAPI'
import useStyles from "./style";
import {useHistory} from 'react-router-dom'
import {useLoginContext} from '../../context/context'
export default function Errors({location}) {
  let history = useHistory()
  const classes = useStyles()
  const [dataChat,setDataChat]=React.useState([])
  let [isLogin]=useLoginContext()
  if(isLogin===false)
  {
    history.push('/login')
  }
  React.useEffect(()=>{
    callAPI(`getChatUser/${location.match.params.id}`, 'GET', null).then(res =>{
      // setDataChat(res.data.content)
      if(res.data.length!==0 && res.data[0].content!=="undefined")
      {
        console.log("Kha dep trai ne")
        setDataChat(JSON.parse(res.data[0].content))
      }
    })
  },[])
  return(
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <ul>
      {dataChat&&dataChat.map((item)=>{
        return(
          <li className={classes.chatMess}>
            <div>
                    <div className={classes.inlineChat}>
                    <AccountCircleIcon/>
                    <h5 className={classes.inlineChat}>  {item.fullName} : {item.message}</h5>
                    </div>
            </div>
          </li>
        )})}
      </ul>
      <div className={dataChat.length!==0?classes.hidecls:''}>
        <h2>Empty Message</h2>
      </div>
    </div>
  </Container>
  );
};

// export default Errors;
