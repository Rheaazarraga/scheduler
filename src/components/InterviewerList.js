import React from "react";
import "./InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

// --------------- Component Function --------------- //

export default function InterviewerList(props) {

  const interviewers = props.interviewers.map(interviewer => {
    console.log("what's a interviewer?", interviewer);
      return (
        <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
        />
        )
  });

  // --------------- InterviewList component --------------- //

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>

  );
}