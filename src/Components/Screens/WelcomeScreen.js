import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import CompanyScreen from "./CompanyScreen";

import styled from "styled-components";
import ComForm from "../ComForm";
import Header from "../Header";

const WelcomeScreen = () => {
  const [user] = useAuthState(auth);
  const companyID = localStorage.getItem("companyId");

  return (
    <>
      {/* <Header /> */}
      <WelcomeScreenContainer>
        {user && !companyID ? <ComForm user={user} /> : <CompanyScreen />}
      </WelcomeScreenContainer>
    </>
  );
};

export default WelcomeScreen;

const WelcomeScreenContainer = styled.div`
  margin-top: 4%;
`;
