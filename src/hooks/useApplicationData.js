import {
  useState, useEffect
} from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((response) => {
      const days = response[0].data;
      const appointments = response[1].data;
      const interviewers = response[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    }).catch(e => console.log('There was an error: ', e));
  }, []);

  const bookInterview = function(id, interview) {
    console.log(id, interview);

    // replace value of interview key  
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // replace existing appointment with matching id 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // update the database with the interview data, setting a new state object 
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        console.log('RES: ', res);
        const days = updateSpots('bookAppointment')
        setState({
          ...state,
          appointments,
          days
        });
      })
  };


  const cancelInterview = (id) => {
    // set interview value to null 
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // replace existing appointment with matching id 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        const days = updateSpots()
        setState({
          ...state,
          appointments,
          days
        });
      });
  };

  const updateSpots = (reqType) => {

     const days = [];
    for (const day of state.days) {
      console.log('DAYS =================', day);
      if (day.name === state.day) {
        if (reqType === 'bookAppointment') {
            days.push({ ...day, spots: day.spots - 1 })
        } else {
          days.push({ ...day, spots: day.spots + 1 })
        }
      } else {
         days.push(day)
      }
   
    }
    return days;
  };

  return { setDay, bookInterview, cancelInterview, state };
};

export default useApplicationData;



