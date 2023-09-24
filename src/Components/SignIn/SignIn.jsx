import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import * as Yup from 'yup'
import { userContext } from '../Context/UserContext';

export default function SignIn() {
 

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const {setToken,authHeader} = useContext(userContext)


  let navigate = useNavigate()


  // to validate User data
  let validationSchema = Yup.object({
    

    email: Yup.string()
      .required("*email is required")
      .email("Please Enter a valid email"),

    password: Yup.string()
      .required("*password is required")
      .matches(/^[A-Z]/, "Password must start with capital letter")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be at most 25 characters"),

     
  });

  let formik = useFormik({
    initialValues:{
    "email": "",
    "password": ""
  },
  validationSchema,
  onSubmit:handleLogin
  })

  async function handleLogin(values){
    setIsLoading(true)
    try {
      let {data} = await axios.post('http://62.171.166.157:5050/api/login/',values,{
      headers:authHeader
    })
    if(data){
      setIsLoading(false)
      localStorage.setItem('token',data.access)
      setToken(data.access)
      navigate('/users')
    } else {
      setValidationError(data.message)
    }
    console.log(data);
    } catch(error){
      setIsLoading(false)
      setValidationError(error.response.data);
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
              {validationError ? (
              <div className="alert alert-danger">{validationError}</div>
            ) : null}
            <button type="submit" className="btn btn-primary">
              {isLoading === true ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Login'}
              
            </button>
            <p>
              Don't have an account ?{" "}
              <Link to="/register" className="text-decoration-underline">
                Register
              </Link>
            </p>
          </div>
        </form>
        </div>
    </div>
  )
}
