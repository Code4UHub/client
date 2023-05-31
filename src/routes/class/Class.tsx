import React from 'react';
import { useLoaderData, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

import { Class as ClassType } from 'types/Class/Class';

import SectionHeader from 'components/SectionHeader/SectionHeader';

import styles from './Class.module.css';

type ClassNavProps = {
  isStudent: boolean;
};

function ClassNav({ isStudent }: ClassNavProps) {
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
          <NavLink to={isStudent ? 'leaderboard' : 'group'}>
            {isStudent ? 'Leaderboard' : 'Grupo'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export function Class() {
  const classInfo = useLoaderData() as ClassType;
  const user = useSelector((state: RootState) => state.user.currentUser);
  return (
    <>
      <SectionHeader
        title={classInfo.subject_name}
        childType="nav"
      >
        <ClassNav isStudent={user?.role === 'student'} />
      </SectionHeader>
      <Outlet />
    </>
  );
}
