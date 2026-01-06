import { useState } from "react";

export default function usePersistedState(initialState){
  const [state, setState] = useState(()=>{
    const persistedState = localStorage.getItem('auth');
    
    if(!persistedState){
      return initialState
    };

    const persistedStateData = JSON.parse(persistedState);
    
    return persistedStateData;
  });

  const setPersistedState = (data)=>{
    const persistedData = JSON.stringify(data);

    localStorage.setItem('auth', persistedData);

    setState(data); 
  }

  return [
    state, 
    setPersistedState
  ]
}