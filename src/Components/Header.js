import React from "react";
import styled from "styled-components";
import { Nav, Navbar } from "react-bootstrap";
import { Today } from "@material-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";

import { useHistory, NavLink } from "react-router-dom";

const Header = () => {
  const id = useSelector((state) => state.id);
  const [user] = useAuthState(auth);
  let history = useHistory();
  const logoutHandler = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <HeaderComponentContainer>
      <Navbar expand="lg">
        <HeaderLeftContainer>
          <Navbar.Brand
            as={NavLink}
            to={user && id ? "companyScreen" : user && !id ? "welcome" : "/"}
          >
            <InnerHeaderLeftContainer>
              <Today />
              Appoint
            </InnerHeaderLeftContainer>
          </Navbar.Brand>
        </HeaderLeftContainer>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user && (
              <Nav.Link onClick={logoutHandler}>
                Logout <i className="fas fa-sign-out-alt"></i>
              </Nav.Link>
            )}

            {/* {!user && <Nav.Link href="#link">Sign in</Nav.Link>} */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </HeaderComponentContainer>
  );
};

export default Header;

const HeaderComponentContainer = styled.div`
  background-color: transparent;
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 6.8px;
`;
const HeaderLeftContainer = styled.div`
  /* margin-left: 5px; */
`;
const InnerHeaderLeftContainer = styled.div`
  display: flex;
  font-weight: 400 !important;
  /* font-family: "Lato", sans-serif; */

  align-items: center;
  > .MuiSvgIcon-root {
    margin-right: 3px;
    font-size: 30px;
  }
`;
