import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

export default function MyCalendar() {
  const [value, onChange] = useState(new Date());

  //   console.log(typeof value);

  return (
    <>
      <div className="calendar">
        <Calendar onChange={onChange} value={value} selectRange={true} />

        {/* <div>{value.toDateString()}</div> */}
        <div>
          {value.length > 0 ? (
            <p className="text-center">
              <span className="bold">Start:</span> {value[0].toDateString()}
              &nbsp;|&nbsp;
              <span className="bold">End:</span> {value[1].toDateString()}
            </p>
          ) : (
            <p className="text-center">
              <span className="bold">Selected date:</span>{" "}
              {value.toDateString()}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
