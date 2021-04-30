import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { db } from "../config/firebase";
// import uuid from "react-uuid";
import uniqid from "uniqid";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addID } from "../actions/companyIDAction";
const ComForm = ({ user }) => {
  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState();
  const [hideFirst, setHideFirst] = useState(false);
  const companyCollection = db.collection("companies");
  const history = useHistory();

  const dispatch = useDispatch();
  const hideHandler = (e) => {
    e.preventDefault();
    setHideFirst(true);
  };
  const addCompany = (e, newCompany) => {
    e.preventDefault();

    if (passcode.length !== 4) {
      alert("invalid passcode");
      return false;
    }

    companyCollection
      .doc(newCompany.id)
      .set(newCompany)
      .catch((err) => {
        console.log(err);
      });
    setName(``);
    dispatch(addID(newCompany.id));
    console.log("added");
    history.push("/companyScreen");
  };
  return (
    <PageContainer>
      <FormContainer>
        {!hideFirst ? (
          <form>
            <NameContainer>
              <h3>Welcome </h3>
              <h3>{user?.displayName}</h3>
            </NameContainer>
            <FlexContainer>
              <h5>Enter the name of your business</h5>
              <input
                required
                autoFocus="autofocus"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FlexContainer>
            {/* <AddCompany /> */}
            <Button type="submit" onClick={hideHandler}></Button>{" "}
          </form>
        ) : (
          <form style={{ marginTop: "200px" }}>
            <FlexContainer>
              <h5>Enter four digit passcode to secure </h5>
              <h5>appointments</h5>
              <input
                required
                autoFocus="autofocus"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                }}
              />
            </FlexContainer>

            {/* <AddCompany /> */}
            <Button
              type="submit"
              onClick={(e) =>
                addCompany(e, {
                  companyName: name,
                  id: uniqid(),
                  passcode: Number(passcode),
                })
              }
            ></Button>
          </form>
        )}
      </FormContainer>
    </PageContainer>
  );
};

export default ComForm;
const NameContainer = styled.div`
  margin-top: 90px;
  > h3 {
    margin-left: 50px;

    margin-top: -30px;
    font-size: 80px;
    font-family: AvenirNextBold;
  }
`;

const PageContainer = styled.div`
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;
  margin-left: 2%;
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const FormContainer = styled.div``;
const FlexContainer = styled.div`
  > input {
    outline: none;
    border: 1.5px solid gray;
    background-color: #f8f8f8;
    border-radius: 5px;
    display: block;
    padding: 0.7%;
    color: #353535;
    margin-top: 60px;
    margin-left: 50px;
    font-family: Arial, Helvetica, sans-serif;
    /* text-transform: capitalize; */
    display: block;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    width: 60%;
  }
  > h5 {
    font-size: 55px;
    margin-left: 50px;
    /* margin-left: 60px; */

    font-family: AvenirNextBold;
  }
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.5s;

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
