import React from "react";
import "./InterviewerListItem.scss"
import classNames from "classnames";

// --------------- Component Function --------------- //

export default function InterviewerListItem(props) {

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });


  // --------------- InterviewerListItem component --------------- //

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}