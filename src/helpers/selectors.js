export function getAppointmentsForDay(state, day) {
  // Find the day object in the state
  const selectedDay = state.days.find(d => d.name === day);

  // If the day object isn't found, return an empty array
  if (!selectedDay) {
    return [];
  }

  // Map over the appointments array for the selected day
  const appointmentsForDay = selectedDay.appointments.map(id => state.appointments[id]);

  // Return the appointments for the selected day
  return appointmentsForDay;
}




export function getInterviewersForDay(state, day) {
  const interviewersForDay = state.days.filter(singleDay => singleDay.name === day)[0];

  if (!interviewersForDay) {
    return [];
  }

  const interviewersData = interviewersForDay.interviewers.map(interviewerId => state.interviewers[interviewerId]);


  return interviewersData;
}




export function getInterview(state, interview) {

  //const interviewer = state.interviewers.find(i => i.id === interview.interviewer)

  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: {
      id: interviewer.id,
      name: interviewer.name,
      avatar: interviewer.avatar,
    },
  };
}

