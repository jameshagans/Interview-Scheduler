import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Error from './Error';
import Status from './Status';
import Confirm from './Confirm';
import Form from './Form';
import { useVisualMode } from 'hooks/useVisualMode';


const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  const remove = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      }).catch((e) => {
        transition(ERROR_DELETE, true);
      });
  };


  return (
    <>
      <article className="appointment" data-testid="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer.name} onDelete={() => transition(CONFIRM)} onEdit={() => transition(EDIT)} />}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
        {mode === SAVING && <Status message={"Saving"} />}
        {mode === DELETING && <Status message={"Deleting"} />}
        {mode === CONFIRM && <Confirm onCancel={back} onConfirm={remove} message="Are you sure you would like to delete" />}
        {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={back} />}
        {mode === ERROR_DELETE && <Error message={"Can not delete appointment. Try again!"} onClose={back} />}
        {mode === EDIT && (
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        )}
      </article>
    </>

  );

};

export default Appointment; 
