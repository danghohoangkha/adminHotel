import React from "react";
// import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import {useHistory} from 'react-router-dom';
export default function UserActions ({fullName}) {
  let hiatory = useHistory();
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     visible: false
  //   };

  //   this.toggleUserActions = this.toggleUserActions.bind(this);
  // }
  const [visible,setVisible]=React.useState();
  const onLogout = ()=>{
    localStorage.setItem("token","")
    localStorage.setItem('ChucVu','')
    hiatory.push('/login')
  }
  const toggleUserActions =()=> {
    setVisible(!visible)
  }
    return (
      <NavItem tag={Dropdown} caret toggle={()=>toggleUserActions()}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            // src={require("./../../../../images/avatars/0.jpg")}
            src={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/512px-User_font_awesome.svg.png"}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{fullName}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={visible}>
          {/* <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider /> */}
          <DropdownItem className="text-danger">
            <button onClick = {onLogout}>
              <i className="material-icons text-danger">&#xE879;</i> Logout
            </button>
            {/* <i className="material-icons text-danger">&#xE879;</i> Logout */}
          </DropdownItem>
          {/* <DropdownItem className="text-danger">
            <button className="material-icons text-danger">&#xE879;</button> Logout
          </DropdownItem> */}
        </Collapse>
      </NavItem>
    );
}
