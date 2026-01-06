import request from "../utils/request";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/jsonstore/games`;

export default {
   create (gameData){
    return request.post(baseUrl, gameData); 
  },
  async getAll (){
    const result = await request.get(baseUrl);
    const games = Object.values(result)
    return games;
  },
  getOne (gameId){
    return request.get(`${baseUrl}/${gameId}`);
  },
  deleteOne (gameId){
    return request.delete(`${baseUrl}/${gameId}`)
  },
  edit (gameId, gameData){
    return request.put(`${baseUrl}/${gameId}`, {...gameData, _id:gameId})
  }
}