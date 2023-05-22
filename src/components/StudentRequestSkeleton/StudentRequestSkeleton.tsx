import React from 'react';
import { HEADERS } from 'components/StudentRequestTable/StudentRequestTable';
import style from './StudentRequestSkeleton.module.css';

type Props = {
  skeletons: number;
};

function RequestRow() {
  return (
    <tr className={style.request}>
      {Array.from({ length: HEADERS.length }, (_val, index) => (
        <td
          className={style['td-skeleton']}
          key={index}
        >
          <div className={style.skeleton} />
        </td>
      ))}
    </tr>
  );
}

export default function StudentRequestSkeleton({ skeletons }: Props) {
  return (
    <table className={style['table-skeleton']}>
      <thead>
        <RequestRow />
      </thead>
      <tbody>
        {Array.from({ length: skeletons }, (_, index) => (
          <RequestRow key={index} />
        ))}
      </tbody>
    </table>
  );
}
