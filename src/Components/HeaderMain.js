import React from "react";
import styled from "styled-components";
import { Nav, Navbar } from "react-bootstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { useSelector } from "react-redux";
import { useDocument } from "react-firebase-hooks/firestore";

import { useHistory, NavLink } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import {
  Create,
  Home,
  EventAvailable,
  CalendarToday,
  ExitToApp,
} from "@material-ui/icons";
import useWindowDimensions from "./useWindowDimensions";

const HeaderMain = () => {
  const id = useSelector((state) => state.id);
  const { width } = useWindowDimensions();
  const [user] = useAuthState(auth);
  const [companyDetails, loading] = useDocument(
    id && db.collection("companies").doc(id.toString())
  );
  console.log(user.uid);
  let history = useHistory();
  const logoutHandler = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <HeaderComponentContainer>
          <Navbar expand="lg" style={{ minHeight: "6vh" }}>
            <HeaderLeftContainer>
              <Navbar.Brand
                as={NavLink}
                to={
                  user && id ? "companyScreen" : user && !id ? "welcome" : "/"
                }
              >
                <InnerHeaderLeftContainer>
                  {companyDetails?.data().companyName} Dashboard
                </InnerHeaderLeftContainer>
              </Navbar.Brand>
            </HeaderLeftContainer>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ border: "0px", backgroundColor: "#F7F7F7 !important" }}
            />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                {width > 991 ? (
                  <AvatarContainer onClick={logoutHandler}>
                    <Avatar src={user.photoURL}> </Avatar>
                  </AvatarContainer>
                ) : (
                  <Nav.Link onClick={logoutHandler}>
                    {" "}
                    <ExitToApp /> Logout
                  </Nav.Link>
                )}

                {/* {!user && <Nav.Link href="#link">Sign in</Nav.Link>} */}

                <Show>
                  <Nav.Link className="ml-auto">
                    {" "}
                    <Home /> Home
                  </Nav.Link>
                  <Nav.Link className="ml-auto">
                    {" "}
                    <Create /> Create
                  </Nav.Link>
                  <Nav.Link className="ml-auto">
                    {" "}
                    <EventAvailable /> Booked
                  </Nav.Link>
                  <Nav.Link className="ml-auto">
                    {" "}
                    <CalendarToday /> View
                  </Nav.Link>
                </Show>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </HeaderComponentContainer>
      )}
    </>
  );
};

export default HeaderMain;
const Show = styled.div`
  @media (min-width: 991px) {
    display: none;
  }
`;

const HeaderComponentContainer = styled.div`
  background-color: #f7f7f7;

  font-family: Arial, Helvetica, sans-serif;
  padding-top: 6.8px;
  /* background-color: #353535; */

  color: white !important;
`;
const HeaderLeftContainer = styled.div`
  /* margin-left: 5px; */
`;
const InnerHeaderLeftContainer = styled.div`
  display: flex;
  color: #353535 !important;
  /* color: #f7f7f7; */
  text-transform: capitalize;
  font-weight: 100 !important;
  /* font-family: "Lato", sans-serif; */

  align-items: center;
  > .MuiSvgIcon-root {
    margin-right: 3px;
    font-size: 30px;
  }
`;
const AvatarContainer = styled.div`
  cursor: pointer;
  font-size: 10px;
  :hover {
    opacity: 0.8;
  }
`;
