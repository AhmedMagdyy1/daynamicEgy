import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik'
import axios from 'axios';
import { userContext } from '../Context/UserContext';


export default function User({contacts,deleteUser,getContacts}) {
  const {authHeader} = useContext(userContext)
    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    console.log(contacts);
    let {email,first_name,id,last_name,phone} = contacts


    // Function to handle user Edit not working -_-
   async function handleEdit({id,values}){
     let {data} =  await axios.put(`http://62.171.166.157:5050/api/contact/${id}/`,values,{
        headers:{
            'Authorization':authHeader,
            'Content-Type': 'application/json'
           },
     })
        console.log(data);
        getContacts()
    }

    let formik = useFormik({
        initialValues:{
        email,
        first_name,
        last_name,
        phone,
      },
      onSubmit:handleEdit
      })
  return (
    <>
    <div className="col-md-4">
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>User id : {id}</Card.Title>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>First Name : {first_name}</ListGroup.Item>
      <ListGroup.Item>Last Name : {last_name}</ListGroup.Item>
      <ListGroup.Item>Email : {email}</ListGroup.Item>
      <ListGroup.Item>Phone Number :{phone}</ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <div className='d-flex justify-content-between'>
        <button className='btn btn-warning' onClick={handleShow}>Update User</button>
        <button className='btn btn-danger' onClick={()=>deleteUser(id)}>Delete User</button>
      </div>
    </Card.Body>
  </Card>
  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-center px-5">
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              id="first_name"
              onChange={formik.handleChange}
              defaultValue= {formik.values.first_name}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              id="last_name"
              onChange={formik.handleChange}
              defaultValue= {formik.values.last_name}

            />
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              name="phone_number"
              id="phone_number"
              onChange={formik.handleChange}
              defaultValue= {formik.values.phone}

            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              defaultValue= {formik.values.email}

            />           
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" onClick={()=>{formik.handleSubmit();handleClose()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  )
}
