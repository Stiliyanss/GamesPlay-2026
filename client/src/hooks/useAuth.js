import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function useAuth (){
  const {accessToken} = useContext(UserContext);

  const options = {
    headers: {
      'X-Authorization': accessToken,
    }
  };

  return{
    accessToken,
    options,
    isAuthenticated: !!accessToken
  }
}