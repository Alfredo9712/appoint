import React from "react";
import { db } from "../config/firebase";
import uuid from "react-uuid";
import { Button } from "@material-ui/core";
const AddCompany = () => {
  const companyCollection = db.collection("companies");
  const testCompany = {
    company: "testy",
    id: uuid(),
  };
  const addCompany = (e) => {
    e.preventDefault();
    companyCollection
      .doc(testCompany.id)
      .set(testCompany)
      .catch((err) => {
        console.log(err);
      });
    console.log("added");
  };

  return (
    <>
      <Button type="submit" onClick={addCompany}></Button>
    </>
  );
};

export default AddCompany;
