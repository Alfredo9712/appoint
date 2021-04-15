import { Button } from "@material-ui/core";

import React from "react";
import styled from "styled-components";
import { auth } from "../config/firebase";
import { useHistory } from "react-router-dom";

let history = useHistory();
const Test = () => {
  const logoutHandler = () => {
    auth.signOut();
    history.push("/");
  };
  return (
    <TestContainer>
      <Button onClick={logoutHandler}>Logout</Button>
    </TestContainer>
  );
};

export default Test;
const TestContainer = styled.div``;
