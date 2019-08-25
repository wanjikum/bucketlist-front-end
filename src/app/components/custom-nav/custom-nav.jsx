import React, { Fragment, useState, useContext } from "react";
import { NavLink as ReactRouterLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";

import AuthContext from "../../bucketlist/auth";

const CustomNav = ({ isUserVerified, history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useContext(AuthContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOutButtonClick = e => {
    auth.handleAuthDataChange({ success: false, token: "" });
    history.push("/");
  };

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
                <Button
                  color="danger"
                  type="button"
                  onClick={handleLogOutButtonClick}
                >
                  Log out
                </Button>
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
