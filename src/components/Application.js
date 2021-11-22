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
  
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  useEffect(() => {
      Promise.all([
        axios.get(`http://localhost:8001/api/days`),
        axios.get(`http://localhost:8001/api/appointments`)
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
      })
  }, []);


  const appointmentsArray = Object.values(dailyAppointments).map((appointment) => {
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
            onChange={setDay}
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