import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Registration } from '../components/Auth/Registration/Registration';
import { Login } from '../components/Auth/Login/Login';
import { ForgotPassword } from '../components/Auth/ForgotPassword/ForgotPassword';
import { CheckEmail } from '../components/Auth/ForgotPassword/CheckEmail/CheckEmail';
import { CreateNewPassword } from '../components/Auth/CreateNewPassword/CreateNewPassword';

function App() {
  return (
    <div className="App">
      <Registration />
      <Login />
      <ForgotPassword />
      <CreateNewPassword />
      <CheckEmail />
    </div>
  );
}

export default App;
