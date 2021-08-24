import { ButtonBase } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { Button, Modal, Row, Col, Form, Alert } from "react-bootstrap";
import styled from "styled-components";
import emailjs from "emailjs-com";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../config/firebase";
const BookAppointmentModal = ({ show, setShow, event, companyName, id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [variant, setVariant] = useState("");
  const [alertResponse, setAlertResponse] = useState("");
  const companyCollection = db.collection("companies");
  const bookedInformation = {
    ...event,
    name,
    email,
  };

  const params = {
    name,
    email,
    subject: "Appointment Confirmation",
    companyName,
    startDate: event.start?.toUTCString().split(" ").slice(0, 4).join(" "),
    startTime: event.start?.toLocaleTimeString(),
    endTime: event.end?.toLocaleTimeString(),
  };
  const handleClose = () => {
    setShow(false);
    setSecondModal(false);
    setName("");
    setEmail("");
  };
  const [secondModal, setSecondModal] = useState(false);
  const showSecondModal = () => {
    setSecondModal(true);
  };
  const handleAppointments = () => {
    companyCollection
      .doc(id.toString())
      .collection("appointments")
      .doc(event.id)
      .delete();

    companyCollection
      .doc(id)
      .collection("bookedAppointments")
      .doc(event.id)
      .set(bookedInformation)
      .catch((err) => {
        console.log(err);
      });
  };
  const confirm = (e) => {
    e.preventDefault();
    setAlertResponse("Appointment created ");
    setVariant("success");
    setConfirmAlert(true);
    setTimeout(function () {
      setShow(false);
      setSecondModal(false);
      setConfirmAlert(false);
    }, 700);

    setConfirmAlert(true);
    setName("");
    setEmail("");
    emailjs
      .send(
        "service_y55amaa",
        "template_8pzhetc",
        params,
        "user_bPHPNlrbknTijbPB1xU95"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div>
      {!secondModal ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                {" "}
                <h4
                  style={{
                    fontWeight: "400",
                  }}
                >
                  {event?.title}
                </h4>
                <h5
                  style={{
                    fontWeight: "300",
                    marginTop: "15px",
                    marginBottom: "0",
                    fontSize: "18px",
                  }}
                >
                  <i className="far fa-calendar"></i> &nbsp;
                  <span style={{ marginLeft: "3px" }}>
                    {event.start
                      ?.toUTCString()
                      .split(" ")
                      .slice(0, 4)
                      .join(" ")}
                  </span>
                </h5>
              </Col>
              <Col sm={6}>
                <h5
                  style={{
                    fontWeight: "300",
                    marginTop: "8px",
                    marginBottom: "0",
                    fontSize: "18px",
                  }}
                >
                  <i className="fas fa-circle" style={{ color: "#228B22" }}></i>{" "}
                  &nbsp;
                  {event.start?.toLocaleTimeString()}{" "}
                </h5>
                <div
                  style={{
                    borderLeft: `2px solid #228B22`,
                    height: "33px",
                    marginLeft: "8px",
                    marginTop: "-4.3px",
                  }}
                ></div>
                <div
                  style={{
                    marginTop: "-4.3px",
                  }}
                >
                  <h5
                    style={{
                      fontWeight: "300",
                      marginTop: "-10px",
                      marginBottom: "0",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      className="fas fa-circle"
                      style={{ color: "#228B22" }}
                    ></i>{" "}
                    &nbsp;
                    {event.end?.toLocaleTimeString()}
                  </h5>
                </div>
              </Col>
            </Row>

            <br></br>
            <BottomContainer>
              {/* <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button> */}
              <button
                onClick={showSecondModal}
                style={{ marginTop: "6px", marginBottom: "8px" }}
              >
                Book
              </button>
            </BottomContainer>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {confirmAlert && (
              <Alert
                variant={variant}
                style={{ display: "flex", alignItems: "center" }}
              >
                {" "}
                {alertResponse}
              </Alert>
            )}

            <BottomContainer>
              <Form onSubmit={confirm}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{ fontSize: "19px", fontWeight: "300" }}>
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label style={{ fontSize: "19px", fontWeight: "300" }}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                {/* <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button> */}
                <button
                  type="submit"
                  onClick={(e) => {
                    confirm(e);
                    handleAppointments();
                  }}
                >
                  Confirm
                </button>
              </Form>
            </BottomContainer>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default BookAppointmentModal;
const BottomContainer = styled.div`
  > button,
  button {
    background-color: #404040; /* Green */
    border: none;
    color: white;
    padding: 5px 22px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    font-weight: 300;
  }
  > h5 {
    margin-bottom: 0;
    padding: 0;
  }
`;
