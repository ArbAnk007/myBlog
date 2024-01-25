import React, { useEffect } from 'react';
import { Header, Footer } from "./components"
import { useDispatch, useSelector } from 'react-redux';
import authService from './lib/auth';
import { updateUserStatus } from './features/authSlice';

const App = () => {

  const userInfo = useSelector(state => state?.user?.info)
  const dispatch = useDispatch()

  useEffect( () => {
    authService.getCurrentUser()
    .then( (response) => {if(response!==undefined){dispatch(updateUserStatus({isLoggedIn: true, userInfo: response}))}} )
  }, [] )

  return (
    <>
      <Header />
      <h1 style={{textAlign: "center"}}>Hello {userInfo?.name}</h1>
      <Footer />
    </>
  );
};

export default App;
