import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import { ReactComponent as RequestIcon } from './Requests.svg';
import { ReactComponent as QuestionIcon } from './Question.svg';

export default function TeacherSidebar() {
  return (
    <Sidebar>
      <NavLink to="/requests">
        <RequestIcon />
        <span>Solicitudes</span>
      </NavLink>
      <NavLink to="/new-question">
        <QuestionIcon />
        <span>Crear pregunta</span>
      </NavLink>
    </Sidebar>
  );
}
