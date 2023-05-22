import React from 'react';

import StudentRequestSkeleton from 'components/StudentRequestSkeleton/StudentRequestSkeleton';
import { Button } from 'components/Button/Button';
import { SortButtons } from 'components/SortButtons/SortButtons';

import { StudentRequest } from 'types/StudentRequest/StudentRequest';

import style from './StudentRequestTable.module.css';

export type SortRule = {
  element: string;
  value: 'Up' | 'Down';
};

export const HEADERS = [
  'Grupo',
  'Nombre',
  'Apellidos',
  'Matrícula',
  'Fecha',
  'Acciones',
];

function getActiveSortValues(
  sortRule: SortRule,
  header: string
): 'Up' | 'Down' | 'none' {
  if (sortRule.element === header) {
    return sortRule.value;
  }
  return 'none';
}

type HeaderProps = {
  isAllSelected: boolean;
  sortRule: SortRule;
  setSortRule: Function;
  handleSelectAll: Function;
};

function TableHeaders({
  sortRule,
  setSortRule,
  isAllSelected,
  handleSelectAll,
}: HeaderProps) {
  return (
    <thead>
      <tr>
        {HEADERS.map((header) => (
          <th key={header}>
            <div className={style['header-element']}>
              {header !== 'Acciones' && (
                <SortButtons
                  group={header}
                  updateSortRule={setSortRule}
                  active={getActiveSortValues(sortRule, header)}
                />
              )}
              {header === 'Acciones' && (
                <Button
                  location={isAllSelected ? 'all-requests' : 'not-all-requests'}
                  text="Seleccionar"
                  onClickHandler={() => handleSelectAll()}
                  type="button"
                  isDisable={false}
                />
              )}
              <span className={style['header-name']}>{header}</span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

type TableProps = {
  sortRule: SortRule;
  setSortRule: Function;
  isLoading: boolean;
  isListOpen: boolean;
  isAllSelected: boolean;
  handleAction: Function;
  handleSelect: Function;
  handleSelectAll: Function;
  sortedData: StudentRequest[];
  selectedRows: string[];
};

export default function StudentRequestTable({
  sortRule,
  setSortRule,
  isLoading,
  isListOpen,
  isAllSelected,
  handleAction,
  handleSelect,
  handleSelectAll,
  sortedData,
  selectedRows,
}: TableProps) {
  if (isLoading) return <StudentRequestSkeleton skeletons={10} />;
  if (!isLoading && sortedData.length === 0)
    return (
      <h2 className={style['no-requests']}> Sin solicitudes pendientes</h2>
    );
  return (
    <div className={style['table-container']}>
      <table className={style.table}>
        <TableHeaders
          isAllSelected={isAllSelected}
          sortRule={sortRule}
          setSortRule={setSortRule}
          handleSelectAll={handleSelectAll}
        />
        <tbody>
          {!isListOpen &&
            sortedData.map((request) => {
              // Using a special char that is not allowed in forms, to ensured that it is not part of any attributes
              const row = `${request.subject_id}<${request.class_id}<${request.student_id}`;
              const isSelected = selectedRows.includes(row);
              return (
                <tr
                  key={`${request.subject_id}.${request.class_id}.${request.student_id}`}
                  className={
                    isSelected
                      ? style['request-selected']
                      : style['request-row']
                  }
                >
                  <td>
                    <span className={style['request-element']}>
                      {request.subject_id}.{request.class_id}
                    </span>
                  </td>
                  <td>
                    <span className={style['request-element']}>
                      {request.first_name}
                    </span>
                  </td>
                  <td>
                    <span className={style['request-element']}>
                      {request.last_name}
                    </span>
                  </td>
                  <td>
                    <span className={style['request-element']}>
                      {request.student_id}
                    </span>
                  </td>
                  <td>
                    <span className={style['request-element']}>
                      {request.request_date}
                    </span>
                  </td>
                  <td>
                    <div className={style['request-action']}>
                      <Button
                        location={
                          isSelected ? 'selected-request' : 'select-request'
                        }
                        text="Seleccionar"
                        onClickHandler={() => handleSelect(row)}
                        type="button"
                        isDisable={false}
                      />
                      <div className={style['request-buttons']}>
                        <Button
                          location="accept-request"
                          text="Aceptar"
                          onClickHandler={() =>
                            handleAction('accept', 'one', row)
                          }
                          type="button"
                          isDisable={false}
                        />
                        <Button
                          location="decline-request"
                          text="Rechazar"
                          onClickHandler={() =>
                            handleAction('reject', 'one', row)
                          }
                          type="button"
                          isDisable={false}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
