import React from "react";
// import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import {Link} from 'react-router-dom'
export default function UserDetails({ data }) {
  const [linkToMatch,setLinkToMatch]=React.useState("")

  React.useEffect(()=>{
    if(data.length!==0){
      setLinkToMatch("/match-of-user/"+data[0].id)
    }
  },[data])
  return(
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          // src={data.avatar}
          // alt={data.name}
          src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/512px-User_font_awesome.svg.png"}
          alt="User"
          width="110"
        />
      </div>
      <h4 className="mb-0">{data.length===0?'default':data[0].TenTaiKhoan}</h4>
      {/* <span className="text-muted d-block mb-2">{userDetails.jobTitle}</span> */}
      {/* <Button pill outline size="sm" className="mb-2">
        <i className="material-icons mr-1">person_add</i> Follow
      </Button> */}
    </CardHeader>
  </Card>
  );
};

// UserDetails.propTypes = {
//   /**
//    * The user details object.
//    */
//   userDetails: PropTypes.object
// };

// UserDetails.defaultProps = {
//   userDetails: {
//     name: "Sierra Brooks",
//     avatar: require("./../../images/avatars/0.jpg"),
//     jobTitle: "Project Manager",
//     performanceReportTitle: "winRate",
//     performanceReportValue: 60,
//     metaTitle: "Description",
//   }
// };

// export default UserDetails;
