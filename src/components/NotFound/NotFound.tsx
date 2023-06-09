import React from 'react';
import { Link } from 'react-router-dom';

import im from './image.png';
import style from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={style.container}>
      <h1 id={style.title}>Oopss, no encontramos esta página</h1>
      <img
        className={style.img}
        src={im}
        alt="Libro sin página encontrada, como esta página web"
      />

      <Link to="/">
        <span id={style.link}>Regresar a mis clases</span>
      </Link>
    </div>
  );
}
