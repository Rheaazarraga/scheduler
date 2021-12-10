// --------------- getAppointmentsForDay function --------------- //

export function getAppointmentsForDay(state, day) {
  const selectedApptDay = state.days.filter(days => days.name === day);
  const appointments = [];

  if (selectedApptDay[0]) {
    const dayIDs = selectedApptDay[0].appointments

    for (const numAppts of dayIDs) {
      appointments.push(state.appointments[numAppts]);
    }
  }
  return appointments;
}

// --------------- getInterview function --------------- //

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewerData = state.interviewers[interview.interviewer]
  return { ...interview, interviewer: interviewerData };
}

// --------------- getInterviewersForDay function --------------- //

export function getInterviewersForDay(state, day) {
  const selectedApptDay = state.days.filter(eachDay => eachDay.name === day);
  const interviewers = [];

  if (selectedApptDay[0]) {

    for (const numInterviewers of selectedApptDay[0].interviewers) {
      interviewers.push(state.interviewers[numInterviewers])
    }
  }
  return interviewers;
}

// --------------- getRemainingSpots function --------------- //

export function decrementSpots(state) {

  const newDays = [];

  for (const day of state.days) {
    if (day.name === state.day) {
      newDays.push({...day, spots: day.spots-1})
    } else {
      newDays.push(day);
    }
  }
  return newDays;
};

export function incrementSpots(state) {
  const newDays = [];
  for (const day of state.days) {
    if (day.name === state.day) {
      newDays.push({...day, spots: day.spots+1})
    } else {
      newDays.push(day);
    }
  }
  return newDays;
};
