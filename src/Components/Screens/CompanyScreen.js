import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Sidebar";

import MonthlyCalendar from "../MonthlyCalendar";
import HeaderMain from "../HeaderMain";
import CreateAppointmentScreen from "./CreateAppointmentScreen";
import BookedAppointments from "./BookedAppointments";

const CompanyScreen = () => {
  return (
    <>
      <HeaderMain />
      <CompanyContainer>
        <Router>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <Switch>
            <Route path="/booked">
              <BookedAppointments />
            </Route>
            <Route path="/create">
              <CreateAppointmentScreen />
            </Route>
            <Route path="/companyScreen">
              <MonthlyCalendar />
            </Route>
            <Route path="/create">
              <h1>create</h1>
            </Route>
          </Switch>
        </Router>
      </CompanyContainer>
    </>
  );
};

export default CompanyScreen;
const CompanyContainer = styled.div`
  display: flex;
  @media (max-width: 991px) {
    display: inline;
  }

  > h1 {
    font-family: AvenirNextBold;
    /* font-family: Arial, Helvetica, sans-serif; */
    font-weight: 500;

    font-size: 70px;
  }
`;

const SidebarContainer = styled.div`
  min-width: 12%;
`;
