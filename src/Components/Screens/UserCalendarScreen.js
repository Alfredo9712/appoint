import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../config/firebase";
import useWindowDimensions from "../useWindowDimensions";
import Header from "../Header";
import BookAppointmentModal from "./BookAppointmentModal";
import styled from "styled-components";
const localizer = momentLocalizer(moment);

const MonthlyCalendar = ({ match }) => {
  const { width } = useWindowDimensions();
  const id = match.params.companyId;
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState({});
  const [view, setView] = useState({ view: "month", next: true });
  const [events, loading] = useCollection(
    db.collection("companies").doc(id.toString()).collection("appointments")
  );
  const [companyDetails] = useDocument(
    id && db.collection("companies").doc(id.toString())
  );
  console.log(events?.docs.length);

  const eventsArray = new Array();
  const handleShow = (event) => {
    setShow(true);
    setEvent(event);
  };
  events?.docs.map((doc) => {
    const { start, end, title, id } = doc.data();

    eventsArray.push({
      id,
      title,
      start: new Date(start?.toDate()),
      end: new Date(end?.toDate()),
    });
  });

  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <Header />
          <Container style={{ maxWidth: "92%", marginTop: "20px" }}>
            <>
              <NameContainer>
                <h1 style={{ marginTop: "-15px" }}>
                  {companyDetails?.data().companyName}
                </h1>
                {events?.docs.length === 0 ? (
                  <h5 className="text-muted">No appointments available</h5>
                ) : (
                  ""
                )}
              </NameContainer>

              <Calendar
                localizer={localizer}
                onSelectEvent={(event, e) => {
                  handleShow(event);
                }}
                view={view.view}
                onView={() => {}}
                events={eventsArray}
                views={{
                  day: true,
                  month: true,
                }}
                startAccessor="start"
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: " #404040",
                  },
                })}
                endAccessor="end"
                style={{ height: width > 700 ? 770 : 400 }}
                onNavigate={(date) => setView({ date })}
              />
              <BookAppointmentModal
                show={show}
                setShow={setShow}
                handleShow={handleShow}
                event={event}
                companyName={companyDetails?.data().companyName}
                id={id}
              />
            </>
          </Container>
        </>
      )}
    </>
  );
};

export default MonthlyCalendar;
const NameContainer = styled.div`
  > h1 {
    font-family: AvenirNextBold;
    font-size: 38px;
    text-transform: capitalize;
  }
  > h5 {
  }
`;
