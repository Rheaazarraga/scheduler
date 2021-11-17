import React from "react";
import "./styles.scss";
import classNames from "classnames";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

// --------------- Component Function --------------- //

export default function Appointment(props) {


  // --------------- Appointment component --------------- //
  
  return (
  
   <article className="appointment">
      <Header
        time={props.time}>
      </Header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/> }
    </article>
  );
} 