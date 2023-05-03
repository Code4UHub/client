import React from "react";
import style from './Loading.module.css';

type Props = {
    type: 'bar' | 'spinner';
}

export default function Loading({ type }: Props) {
    return (
        <div className={style['loading-container']}>
            <div className={style[type]}/>
        </div>
    )
}