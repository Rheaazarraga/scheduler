import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "./helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`).then(response => {
      setDays([...response.data])
    });
  }, []);

  const appointmentsArray = Object.values(appointments).map(appointment => {
    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      />
    );
  });

  return (

    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebarseparator sidebar--centered" />
        <nav className="sidebarmenu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={state.setDays}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {appointmentsArray}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
