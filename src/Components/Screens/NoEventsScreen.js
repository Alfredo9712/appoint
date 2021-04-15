import React from "react";
import { Jumbotron } from "react-bootstrap";
import styled from "styled-components";
const NoEventsScreen = () => {
  return (
    <EventsContainer>
      <h1>Create Appointments to view Calendar</h1>
    </EventsContainer>
  );
};

export default NoEventsScreen;

const EventsContainer = styled.div`
  text-align: center;
  > h1 {
    font-size: 50px;
    font-family: AvenirNextBold;
  }
`;
