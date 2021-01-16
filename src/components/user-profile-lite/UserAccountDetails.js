import React from "react";
// import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  // FormGroup,
  FormInput,
  // FormSelect,
  // FormTextarea,
  // Button
} from "shards-react";
import CallAPI from '../../utils/callAPI'
import {FormGroup,FormControlLabel,Switch} from '@material-ui/core';
import useStyles from './style'

export default function UserAccountDetails ({ data })  {
  const classes=useStyles()
  const [active,setActive]= React.useState(true);
  React.useEffect(()=>{
    if(data.length!==0){
      console.log(data[0])
      setActive(data[0].TrangThai.toString()==='1'? true: false);
    }
  },[data])
  const changeStateAcc = ()=>{
    setActive(!active);
    CallAPI(`change_state_user/${data[0].MaTK}`,'POST',{active:!active}).then(res =>{
      console.log('Oke')
    }).catch(error=>
    {
      throw(error)
    })
  }
  return (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{'Account Details'}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">Ten Tai Khoan</label>
                  <FormInput
                    id="feFirstName"
                    placeholder=""
                    value={data.length===0?'':data[0].TenTaiKhoan}
                    onChange={() => {}}
                    disabled 
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Email</label>
                  <FormInput
                    id="feLastName"
                    placeholder=""
                    value={data.length===0?'':data[0].Email}
                    onChange={() => {}}
                    disabled 
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                {/* Password */}
              </Row>
            </Form>
            {/* data.length===0? '' : data[0].roleId === '2' ? classes.hidecls : '' */}
              <FormControlLabel
                control={<Switch checked={active} onChange={changeStateAcc}/>}
                label="Active"
              />
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
  )
};

// UserAccountDetails.propTypes = {
//   /**
//    * The component's title.
//    */
//   title: PropTypes.string
// };

// UserAccountDetails.defaultProps = {
//   title: "Account Details"
// };


