import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Button,
} from 'reactstrap';

class Header extends Component {
  render() {
    return (
      <Navbar className="bg-light fixed-top">
        <NavbarBrand href="#home" className="text-success">
          <img
            alt=""
            src="logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' Lysofts Ke. '}
        </NavbarBrand>
        <Nav className="text-light">
          <NavLink><Button><NavLink href="/create-event">Create event</NavLink></Button></NavLink>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;