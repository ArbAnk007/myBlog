import React, { useEffect, useState } from 'react';
import authService from './lib/auth';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserStatus } from './features/authSlice';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("")
  const dispatch = useDispatch()
  const userData = useSelector(state => state.user)

  useEffect( () => {

    authService.getCurrentUser()
    .then( (response) => {
      if(response!==undefined){
        dispatch(updateUserStatus({isLoggedIn: true, userInfo: response}))
        setUser(response.name)
        setLoading(false)
      }else{
        dispatch(updateUserStatus({isLoggedIn: false, userInfo: null}))
      }
    } )
    
  }, [] )

  return (
    !loading ? <div>Hello {user}</div> : <div>LogIn to view blogs</div>
  );
};

export default App;
