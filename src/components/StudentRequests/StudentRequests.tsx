import React, { useState, useRef, useEffect } from 'react';
import { sortStudents } from 'utils/sortStudentRequests/sortStudents';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import { StudentRequest } from 'types/StudentRequest/StudentRequest';
import StudentRequestTable, {
  SortRule,
  HEADERS,
} from 'components/StudentRequestTable/StudentRequestTable';

import { RootState } from 'store/store';
import {
  getStudentRequests,
  respondOneStudentRequest,
  respondManyStudentRequest,
} from 'utils/db/db.utils';
import { setLoading, removeLoading } from 'store/loading/loadingSlice';
import { updateToast, TOAST_GENERAL_ERRORS } from 'store/toast/toastSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './StudentRequests.module.css';

export default function StudentRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.currentUser);

  // Complete array of Student Requests
  const [data, setData] = useState<StudentRequest[]>([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState<string>('Todos los grupos');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortRule, setSortRule] = useState<SortRule>({
    element: HEADERS[0],
    value: 'Up',
  });

  // Get information from db on requests
  useEffect(() => {
    if (user?.role !== 'teacher') {
      navigate('/');
    }
    dispatch(setLoading());
    setIsLoading(true);
    const getStudentRequestList = async () => {
      const response = await getStudentRequests(
        user?.authToken as string,
        user?.id as string
      );
      if (response.status === 'success')
        setData(response.data as StudentRequest[]);
      dispatch(removeLoading());
      setIsLoading(false);
    };
    getStudentRequestList();
    // eslint-disable-next-line
  }, []);

  const isAllSelected = selectedRows.length === data.length && data.length > 0;

  // Get requests sorted by buttons and filtered by values
  const sortedData = sortStudents(
    data,
    sortRule.element,
    sortRule.value
  ).filter((request) => {
    if (filterValue === 'Todos los grupos' || isListOpen) return request;
    const row = `${request.subject_id}.${request.class_id}`;
    return row === filterValue;
  });

  // To display on dropdown menu all unique groups from students
  const allGroups = [
    'Todos los grupos',
    ...data
      .map((request) => `${request.subject_id}.${request.class_id}`)
      .filter((value, index, array) => array.indexOf(value) === index),
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
          `${request.subject_id}<${request.class_id}<${request.student_id}`
      );
      setSelectedRows(allSelectedRows);
    }
  }

  // When user chooses to filter per group
  function selectGroup(group: string) {
    if (autoComplete.current) autoComplete.current.value = group;
    setFilterValue(group);
    setIsListOpen(false);
    setSelectedRows([]);
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  function extractRowInfo(row: string) {
    const values = row.split('<');
    const subject_id = values[0];
    const class_id = values[1];
    const student_id = values[2];
    return { subject_id, class_id, student_id };
  }
  async function handleAction(
    action: 'accept' | 'reject',
    multiplicity: 'one' | 'many',
    row: string
  ) {
    dispatch(setLoading());
    if (multiplicity === 'one') {
      const { class_id, student_id } = extractRowInfo(row);
      try {
        const response = await respondOneStudentRequest(
          user?.authToken as string,
          class_id,
          student_id,
          action
        );
        dispatch(
          updateToast({
            title: response.status,
            message: response.data,
            type: response.status === 'success' ? response.status : 'error',
          })
        );
      } catch (error) {
        dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
      }
    }
    if (multiplicity === 'many') {
      const rows = selectedRows.map((r) => {
        const { class_id, student_id } = extractRowInfo(r);
        return { class_id, student_id };
      });
      try {
        const response = await respondManyStudentRequest(
          user?.authToken as string,
          rows,
          action
        );
        dispatch(
          updateToast({
            title: response.status,
            message: response.data,
            type: response.status === 'success' ? response.status : 'error',
          })
        );
      } catch (error) {
        dispatch(updateToast(TOAST_GENERAL_ERRORS.SYSTEM));
      }
    }
    dispatch(removeLoading());
    // window.location.reload();
  }
  /* eslint-enable @typescript-eslint/naming-convention */

  const onFilterChange = (_id: string, value: string) => {
    setFilterValue(value);
  };

  return (
    <>
      <SectionHeader title="Solicitud de registro de estudiantes" />
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
                {allGroups.map((group) => (
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
          {!isLoading && (
            <div className={style['selected-shortcuts']}>
              <Button
                location="accept-selected"
                text="Aceptar seleccionados"
                onClickHandler={() => handleAction('accept', 'many', '')}
                type="button"
                isDisable={selectedRows.length === 0 || isListOpen}
              />
              <Button
                location="decline-selected"
                text="Rechazar seleccionados"
                onClickHandler={() => handleAction('reject', 'many', '')}
                type="button"
                isDisable={selectedRows.length === 0 || isListOpen}
              />
            </div>
          )}
        </div>

        <StudentRequestTable
          sortRule={sortRule}
          setSortRule={setSortRule}
          isLoading={isLoading}
          isListOpen={isListOpen}
          isAllSelected={isAllSelected}
          handleSelect={(row: string) => handleSelect(row)}
          handleSelectAll={() => handleSelectAll()}
          handleAction={(
            a: 'accept' | 'reject',
            m: 'one' | 'many',
            r: string
          ) => handleAction(a, m, r)}
          sortedData={sortedData}
          selectedRows={selectedRows}
        />
      </div>
    </>
  );
}
