import request from "../utils/request";

const baseUrl = `${import.meta.env.VITE_APP_SERVER_URL}/jsonstore/comments`;

export default {
  create (email, gameId, comment){
    return request.post(baseUrl, {email, gameId, comment})
  },
  async getAll(gameId){
    const comments = await request.get(baseUrl);
    const result = Object.values(comments).filter(comment=> comment.gameId === gameId);
    return result;
  }
}