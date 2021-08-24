import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import fakeEvents from "../events";
import { Button } from "@material-ui/core";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../config/firebase";
import NoEventsScreen from "./Screens/NoEventsScreen";
import useWindowDimensions from "./useWindowDimensions";
const localizer = momentLocalizer(moment);

const MonthlyCalendar = () => {
  const { width } = useWindowDimensions();
  const [view, setView] = useState({ view: "month", next: true });
  const id = useSelector((state) => state.id);
  const [events, loading] = useCollection(
    db.collection("companies").doc(id.toString()).collection("appointments")
  );

  const eventsArray = new Array();

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
        <Container style={{ maxWidth: "80%" }}>
          {events?.docs.length === 0 ? (
            <h5 className="text-muted">No appointments made</h5>
          ) : (
            ""
          )}
          <Calendar
            localizer={localizer}
            onSelectEvent={(event, e) => {
              console.log(event.id);
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
            style={{ height: width > 700 ? 720 : 400 }}
            onNavigate={(date) => setView({ date })}
          />

          {/* <Button onClick={() => setView({ view: "month" })}>Month</Button>
          <Button onClick={() => setView({ view: "day" })}>Day</Button> */}
        </Container>
      )}
    </>
  );
};

export default MonthlyCalendar;
