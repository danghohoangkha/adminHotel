import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import UserDetails from "../../components/employee-profile-lite/UserDetails";
import UserAccountDetails from "../../components/employee-profile-lite/UserAccountDetails";
import callAPI from '../../utils/callAPI';
import {useHistory} from 'react-router-dom'
export default function UserProfileLite ({location}) {
  let history = useHistory();
  const [dataUser,setDataUser]= React.useState([]);
  React.useEffect(()=>{
    callAPI(`get_employee/${location.match.params.id}`, 'GET', null).then(res =>{
      setDataUser(res.data);
    }).catch(error=>{
      throw(error)
    })
  }, [])
  return(
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="4">
        <UserDetails data={dataUser}/>
      </Col>
      <Col lg="8">
        <UserAccountDetails data={dataUser}/>
      </Col>
    </Row>
  </Container>
  )
};

