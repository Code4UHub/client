import React from 'react';

import style from './StudentRequestSkeleton.module.css';

const HEADERS = 6;

type Props = {
  skeletons: number;
};

function RequestRow() {
  return (
    <tbody>
      <tr className={style.request}>
        {Array.from({ length: HEADERS }, (_val, index) => (
          <td
            className={style['td-skeleton']}
            key={index}
          >
            <div className={style.skeleton} />
          </td>
        ))}
      </tr>
    </tbody>
  );
}

export default function StudentRequestSkeleton({ skeletons }: Props) {
  return (
    <table>
      {Array.from({ length: skeletons }, (_, index) => (
        <RequestRow key={index} />
      ))}
    </table>
  );
}
