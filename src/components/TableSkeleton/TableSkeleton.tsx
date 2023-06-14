import React from 'react';
import style from './TableSkeleton.module.css';

type RowProps = {
  headers: number;
};

function RequestRow({ headers }: RowProps) {
  return (
    <tr className={style.request}>
      {Array.from({ length: headers }, (_val, index) => (
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

type Props = {
  skeletons: number;
  headers: number;
};

export default function TableSkeleton({ skeletons, headers }: Props) {
  return (
    <table className={style['table-skeleton']}>
      <thead>
        <RequestRow headers={headers} />
      </thead>
      <tbody>
        {Array.from({ length: skeletons }, (_, index) => (
          <RequestRow
            headers={headers}
            key={index}
          />
        ))}
      </tbody>
    </table>
  );
}
