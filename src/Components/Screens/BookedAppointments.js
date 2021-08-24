import React from "react";
import {} from "react-bootstrap";
import styled from "styled-components";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { Card, Container } from "react-bootstrap";
const BookedAppointments = () => {
  const id = useSelector((state) => state.id);
  const [bookedAppointments, loading] = useCollection(
    db
      .collection("companies")
      .doc(id.toString())
      .collection("bookedAppointments")
  );
  const data = bookedAppointments?.docs.map((doc) => doc.data());

  return (
    <>
      {!loading && (
        <Container>
          <HeaderComponent>
            <h1>Booked Appointments</h1>
          </HeaderComponent>
          {data.map((item) => (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
};

export default BookedAppointments;
const HeaderComponent = styled.div`
  > h1 {
    font-family: AvenirNextBold;
    font-size: 40px;
    margin-top: 10px;
    display: block;
  }
`;
