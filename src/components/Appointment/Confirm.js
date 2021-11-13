import React from "react";
import Button from "components/Button";

// --------------- Component Function --------------- //

export default function Confirm(props) {

  // --------------- Confirm component --------------- //

  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button danger>Cancel</Button>
        <Button danger>Confirm</Button>
      </section>
    </main>

  );
}