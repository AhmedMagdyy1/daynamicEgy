import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as Yup from 'yup'
import { userContext } from '../Context/UserContext';


export default function Register() {
  const {setToken,authHeader} = useContext(userContext)

  
let navigate = useNavigate()
const [validationError, setValidationError] = useState(false);
const [isLoading, setIsLoading] = useState(false)


  let validationSchema = Yup.object({
    first_name: Yup.string()
      .required("*first name is required")
      .min(3, "First name must be at least 3 characters")
      .max(25, "First name must be at most 25 characters"),

    last_name: Yup.string()
      .required("*last name is required")
      .min(3, "Last name must be at least 3 characters")
      .max(25, "Last name must be at most 25 characters"),

    email: Yup.string()
      .required("*email is required")
      .email("Please Enter a valid email"),

    password: Yup.string()
      .required("*password is required")
      .matches(/^[A-Z]/, "Password must start with capital letter")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be at most 25 characters"),

      phone_number: Yup.number()
      .required("*Phone Number is required")
      .min(18),
  });

  let formik = useFormik({
    initialValues:{
    "email": "",
    "first_name": "",
    "last_name": "",
    "phone_number": "",
    "password": ""
  },
  validationSchema,
  onSubmit:handleSubmit
  })

 async function handleSubmit(values){
  setIsLoading(true)
  try {
    let {data} =  await axios.post('http://62.171.166.157:5050/api/user/',values,
    {headers:{
     'Authorization':authHeader
    }
   })
    console.log(data);
   
    if (data){
    setIsLoading(false)
    localStorage.setItem('userInfo',JSON.stringify)
     navigate('/login')
    }else {
     setValidationError(data.message)
    }
  } catch (error){
    setIsLoading(false)
    setValidationError(error.response.data.email);
  }
  }




  return (
    <div className="container">
        <div className="row d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-6">
                <img src="Images//free-stock-photos-websites.jpg" className='w-100' alt="Users" />
            </div>
            <form onSubmit={formik.handleSubmit} className="col-md-6 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="first_name"
              id="first_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value= {formik.values.first_name}
            />
              {formik.errors.first_name && formik.touched.first_name ? <div className='alert alert-danger'>{formik.errors.first_name}</div>:null}
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="last_name"
              id="last_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value= {formik.values.last_name}
            />
              {formik.errors.last_name && formik.touched.last_name ? <div className='alert alert-danger'>{formik.errors.last_name}</div>:null}

            <input
              type="text"
              className="form-control"
              placeholder="Phone Number"
              name="phone_number"
              id="phone_number"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value= {formik.values.phone_number}
            />
                          {formik.errors.phone_number && formik.touched.phone_number ? <div className='alert alert-danger'>{formik.errors.phone_number}</div>:null}

            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value= {formik.values.email}
            />
                          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:null}
                          {validationError ? (
              <div className="alert alert-danger">{validationError}</div>
            ) : null}
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value= {formik.values.password}
            />
                          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:null}
            
            <button type="submit" className="btn btn-primary">
              {isLoading === true ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Create Account'}
            </button>
            <p>
              Already have account ?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
        </div>
    </div>
  )
}
