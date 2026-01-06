import { useContext, useEffect, useRef } from "react";
import request from "../utils/request"
import { UserContext } from "../contexts/userContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/users`;

export const useLogin = () =>{
  const abortRef = useRef();

  const login = async(email, password)=>{
    const result = await request.post(`${baseUrl}/login`, {email, password}, {signal : abortRef.current.signal});

    return result;
  }

  useEffect(()=>{
    const abortController = new AbortController;
    abortRef.current=abortController;

    return ()=> abortController.abort();
  },[])

  return {
    login
  }
}

export const useRegister = ()=>{
  const register = async (email, password) => await request.post(`${baseUrl}/register`, {email, password})

  return {
    register
  }
}

export const useLogout = ()=>{
const {accessToken, userLogoutHandler} = useContext(UserContext);

useEffect(()=>{
  if(!accessToken){
    return;
  }

const opitons = {
  headers:{
  'X-Authorization':accessToken }
}


  request.get(`${baseUrl}/logout`,null, opitons).then(userLogoutHandler);
},[accessToken, userLogoutHandler])

return{
  isLoggedOut: !!accessToken
}

}