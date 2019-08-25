import React, { Fragment, useState } from "react";
import { NavLink as ReactRouterLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const CustomNav = ({ isUserVerified }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  // use Link instead of HREF
  //
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand
          tag={ReactRouterLink}
          to={isUserVerified ? "/bucketlists/" : "/"}
        >
          {isUserVerified ? "Dashboard" : "Bucketlists"}
        </NavbarBrand>
        <NavbarToggler onClick={handleClick} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {isUserVerified ? (
              <NavItem>
                <NavLink tag={ReactRouterLink} to="/">
                  Log out
                </NavLink>
              </NavItem>
            ) : (
              <Fragment>
                <NavItem>
                  <NavLink tag={ReactRouterLink} to="/sign-in/">
                    Sign In
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactRouterLink} to="/sign-up/">
                    Sign Up
                  </NavLink>
                </NavItem>
              </Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNav;
