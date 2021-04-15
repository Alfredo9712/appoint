import "./App.css";
import Header from "./Components/Header";
import StartScreen from "./Components/Screens/StartScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";
import WelcomeScreem from "./Components/Screens/WelcomeScreen";
import { db } from "./config/firebase";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Spinner } from "react-bootstrap";
import MonthlyCalendar from "./Components/MonthlyCalendar";

import { useSelector } from "react-redux";

import styled from "styled-components";

import CompanyScreen from "./Components/Screens/CompanyScreen";
import { useDocument } from "react-firebase-hooks/firestore";
import UserCalendarScreen from "./Components/Screens/UserCalendarScreen";

function App() {
  const [user, loading] = useAuthState(auth);

  const id = useSelector((state) => state.id);

  const [companyId] = useDocument(id && db.collection("companies").doc(id));

  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner animation="border" role="status"></Spinner>
      </SpinnerContainer>
    );
  }

  return (
    <>
      <Router>
        {/* <Header /> */}
        <Switch>
          <>
            {/* why not change logic within component */}
            {!user ? (
              <Route exact path="/">
                <StartScreen />
              </Route>
            ) : (
              <>
                {companyId && (
                  <Redirect exact from="/" push to="/companyScreen" />
                )}
                {!companyId && <Redirect exact from="/" push to="/welcome" />}

                <Route path="/welcome">
                  <WelcomeScreem />
                </Route>
                <Route path="/companyScreen">
                  <CompanyScreen />
                </Route>
              </>
            )}

            {/* Redirect if there is a returning user that alraedy has a id */}
          </>
        </Switch>

        <Route path="/events/:companyName">
          <UserCalendarScreen />
        </Route>
      </Router>
    </>
  );
}

export default App;
const SpinnerContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  margin-bottom: 40px;
`;
