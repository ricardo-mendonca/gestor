import { Link, useNavigate } from 'react-router-dom'

import styles from './Navbar.module.css'
import { CgLogOff } from 'react-icons/cg'
import {Button,Container,Form,Nav,Navbar,NavDropdown } from 'react-bootstrap';
import { IoIosPower } from "react-icons/io";

function NavbarMenu() {

  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const token = localStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  async function logout() {
    try {
      localStorage.clear();
      localStorage.setItem('token', '');
      authorization.headers = '';
      navigate('/');
    } catch (error) {
      alert('não foi possível fazer o logout ' + error)
    }
  }



  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">Gestor</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

            <Nav.Link href="/despesa">Despesa</Nav.Link>
            <Nav.Link href="/categoria">Categoria</Nav.Link>
            
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

          </Nav>
          <Nav>
            <Nav.Link href="#deets">bem vindo, <strong>{email}</strong>!</Nav.Link>
            <Nav.Link onClick={logout} href="/">
              Logout <IoIosPower size={15} color="white" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
  )
};

export default NavbarMenu;
