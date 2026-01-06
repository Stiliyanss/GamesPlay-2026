import { useContext, useOptimistic  } from "react";
import { Link, useParams, useNavigate } from "react-router";
import CommentsShow from "../comments-show/CommentsShow";
import CommentsCreate from "../comments-create/CommentsCreate";
import { UserContext } from "../../contexts/userContext";
import { useDeleteGame, useGame } from "../../api/gameApi";
import { useComments, useCreateComment } from "../../api/commentApi";
import {v4 as uuid} from 'uuid'

export default function GameDetails() {
    const navigate = useNavigate()
    const {email,_id} = useContext(UserContext);
    const {gameId} = useParams();
    const {game} = useGame(gameId);
    const {deleteGame} = useDeleteGame()
    const {comments, addComment} = useComments(gameId);
    const [optimisticComments, setOptimisticComments] = useOptimistic(comments);
    const {create} = useCreateComment()

    const isOwner = _id===game._ownerId;
    
    const gameDeleteClickHandler =async () => {
    const hasConfirm = confirm(`Are you sure you want to delete ${game.title}`);
    if(!hasConfirm){
    return;
    }
    await deleteGame(gameId);

    navigate('/games')
    }

    const commentCreateHandler = async(comment)=>{
        //optimistic update
        const newOptimisticComment = {
            _id: uuid(),
            gameId,
            comment,
            pending:true, 
        }

    setOptimisticComments(optimisticState => [...optimisticState, newOptimisticComment])
    //server update
    const commentResult = await create(gameId,comment);
      
    //local state update
      addComment(commentResult);
    }

    return(
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

              <CommentsShow comments={optimisticComments}/>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner && 
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    <button onClick={gameDeleteClickHandler} className="button">Delete</button>
                </div>}
            </div>

            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
         <CommentsCreate email={email} gameId={gameId} onCreate={commentCreateHandler}/>

        </section>
    );
}