import React from 'react'
import './NavigationBar.css'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ChangeTheme from '../components/ChangeTheme/ChangeTheme'
import {useSelector} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button';
import {clearLoginStatus} from '../slices/UserSlice'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { NavItem } from 'react-bootstrap';
import {changeTheme} from '../slices/ThemeSlice'

function NavigationBar(props) {
  let presentTheme = useSelector(state=>state.theme);
  let color = ((presentTheme===false)?"light":"dark");
  
  let {isSuccess} = useSelector(state=>state.user)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  
  const userLogoutFunction = () =>{
    dispatch(clearLoginStatus())
    localStorage.clear()
    dispatch(changeTheme(false))
    navigate('/login')
  }
  let userTheme=useSelector(state=>state.theme)
  return (
    <>
    <Navbar bg="none" variant={color} expand="sm" className='navbar' >
      <Container>
        <LinkContainer to="/">
        <Navbar.Brand className='nav-text' >HOME</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { 
          isSuccess===true ? 
            <Nav className="me-auto">
              <LinkContainer to="/places" activeClassName='nav-active' className='nav-active1'>
                <Nav.Link className='nav-text'>PLACES</Nav.Link>
              </LinkContainer>
              
                <LinkContainer to="/favourites" activeClassName='nav-active' className='nav-active1'>
                <Nav.Link className='nav-text'>FAVOURITES</Nav.Link>
              </LinkContainer>
            </Nav>
             :
             <Nav className='m-auto' >
              <LinkContainer to="/login" activeClassName='nav-active' className='nav-active1'>
                  <Nav.Link className='nav-text'>LOGIN</Nav.Link>
                </LinkContainer>
              
              
                <LinkContainer to="/signup" activeClassName='nav-active' className='nav-active1'>
                <Nav.Link className='nav-text'>SIGNUP</Nav.Link>
              </LinkContainer>
             </Nav>
          }
          <Nav className='m-4' >
            <ChangeTheme/>
          </Nav>
          {
            isSuccess===true &&
            <Nav>
              <Button variant={userTheme?'outline-light':`outline-dark`} onClick={userLogoutFunction} >
                LOGOUT
              </Button>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default NavigationBar
