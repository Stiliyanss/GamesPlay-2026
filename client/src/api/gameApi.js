import {  useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/games`;

export const useGames = ()=>{
  const [games, setGames] = useState([]);

  useEffect(()=>{
    request.get(baseUrl).then(setGames)
  },[])

  return{
    games
  }
}

export const useGame = (gameId)=>{
  const [game, setGame] = useState({});

  useEffect(()=>{
    request.get(`${baseUrl}/${gameId}`).then(setGame)
  }, [gameId])

  return{
    game,
  }
}

export const useCreateGame = ()=>{
  const {options} = useAuth();

    const create = (gameData) => request.post(baseUrl, gameData, options)
  return{
    create
  }
}

export const useEditGame = ()=>{
  const {options} = useAuth();

  const edit = (gameId, gameData)=>{
    return request.put(`${baseUrl}/${gameId}`, {...gameData, _id: gameId}, options)
  };

  return {edit}
}

export const useDeleteGame = () => {
  const { accessToken } = useAuth();

  const deleteGame = (gameId) => {
    return request.delete(`${baseUrl}/${gameId}`, {headers:{
      "X-Authorization":accessToken
    }});
  };

  return {
    deleteGame
  };
};

export const useLatestGames = () => {
  const [latestGames, setLatestGames] = useState([]);
  const PAGE_SIZE=3;

  useEffect(()=>{
    const searchParams = new URLSearchParams({
      sortBy: '_createdOn desc',
      pageSize: PAGE_SIZE
    })

    request.get(`${baseUrl}?${searchParams.toString()}`).then(setLatestGames)
  },[])

  return {latestGames}
}
