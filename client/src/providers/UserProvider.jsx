import { UserContext } from "../contexts/userContext";
import usePersistedState from "../hooks/usePersistedState.js";

export function UserProvider({children}){
  const [authData, setAuthData] = usePersistedState({});

  const userLoginHandler = (resultData) => {
    console.log(resultData);
    
    setAuthData(resultData);
  }

  const userLogoutHandler = () => {
    setAuthData({})
  }

  return (
    <UserContext.Provider value={{...authData, userLoginHandler, userLogoutHandler}}>
      {children}
    </UserContext.Provider>
  )
}