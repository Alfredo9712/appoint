import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import events from "../events";

const DatePickerComponent = () => {
  const [value, onChange] = useState(new Date());
  console.log(value);
  console.log(events);

  return (
    <div style={{ display: "inline-block" }}>
      <DateTimePicker onChange={onChange} value={value} />
    </div>
  );
};

export default DatePickerComponent;
