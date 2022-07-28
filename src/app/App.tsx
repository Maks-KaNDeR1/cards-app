import React, { useEffect } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Registration } from '../components/Auth/Registration/Registration';
import { Login } from '../components/Auth/Login/Login';
import { ForgotPassword } from '../components/Auth/ForgotPassword/ForgotPassword';
import { CheckEmail } from '../components/Auth/ForgotPassword/CheckEmail/CheckEmail';
import { CreateNewPassword } from '../components/Auth/CreateNewPassword/CreateNewPassword';
import { initializeApp } from './app-reducer';
import { useAppDispatch, useAppSelector } from '../utils/hook';
import { Spin } from 'antd';
import { Profile } from '../components/Profile/Profile';
import { PATH } from '../utils/const-enum-path';

function App() {

  const dispatch = useAppDispatch()


  const { initialized, statusLoading } = useAppSelector(state => state.app)


  useEffect(() => {
    dispatch(initializeApp())

  }, [])

  // if (!isInitialized) {
  //   return <div
  //     style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
  //     <Spin size='large' />
  //   </div>
  // }


  return (
    <div className="App">
      {statusLoading && <Spin size='large' />}
      <Profile />
      <Login />
      <Registration />
      <ForgotPassword />
      <CreateNewPassword />
      <CheckEmail />
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.profile} />} />
        <Route path={PATH.login} element={<Login />} />
        <Route path={PATH.registration} element={<Registration />} />
        <Route path={PATH.profile} element={<Profile />} />
        {/* <Route path={PATH.packsList} element={<PacksList/>}/> */}
        {/* <Route path={PATH.error} element={<Error404/>}/> */}
        <Route path={PATH.forgotPassword} element={<ForgotPassword />} />
        <Route path={PATH.newPassword + "/:token"} element={<CreateNewPassword />} />
        <Route path={PATH.checkEmail} element={<CheckEmail />} />
        {/* <Route path={PATH.cardsPack + `/:packId`} element={<CardsPage/>}/> */}
        {/* <Route path={PATH.learnPack + `/:packId`} element={<LearnPackModal />}/> */}
      </Routes>
    </div>
  );
}

export default App;
