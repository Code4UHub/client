import React from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar';
import { ReactComponent as IconReports } from './Reports.svg';

export default function TeacherSidebar() {
  return (
    <Sidebar>
      <NavLink to="/report">
        <IconReports />
        <span>Reportes</span>
      </NavLink>
    </Sidebar>
  );
}
