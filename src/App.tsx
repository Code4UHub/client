import React from 'react';

import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
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
  const dispatch = useDispatch();
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
