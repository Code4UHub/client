import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from 'components/NavBar/NavBar';
import { ReactComponent as IconReports } from './Reports.svg';

export default function TeacherNavBar() {
  return (
    <NavBar>
      <NavLink to="/report">
        <IconReports />
        <span>Reportes</span>
      </NavLink>
    </NavBar>
  );
}
