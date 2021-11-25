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

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewerData = state.interviewers[interview.interviewer]
  return { ...interview, interviewer: interviewerData };
}

export function getInterviewersForDay(state, day) {
  const selectedApptDay = state.days.filter(eachDay => eachDay.name === day);
  console.log("selectedApptDay", selectedApptDay);
  const interviewers = [];

  if (selectedApptDay[0]) {

    for (const numInterviewers of selectedApptDay[0].interviewers) {
      interviewers.push(state.interviewers[numInterviewers])
    }
  }
  return interviewers;
}