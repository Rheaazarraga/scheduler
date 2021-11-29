import React, { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(props) {
  // declare state with initial values
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // set the currently selected day in the sidebar
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    // pull API data and update state with newly requested data
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);


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

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        // updates the local state with the updated interview information for the specific id in the API
        setState({
          ...state,
          appointments
        });

      });
  }

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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        // updates the local state with new information after successfully deleting the appointment in the API
        setState({
          ...state,
          appointments
        });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };

}
