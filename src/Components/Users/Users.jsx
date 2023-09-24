import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import User from '../User/User';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik'
import Pagination from 'react-bootstrap/Pagination';
import Swal from 'sweetalert2';
import { userContext } from '../Context/UserContext';


function Users() {
    // Access the authentication header from the userContext
  const {authHeader} = useContext(userContext)

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [users, setUsers] = useState([])
    // State for managing pagination
    const [paginationData, setPaginationData] = useState({
      next: null,
      previous: null,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 18;


    // Generate pagination items
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
    }

      // Function to fetch user data based on the current page
    async function getContacts(pageNumber){
      setIsLoading(true)
      let {data} = await axios.get(`http://62.171.166.157:5050/api/contact/?page=${pageNumber}&page_size=${pageSize}`,{
        headers:{
          'Authorization':authHeader
      }})
      console.log(data);
      if(data){
        setIsLoading(false)
        setUsers(data.results)
      setPaginationData({
        next: data.links.next,
        previous: data.links.previous,
      })
      }
    }

    const handleNext = () => {
      if (paginationData.next) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevious = () => {
      if (paginationData.previous) {
        setCurrentPage(currentPage - 1);
      }
    };
   


      // Function to delete a user
    async function deleteUser(id){
      Swal.fire({
        title: `Are you sure to delete user id ${id}?`,
        text: "You won't be able to revert this user!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          (async()=>{
            await axios.delete(`http://62.171.166.157:5050/api/contact/${id}/`,{
        headers:{
          'Authorization':authHeader
      }})
      getContacts(currentPage)
          })()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      
    }
    

      // Function to handle adding a new user
   async function handleAdd(values){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'A new user has been added successfully',
      showConfirmButton: false,
      timer: 1500
    })
    let {data} = await axios.post('http://62.171.166.157:5050/api/contact/',values,{
      headers:{
        'Authorization':authHeader
    }
    })
    console.log(data);
    getContacts(currentPage)
   }

    let formik = useFormik({
      initialValues:{
      "email": "",
      "first_name": "",
      "last_name": "",
      "phone": "",
      "password": ""
    },
    onSubmit:handleAdd
    })

      // Fetch user data when the component mounts or currentPage changes
  useEffect(() => {
    getContacts(currentPage)
  },[currentPage])
  
  return (
    <>
    {isLoading === true ? <div className='d-flex vh-100 justify-content-center align-items-center fs-1'><i className="fa-solid fa-spinner fa-spin"></i></div> :
    <div className="container">
    <div className="row gy-3 mt-5">
      <div className='d-flex justify-content-end'>
        <button className='btn btn-primary'onClick={handleShow}>Add User</button>
      </div>
    {users.map((user,index)=>{return <User getContacts={getContacts} contacts={user} deleteUser={deleteUser} key={index}/>})}
    </div>
    <div className='d-flex justify-content-center'>
  {/* <Pagination size='lg'>{items}</Pagination> */}
  <div className="pagination mt-5">
      <Button
        variant="primary"
        disabled={!paginationData.previous}
        onClick={handlePrevious}
      >
        Previous
      </Button>
      <p className="page-number mb-0 mx-5 d-flex align-items-center fw-bold">Page {currentPage}</p>
      <Button
        variant="primary"
        disabled={!paginationData.next}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
    </div>
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
            />
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              id="last_name"
              onChange={formik.handleChange}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange}
            />           
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  variant="primary" onClick={()=>{formik.handleSubmit();handleClose()}}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
    }
    </>
  );
}

export default Users;