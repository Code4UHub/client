import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import { ReactComponent as RequestIcon } from './Requests.svg';

export default function TeacherSidebar() {
  return (
    <Sidebar>
      <NavLink to="/requests">
        <RequestIcon />
        <span>Solicitudes</span>
      </NavLink>
    </Sidebar>
  );
}
