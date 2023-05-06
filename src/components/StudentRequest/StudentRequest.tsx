import React, { useState, useRef, useEffect } from 'react';
import { sortStudents } from 'utils/sortStudentRequests/sortStudents';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import style from './StudentRequest.module.css';

export interface Request {
  class_id: string;
  subject_name: string;
  subject_id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  requested_date: string;
}

const data: Request[] = [
  {
    class_id: '502',
    subject_id: 'TC1028',
    subject_name: 'Object Oriented Programming',
    student_id: 'A01731416',
    first_name: 'John',
    last_name: 'Wayne',
    requested_date: '04/06/2022',
  },
  {
    class_id: '111',
    subject_id: 'PM5402',
    subject_name: 'Project Management',
    student_id: 'A01481857',
    first_name: 'Carlos',
    last_name: 'Morales',
    requested_date: '09/15/2022',
  },
  {
    class_id: '007',
    subject_id: 'LI3000',
    subject_name: 'Literature Studies',
    student_id: 'A09183957',
    first_name: 'Mike',
    last_name: 'Green',
    requested_date: '12/01/2022',
  },
  {
    class_id: '502',
    subject_id: 'EC2019',
    subject_name: 'Economics',
    student_id: 'A03215390',
    first_name: 'Emily',
    last_name: 'Wilson',
    requested_date: '07/23/2022',
  },
  {
    class_id: '111',
    subject_id: 'MA4087',
    subject_name: 'Advanced Mathematics',
    student_id: 'A07762541',
    first_name: 'Sophia',
    last_name: 'Anderson',
    requested_date: '05/10/2022',
  },
  {
    class_id: '007',
    subject_id: 'PH7503',
    subject_name: 'Philosophy of Mind',
    student_id: 'A02846925',
    first_name: 'Emma',
    last_name: 'Parker',
    requested_date: '11/18/2022',
  },
  {
    class_id: '502',
    subject_id: 'CS2056',
    subject_name: 'Database Management',
    student_id: 'A09987563',
    first_name: 'Matthew',
    last_name: 'Harris',
    requested_date: '03/27/2022',
  },
  {
    class_id: '111',
    subject_id: 'EN6024',
    subject_name: 'English Literature',
    student_id: 'A05573249',
    first_name: 'Olivia',
    last_name: 'Turner',
    requested_date: '08/05/2022',
  },
  {
    class_id: '502',
    subject_id: 'PY4091',
    subject_name: 'Experimental Psychology',
    student_id: 'A02148756',
    first_name: 'Daniel',
    last_name: 'Baker',
    requested_date: '06/14/2022',
  },
  {
    class_id: '111',
    subject_id: 'CH3032',
    subject_name: 'Chemical Engineering',
    student_id: 'A08263547',
    first_name: 'Sophie',
    last_name: 'Wright',
    requested_date: '09/30/2022',
  },
];

const headers = [
  'Grupo',
  'Nombre',
  'Apellidos',
  'Matrícula',
  'Fecha',
  'Acciones',
];

// To check which sort rule is active and set it as blue
function isActive(
  sortRule: { [key: string]: string },
  header: string,
  value: 'Up' | 'Down'
) {
  if (sortRule.element === header && sortRule.value === value)
    return style[`active-${value}`];
  return '';
}

export default function StudentRequest() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortRule, setSortRule] = useState<{ [key: string]: string }>({
    element: 'Grupo',
    value: 'Up',
  });
  const [filterValue, setFilterValue] = useState<string>('Todos los grupos');
  const [isListOpen, setIsListOpen] = useState(false);
  const isAllSelected = selectedRows.length === data.length && data.length > 0;
  const sortedData = sortStudents(
    data,
    sortRule.element,
    sortRule.value
  ).filter((request) => {
    if (filterValue === 'Todos los grupos' || isListOpen) return request;
    const row = `${request.subject_id}.${request.class_id}`;
    return row === filterValue;
  });
  // To display on dropdown menu
  const allGroups = data.map(
    (request) => `${request.subject_id}.${request.class_id}`
  );
  const filteredGroups = [
    ...allGroups.filter((group) => {
      if (filterValue === 'Todos los grupos') return group;
      return group.includes(filterValue);
    }),
    'Todos los grupos',
  ];

  const autoComplete = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoComplete.current) autoComplete.current.value = filterValue;
  }, [filterValue]);

  //  Handles which rows are selected
  function handleSelect(row: string) {
    const index = selectedRows.indexOf(row);
    if (index === -1) {
      setSelectedRows([...selectedRows, row]);
    } else {
      const newRows = [...selectedRows];
      newRows.splice(index, 1);
      setSelectedRows(newRows);
    }
  }

  function handleSelectAll() {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const allSelectedRows = data.map(
        (request) =>
          `${request.subject_id}.${request.class_id}.${request.student_id}`
      );
      setSelectedRows(allSelectedRows);
    }
  }

  function selectGroup(group: string) {
    if (autoComplete.current) autoComplete.current.value = group;
    setFilterValue(group);
    setIsListOpen(false);
  }

  const onFilterChange = (_id: string, value: string) => {
    setFilterValue(value);
  };

  return (
    <div className={style['request-container']}>
      <div className={style['request-shortcuts']}>
        <div className={style.filter}>
          <InputField
            ref={autoComplete}
            className={style['join-request']}
            value={filterValue}
            label="Filtrar por grupo"
            type="text"
            id="join-request"
            error=""
            required
            handleFocus={() => setIsListOpen(true)}
            handleChange={onFilterChange}
            handleBlur={() => {}}
          />
          {isListOpen && (
            <ul className={style['autocomplete-list']}>
              {filteredGroups.map((group) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <li
                  key={group}
                  onClick={() => selectGroup(group)}
                >
                  {group}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={style['selected-shortcuts']}>
          <Button
            location="accept-selected"
            text="Aceptar seleccionados"
            onClickHandler={() => []}
            type="button"
            isDisable={selectedRows.length === 0 && isListOpen}
          />
          <Button
            location="decline-selected"
            text="Rechazar seleccionados"
            onClickHandler={() => []}
            type="button"
            isDisable={selectedRows.length === 0 && isListOpen}
          />
        </div>
      </div>
      <table>
        <thead>
          {headers.map((header) => (
            <th>
              <div className={style['header-element']}>
                {header !== 'Acciones' && (
                  <div className={style['sort-buttons']}>
                    <button
                      className={`${style.up} ${isActive(
                        sortRule,
                        header,
                        'Up'
                      )}`}
                      onClick={() =>
                        setSortRule({ element: header, value: 'Up' })
                      }
                      type="button"
                    >
                      Ordenar ascendientemente
                    </button>
                    <button
                      className={`${style.down} ${isActive(
                        sortRule,
                        header,
                        'Down'
                      )}`}
                      onClick={() =>
                        setSortRule({ element: header, value: 'Down' })
                      }
                      type="button"
                    >
                      Ordenar descendientemente
                    </button>
                  </div>
                )}
                {header === 'Acciones' && (
                  <Button
                    location={
                      isAllSelected ? 'all-requests' : 'not-all-requests'
                    }
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
        </thead>
        <tbody>
          {data.length === 0 && <h2>Sin solicitudes pendientes</h2>}
          {!isListOpen &&
            sortedData.map((request) => {
              const row = `${request.subject_id}.${request.class_id}.${request.student_id}`;
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
                      {request.requested_date}
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
                      <Button
                        location="accept-request"
                        text="Aceptar"
                        onClickHandler={() => []}
                        type="button"
                        isDisable={false}
                      />
                      <Button
                        location="decline-request"
                        text="Rechazar"
                        onClickHandler={() => []}
                        type="button"
                        isDisable={false}
                      />
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
