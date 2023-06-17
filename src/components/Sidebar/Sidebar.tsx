import React, { Children, ReactNode, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/user/userSlice';
import { updateToast } from 'store/toast/toastSlice';
import { ReactComponent as IconClose } from 'components/Modal/x-mark.svg';
import { ReactComponent as IconMenu } from './Hamburger.svg';
import { ReactComponent as IconHome } from './Logo.svg';
import { ReactComponent as IconModules } from './Modules.svg';
import { ReactComponent as IconNotebook } from './Notebook.svg';
import { ReactComponent as IconLogout } from './Logout.svg';

import styles from './Sidebar.module.css';

type SidebarProps = {
  children?: ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuRef = useRef<HTMLUListElement>(null);

  const toogleMobileMenu = () => {
    menuRef.current?.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  const logout = () => {
    dispatch(updateUser(null));
    dispatch(
      updateToast({
        message: 'Has cerrado sesión',
        title: 'Sucess',
        type: 'success',
      })
    );
    navigate('/auth');
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
    document.body.classList.remove('no-scroll');
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
        <div className={styles['nav-links-container']}>
          <li className={`${styles['link-container']} ${styles.classes}`}>
            <NavLink to="/classes">
              <IconModules />
              <span>Mis Clases</span>
            </NavLink>
          </li>
          <li className={`${styles['link-container']} ${styles.assignments}`}>
            <NavLink to="/homework">
              <IconNotebook />
              <span>Mis Tareas</span>
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
          <li>
            <div className={styles['logout-container-mobile']}>
              <button
                type="button"
                className={styles.logout}
                onClick={logout}
              >
                <IconLogout className={styles['home-icon']} />
                Cerrar Sesión
              </button>
            </div>
          </li>
        </div>
      </ul>
      <div className={styles['logout-container']}>
        <button
          type="button"
          className={styles.logout}
          onClick={logout}
        >
          <IconLogout className={styles['home-icon']} />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

Sidebar.defaultProps = {
  children: null,
};
