import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../Context/UserContext';


export default function NavBar() {
  const {token} = useContext(userContext)
    // let token = localStorage.getItem('token')
    let navigate = useNavigate()

    // delete the token when press logout
    function deleteToken(){
      localStorage.removeItem('token')
      navigate('/')
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand" to='/'>DynamicEgy</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token === null ?<Link  className="navbar-brand" to='login'>Login</Link>:<Link onClick={()=>deleteToken()} className="navbar-brand">Logout</Link>}
            <Link  className="navbar-brand" to='register'>Register</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
