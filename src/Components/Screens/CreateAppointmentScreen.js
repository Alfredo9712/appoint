import React, { useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import uniqid from "uniqid";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";

const CreateAppointmentScreen = () => {
  const id = useSelector((state) => state.id);
  const companyCollection = db.collection("companies");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [title, setTitle] = useState("");
  const [added, setAdded] = useState(false);
  const [alertResponse, setAlertResponse] = useState("");
  const [variant, setVariant] = useState("");
  // const [events, loading] = useCollection(
  //   db.collection("companies").doc("0").collection("appointment")
  // );
  const addAppointmentHandler = (e, event) => {
    e.preventDefault();
    if (startDate === undefined || endDate === undefined || title === "") {
      setAlertResponse("Invalid input");
      setVariant("danger");
      setAdded(true);
      setTimeout(function () {
        setAdded(false);
      }, 2000);
    } else {
      console.log(event);
      companyCollection
        .doc(id)
        .collection("appointments")
        .doc(event.id)
        .set(event)
        .catch((err) => {
          console.log(err);
        });
      setAlertResponse("Appointment created ");
      setVariant("success");
      setAdded(true);
      setTimeout(function () {
        setAdded(false);
      }, 2000);
      setStartDate();
      setEndDate();
      setTitle("");
    }
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <CreateAppointmentContianer>
      {added ? (
        <Alert
          variant={variant}
          style={{ display: "flex", alignItems: "center" }}
        >
          {" "}
          {alertResponse}
        </Alert>
      ) : (
        ""
      )}
      <h3 style={{ marginBottom: "30px" }}>Create Appointment</h3>
      <Form>
        <h5>Title</h5>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              display: "inline-block",
              boxShadow:
                "0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24)",
            }}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Row>
          <Col>
            <>
              <h5 style={{ marginRight: "12px" }}>Start</h5>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </>
          </Col>
        </Row>

        <Row>
          <Col>
            <>
              <h5
                style={{
                  marginRight: "18px",
                  marginTop: "20px",
                }}
              >
                End
              </h5>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                filterTime={filterPassedTime}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </>
          </Col>
        </Row>

        <Button
          type="submit"
          onClick={(e) =>
            addAppointmentHandler(e, {
              id: uniqid(),
              title,
              start: startDate,
              end: endDate,
            })
          }
          variant="dark"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Form>
    </CreateAppointmentContianer>
  );
};

export default CreateAppointmentScreen;
const CreateAppointmentContianer = styled.div`
  height: 700px;

  font-family: Helvetica;
  width: 68%;
  background-color: white;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
`;
