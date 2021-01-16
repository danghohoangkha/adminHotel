import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout,loginLayout } from "./layouts";
// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/userDetail";
import ChatManage from "./views/chatManage";
import ComponentsOverview from "./views/ComponentsOverview";
import EmployeeTable from "./views/employeeManagement";
import UserTable from "./views/userManagement";
import SignIn from './views/login';
import matchManage from './views/roomManagement';
import MatchUser from './views/matchOfUser';
import AddRoom from './views/addRoom';
import Room from './views/roomDetail';
import Employee from './views/Employee';
import CreateOrder from './views/CreateOrder';
// import { NotificationsNone } from "@material-ui/icons";
export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/user-management"/>
  },
  {
    path: "/login",
    exact: true,
    layout:loginLayout,
    component: SignIn
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/Room/:id",
    layout: DefaultLayout,
    component: (location)=><Room location={location}/>
  },
  {
    path: "/user-profile-lite/:id",
    layout: DefaultLayout,
    component: (location)=><UserProfileLite location={location}/>
  },
  {
    path: "/room-management",
    layout: DefaultLayout,
    component: matchManage
  },
  {
    path: "/employee-profile-lite/:id",
    layout: DefaultLayout,
    component: (location)=><Employee location={location}/>
  },
  {
    path: "/AddRoom",
    layout: DefaultLayout,
    component: AddRoom
  },
  {
    path: "/chat_match/:id",
    layout: DefaultLayout,
    component: (location)=><ChatManage location={location}/>
  },
  {
    path : "/match-of-user/:id",
    layout: DefaultLayout,
    component: (location)=><MatchUser location = {location}/>
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/user-management",
    layout: DefaultLayout,
    component: UserTable
  },
  {
    path: "/employee-management",
    layout: DefaultLayout,
    component: EmployeeTable
  },
  {
   path: "/createOrder",
   layout : DefaultLayout,
   component :  CreateOrder
  }
];
