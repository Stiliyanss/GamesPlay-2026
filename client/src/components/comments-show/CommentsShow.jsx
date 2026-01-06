import styles from './CommentsShow.module.css'

export default function CommentsShow({comments}) {
    return(
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                      {comments.length >0 ? 
                      comments.map((comment) => (
                      <li key={comment._id} className={`comment ${comment.pending ? styles['comment-pending'] : ''}`.trim()}>
                         <p>{comment.email? comment.email : "unknown"}: {comment.comment}</p>
                      </li>
                      )) : (<p className="no-comment">No comments.</p>)}
                        
                      
                    </ul>
                    
                </div>
    );
}