import React, { useEffect, useState } from 'react';

import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import { Toast, toastTime } from 'components/Toast/Toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateUser } from 'store/user/userSlice';

type User = {
  student_id?: string;
  teacher_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

function App() {
  const user = useSelector(
    (state: RootState) => state.currentUser as unknown as User
  );
  const [toastValue, setToastValue] = useState<{ [key: string]: string }>({
    title: "",
    message: "",
  }); 
  const hasToastValue = toastValue.title !== "" && toastValue.message !== "";
  const dispatch = useDispatch();
  const {state} = useLocation();

  useEffect(() => {
    if (state) {
      const {title, message} = state;
      setToastValue({title, message})
      setTimeout(() => {
        setToastValue({title: "", message: ""});
      }, toastTime)
    }
  }, [state])
  const navigate = useNavigate();


  const logOut = () => {
    dispatch(updateUser(null));
    navigate('/');
  };

  const assignment = () => {
    navigate('/assignment')
  }

  return (
    <div>
      {hasToastValue && <Toast type="success" title={toastValue.title} message={toastValue.message} />}
      <h1>Aqui va el dashboard</h1>
      <p>User:</p>
      <p>{user.email}</p>
      <button type="button" onClick={logOut}>
        Cerrar Sesion
      </button>
      <button type="button" onClick={assignment}>Ir a assignment</button>
    </div>
  );
}

export default App;
