import React from 'react';

import { RootState } from 'store/store';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from 'store/user/userSlice';

function App() {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOut = () => {
    dispatch(updateUser(null));
    navigate('/');
  };

  const assignment = () => {
    navigate('/assignment');
  };

  return (
    <div>
      <h1>Aqui va el dashboard</h1>
      <p>User:</p>
      <p>{user?.first_name}</p>
      <p>{user?.role}</p>
      <p>{user?.email}</p>
      <p>{user?.authToken}</p>
      <button
        type="button"
        onClick={logOut}
      >
        Cerrar Sesion
      </button>
      <button
        type="button"
        onClick={assignment}
      >
        Ir a assignment
      </button>
    </div>
  );
}

export default App;
