import React, { useState } from "react";

import styled from "styled-components";
import { useHistory } from "react-router-dom";

const SidebarOptions = ({ Icon, text, route }) => {
  let history = useHistory();
  const [toggle, setToggle] = useState(false);
  const boxClick = () => {
    setToggle();
  };
  const pushHistory = () => {
    history.push(`/${route}`);
  };
  return (
    <Container
      onClick={() => {
        pushHistory();
        boxClick();
      }}
      className={toggle ? "opacity" : null}
    >
      <button>
        {Icon && <Icon />}

        <p>{text}</p>
      </button>
    </Container>
  );
};

export default SidebarOptions;
const Container = styled.div`
  display: flex;
  margin-left: 10%;
  margin-top: 20px;

  cursor: pointer;
  margin-bottom: 20px;
  > button > .MuiSvgIcon-root {
    margin-right: 10px;
  }
  > button {
    /* background-color: #353535; */
    background-color: #f7f7f7;
    color: #353535;
    outline: none;
    border: none;
    font-weight: 400;
    display: flex;
    width: 100%;
    padding: 3px;
  }
`;
