import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { fetchUser } from './utilities/fetchUser';

// importing all the required  components
import { Home, Login, Register } from './components/index';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if(!user) navigate('/login');
// eslint-disable-next-line
  }, [])


  return (
    <Routes>
      <Route exact path="/*" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;