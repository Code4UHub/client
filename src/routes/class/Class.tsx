import React from 'react';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';

import { Class as ClassType } from 'types/Class/Class';

import SectionHeader from 'components/SectionHeader/SectionHeader';

import styles from './Class.module.css';

function ClassNav() {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink
            to=""
            end
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="modules">Módulos</NavLink>
        </li>
        <li>
          <NavLink to="activities">Actividades</NavLink>
        </li>
        <li>
          <NavLink to="leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export function Class() {
  const classInfo = useLoaderData() as ClassType;
  return (
    <>
      <SectionHeader
        title={classInfo.subject_name}
        childType="nav"
      >
        <ClassNav />
      </SectionHeader>
      <Outlet />
    </>
  );
}
