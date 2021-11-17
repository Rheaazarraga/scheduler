import React from "react";
import "./styles.scss";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

// --------------- Component Function --------------- //

export default function Appointment(props) {

  const appointmentClass = classNames("appointment", {
    "appointment__time":props.selected
  });

  const appointments = (time) => {
    if (time === undefined) {
      return "No appointments"
    }
    return `Appointment at ${time} `;
  }


  // --------------- Appointment component --------------- //
  
  return (

    <article className={appointmentClass}
      className="appointment__time">{appointments(props.time)}
    </article>
  );
} 