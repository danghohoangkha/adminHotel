import React from "react";
import Button from '@material-ui/core/Button';
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
import callAPI from '../../utils/callAPI'

export default function UserAccountDetails ({ data })  {
  const classes=useStyles()
  const [HoTen,setHoTen]=React.useState('')
  const [GioiTinh,setGioiTinh]=React.useState('')
  const [DiaChi,setDiaChi]=React.useState('')
  const [LuongCoBan,setLuongCoBan]=React.useState('')
  const [LuongTangCa,setLuongTangCa]=React.useState('')
  const [ChucVu,setChucVu] = React.useState(1) 
  const [error,setError]=React.useState(false);
  React.useEffect(()=>{
    if(data.length!==0)
    {
      setHoTen(data[0].HoTen);
      setGioiTinh(data[0].GioiTinh)
      setDiaChi(data[0].DiaChi)
      setLuongCoBan(data[0].LuongCoBan)
      setLuongTangCa(data[0].LuongTangCa)
      setChucVu(data[0].ChucVu)
    }
  },[data])
  const handleSubmit = (e)=>{
    e.preventDefault()
    callAPI(`change_employee/${data[0].MaNV}`, 'POST',{'HoTen':HoTen,'GioiTinh':GioiTinh,'DiaChi':DiaChi,'LuongCoBan':LuongCoBan,'LuongTangCa':LuongTangCa,'ChucVu':ChucVu}).then(res =>{
    }).catch(error=>{
      console.log(error)
      setError(true)
    })
  }
  const handleChangeInput = (e,type) => {
    if(type===1)
    {
      setHoTen(e.target.value)
    }
    else if(type===2)
    {
      setGioiTinh(e.target.value)
    }
    else if(type===3)
    {
      setDiaChi(e.target.value)
    }
    else if(type===4)
    {
      setLuongCoBan(e.target.value)
    }
    else if(type===5)
    {
      setLuongTangCa(e.target.value)
    }
    else if(type===6)
    {
      setChucVu(e.target.value)
    }
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
          
            <Form onSubmit ={handleSubmit} >
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">Ho Ten</label>
                  <FormInput
                    id="feFirstName"
                    placeholder={data.length===0?'':data[0].HoTen}
                    onChange={(e) => {handleChangeInput(e,1)}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Gioi Tinh</label>
                  <FormInput
                    id="feFirstName"
                    placeholder={data.length===0?'':data[0].GioiTinh}
                    onChange={(e) => {handleChangeInput(e,2)}}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Địa Chi</label>
                  <FormInput
                    id="feFirstName"
                    placeholder={data.length===0?'':data[0].DiaChi}
                    onChange={(e) => {handleChangeInput(e,3)}}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Lương cơ bản</label>
                  <FormInput
                    id="feFirstName"
                    placeholder={data.length===0?'':data[0].LuongCoBan}
                    onChange={(e) => {handleChangeInput(e,4)}}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Lương tăng ca</label>
                  <FormInput
                    id="feFirstName"
                    placeholder={data.length===0?'':data[0].LuongTangCa}
                    onChange={(e) => {handleChangeInput(e,5)}}
                  />
                </Col>
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Chức vụ</label>
                  <FormInput
                    id="feLastName"
                    placeholder=""
                    value={data.length===0?'':data[0].ChucVu === 1 ? 'Quản lí' : data[0].ChucVu === 2 ? 'Nhân viên kế toán': 'Nhân viên lễ tân'}
                    onChange={(e) => {handleChangeInput(e,6)}}
                    disable
                  />
                </Col>
              </Row>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Change
              </Button>
              <Row form>
                {/* Email */}
                {/* Password */}
              </Row>
            </Form>
            {/* data.length===0? '' : data[0].roleId === '2' ? classes.hidecls : '' */}
              {/* <FormControlLabel
                control={<Switch checked={active} onChange={changeStateAcc}/>}
                label="Active"
              /> */}
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


