import { useEffect, useReducer } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";
import { useUserContext } from "../contexts/userContext";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/comments`;

function commentReducer(state, action) {
  switch (action.type) {
    case 'GET_ALL':
      return action.payload;
    case 'ADD_COMMENT':
      return [...state, action.payload]
    default:
      return state;
  }
}

export const useComments = (gameId) => {
  // const [comments, setComments] = useState([]);
  const [comments, dispatch] = useReducer(commentReducer, []);

  useEffect(() => {
    const searchParams = new URLSearchParams({
      where: `gameId="${gameId}"`,
      load: `author=_ownerId:users`
    });

    request
      .get(`${baseUrl}?${searchParams.toString()}`)
      .then(result => dispatch({type: 'GET_ALL', payload: result}));

  }, [gameId]);

  return { comments,
          addComment: (commentData)=> dispatch({type: 'ADD_COMMENT', payload: commentData})
   };
};

export const useCreateComment = ()=>{
  const {options} = useAuth();
  const {email} = useUserContext()

  const create = (gameId, comment)=>{
    const commentData = {
      gameId,
      comment,
      email
    }
    return request.post(baseUrl, commentData, options )
  }

  return {
    create,
  }
}