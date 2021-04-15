import { Button } from "@material-ui/core";
import { auth, provider } from "../../config/firebase";
import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Header from "../Header";

const StartScreen = () => {
  const history = useHistory();
  const loginHandler = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => {
      alert(error.message);
    });
    history.push("/welcome");
  };
  return (
    <>
      {/* <Header /> */}
      <StartScreenContainer>
        <FadeIn>
          <h1>Appoint</h1>
          <TopPTag>Create appointments for your business</TopPTag>
        </FadeIn>
        <BottomHalfContainer>
          <h1>Sign in with Google</h1>
          <Button onClick={loginHandler}>
            <i className="fas fa-sign-in-alt"></i>
          </Button>
        </BottomHalfContainer>
      </StartScreenContainer>
    </>
  );
};

export default StartScreen;
const BottomHalfContainer = styled.div`
  margin-left: 0.4%;
  margin-top: 20px;
  margin-top: -5px;
  display: flex;
  > h1 {
    margin-right: 10px;
    font-size: 28px;
    font-weight: 400;
  }
  align-items: center;

  > button {
    background-color: #353535;
    color: #f7f7f7;
    padding: 11px 0px 11px 0px !important;
  }
  > button:hover {
    opacity: 0.9 !important;
    background-color: #484848 !important;
  }

  @media (min-width: 878px) {
    font-size: 28px;
  }
  @media (max-width: 877px) {
    margin-top: -5px;
    > h1 {
      font-size: 22px;
    }
  }
  @media (max-width: 600px) {
    margin-top: -3px;

    > h1 {
      font-size: 18px;
    }
  }
  @media (max-width: 430px) {
    font-size: 15px;

    margin-left: 0%;
  }
`;
const StartScreenContainer = styled.div`
  margin-left: 10%;

  height: 60vh;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.7s;

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const FadeIn = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 350px;

  > h1 {
    font-weight: 400;
    /* font-size: 130px; */
    @media (min-width: 878px) {
      font-size: 130px;
    }
    @media (max-width: 877px) {
      font-size: 105px;
    }
    @media (max-width: 600px) {
      font-size: 78px;
    }
    @media (max-width: 430px) {
      font-size: 66px;
      margin-left: -1%;
    }
    /* font-size: 9vw; */
    font-family: AvenirNextBold;
    margin-bottom: 0;
  }
`;
const TopPTag = styled.p`
  font-size: 42px;
  margin-top: -15px;
  @media (min-width: 878px) {
    font-size: 42px;
  }
  @media (max-width: 877px) {
    font-size: 30px;
    margin-top: -8px;
  }
  @media (max-width: 600px) {
    margin-top: -4px;
    font-size: 25px;
  }
  @media (max-width: 430px) {
    font-size: 16px;
    margin-top: -6px;
    margin-left: 0%;
  }
  margin-left: 0.4%;
  font-weight: 400;
`;
