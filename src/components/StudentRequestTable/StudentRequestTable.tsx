import React from 'react';

import StudentRequestSkeleton from 'components/StudentRequestSkeleton/StudentRequestSkeleton';
import { Button } from 'components/Button/Button';
import { SortButtons } from 'components/SortButtons/SortButtons';

import { StudentRequest } from 'types/StudentRequest/StudentRequest';

import style from './StudentRequestTable.module.css';

export const HEADERS = [
  'Grupo',
  'Nombre',
  'Apellidos',
  'Matrícula',
  'Fecha',
  'Acciones',
];

type HeaderProps = {
  isAllSelected: boolean;
  onUpdateSortRule: Function;
  handleSelectAll: Function;
  getActiveSort: Function;
};

function TableHeaders({
  onUpdateSortRule,
  isAllSelected,
  handleSelectAll,
  getActiveSort,
}: HeaderProps) {
  return (
    <thead>
      <tr>
        {HEADERS.map((header) => (
          <th key={header}>
            <div className={style['header-element']}>
              {header !== 'Acciones' && (
                <SortButtons
                  parameter={header}
                  updateSortRule={onUpdateSortRule}
                  active={getActiveSort(header)}
                />
              )}
              {header === 'Acciones' && (
                <>
                  <Button
                    location={
                      isAllSelected ? 'all-requests' : 'not-all-requests'
                    }
                    text="Seleccionar"
                    onClickHandler={() => handleSelectAll()}
                    type="button"
                    isDisable={false}
                  />
                  <span className={style['header-name']}>{header}</span>
                </>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

const HEADERS_INFO = [
  'subject_id',
  'first_name',
  'last_name',
  'student_id',
  'request_date',
];

type TableProps = {
  onUpdateSortRule: Function;
  isLoading: boolean;
  isListOpen: boolean;
  isAllSelected: boolean;
  getActiveSort: Function;
  handleAction: Function;
  handleSelect: Function;
  handleSelectAll: Function;
  sortedData: StudentRequest[];
  selectedRows: string[];
};

export default function StudentRequestTable({
  onUpdateSortRule,
  isLoading,
  isListOpen,
  isAllSelected,
  getActiveSort,
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
          getActiveSort={getActiveSort}
          onUpdateSortRule={onUpdateSortRule}
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
                  {HEADERS_INFO.map((header) => {
                    if (header === 'subject_id')
                      return (
                        <td key={`${request.subject_id}.${request.class_id}`}>
                          <span className={style['request-element']}>
                            {request.subject_id}.{request.class_id}
                          </span>
                        </td>
                      );
                    return (
                      <td key={request[header as keyof StudentRequest]}>
                        <span className={style['request-element']}>
                          {request[header as keyof StudentRequest]}
                        </span>
                      </td>
                    );
                  })}
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
