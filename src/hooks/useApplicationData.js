import React, { useState, useEffect } from "react";
import axios from "axios";
import { decrementSpots, incrementSpots } from "helpers/selectors";

// --------------- useApplicationData --------------- //

export default function useApplicationData(props) {
  // declare object that stores initial states

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // set the currently selected day in the sidebar
  const setDay = day => setState({ ...state, day });

// --------------- useEffect --------------- //

  // requests the days, appointments and interviews data. The promise resolves when all get requests are complete.

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);


// --------------- bookInterview Function--------------- //

  // records the newly created/ edited appointment in the API

  function bookInterview(id, interview) {

    // replace that specific interview with the new state.appointments[id] interview
    // create an appointment variable at the passed in id with the passed in interview data
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

     // create a new appointments variable that replaces the appointment at the passed in id
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // updates spots remaining
    const days = decrementSpots(state);

    // request to database: add interview to interviews table
    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  }


// --------------- cancelInterview Function --------------- //

  // when we cancel an interview it will have its value set to null
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // updates spots remaining
    const days = incrementSpots(state);

    // request to database: delete interview from interviews table
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };

}
