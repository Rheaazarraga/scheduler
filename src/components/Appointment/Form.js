import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

// --------------- Component Function --------------- //

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  };

  const cancel = () => {
    reset()
    props.onCancel()
  };

  // --------------- Form component --------------- //
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={e => e.preventDefault()} autoComplete="off">
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="student"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => {
            if (student === "") {
              setError("Student name cannot be blank");
              return;
            }
            //if interviewer is not selected, form will not allow save/ submit either
            if (interviewer === null) {
              setError("You must select an interviewer");
              return;
            }
            props.onSave(student, interviewer)
          }}>Save</Button>
        </section>
      </section>
    </main>
  );
}