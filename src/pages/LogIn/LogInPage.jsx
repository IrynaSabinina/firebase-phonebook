import React, {useState} from 'react';

import { useEffect } from 'react';

import { Home } from '../Home/Home';
import {LoginForm} from "../../components/Login/LoginForm"



export const RegistrationPage =()=>{
 
  const [loged, setLoged] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("userUid")){
      setLoged(true)
      } else {setLoged(false)
      }
      
  },[loged])
  
    return <>
{loged? <Home/> : <LoginForm/> }
     
    </>
    
}