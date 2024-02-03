import React, { useEffect } from 'react';
import { Header, Footer, Container } from "./components"
import { useDispatch } from 'react-redux';
import authService from './lib/auth';
import { updateUserStatus } from './features/authSlice';
import "./styles/App.css"
import { Outlet } from 'react-router-dom';
import databaseService from './lib/database';
import storageService from './lib/storage';

const App = () => {

  const dispatch = useDispatch()

  useEffect( () => {
    authService.getCurrentUser()
    .then( (response) => {if(response!==undefined && response!=false){dispatch(updateUserStatus({isLoggedIn: true, userInfo: response}))}} )
  }, [] )

  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default App;
