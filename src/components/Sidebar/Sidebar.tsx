import React, { Children, ReactNode, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as IconClose } from 'components/Modal/x-mark.svg';
import { ReactComponent as IconMenu } from './Hamburger.svg';
import { ReactComponent as IconHome } from './Logo.svg';
import { ReactComponent as IconModules } from './Modules.svg';
import { ReactComponent as IconNotebook } from './Notebook.svg';

import styles from './Sidebar.module.css';

type SidebarProps = {
  children?: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const { pathname } = useLocation();

  const menuRef = useRef<HTMLUListElement>(null);

  const toogleMobileMenu = () => {
    menuRef.current?.classList.toggle('active');
  };

  useEffect(() => {
    const focusableElements = menuRef.current?.querySelectorAll('a, button');
    const firstElement =
      focusableElements && (focusableElements[0] as HTMLElement);
    const lastElement =
      focusableElements &&
      (focusableElements[focusableElements.length - 1] as HTMLElement);

    const focusTrap = (e: KeyboardEvent) => {
      if (
        window.innerWidth > 768 ||
        !menuRef.current?.classList.contains('active') ||
        e.key !== 'Tab'
      )
        return;

      const isWithinMenu = menuRef.current?.contains(document.activeElement);

      if (e.shiftKey) {
        if (!isWithinMenu || document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else if (!isWithinMenu || document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    window.addEventListener('keydown', focusTrap);

    return () => {
      window.removeEventListener('keydown', focusTrap);
    };
  }, []);

  useEffect(() => {
    menuRef.current?.classList.remove('active');
  }, [pathname]);

  return (
    <nav className={styles['nav-bar']}>
      <div className={styles['mobile-menu-container']}>
        <button
          type="button"
          className={styles['mobile-menu']}
          onClick={toogleMobileMenu}
        >
          <IconMenu />
        </button>
      </div>
      <div className={styles['home-container']}>
        <Link
          to="/"
          className={styles['home-link']}
        >
          <IconHome className={styles['home-icon']} />
        </Link>
      </div>
      <ul
        className={styles['menu-container']}
        ref={menuRef}
      >
        <div className={styles['close-button-container']}>
          <button
            className={styles['close-button']}
            type="button"
            onClick={toogleMobileMenu}
          >
            <IconClose />
          </button>
        </div>
        <li className={`${styles['link-container']} ${styles.classes}`}>
          <NavLink to="/classes">
            <IconModules />
            <span>Mis Clases</span>
          </NavLink>
        </li>
        <li className={`${styles['link-container']} ${styles.assignments}`}>
          <NavLink to="/assignment">
            <IconNotebook />
            <span>Actividades</span>
          </NavLink>
        </li>
        {children &&
          Children.map(children, (navLink, index) => (
            <li
              key={`NavBarLink-${index}`}
              className={styles['link-container']}
            >
              {navLink}
            </li>
          ))}
      </ul>
    </nav>
  );
}

Sidebar.defaultProps = {
  children: null,
};
