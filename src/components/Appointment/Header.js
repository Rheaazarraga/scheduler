import React from "react";
import classNames from "classnames";

// --------------- Component Function --------------- //
export default function Header(props) {
  

// --------------- Header component --------------- //
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}