import { Component } from "react";
import styles from './adminComments.module.css'
import request from "../../../utils/request";
import CommentItem from "./comment-item/CommentItem";

  const commentsUrl = `${import.meta.env.VITE_APP_SERVER_URL}/data/comments`

export default class AdminComments extends Component{
  constructor(props){
    super(props);

    this.state = {
      comments: []
    }
  }

  async componentDidMount(){
    const comments = await request.get(commentsUrl)
    console.log(comments);
    
    this.setState({comments})
    
    
  }

  deleteCommentHandler(commentId){
    console.log('delete',commentId);
    this.setState({
      comments: this.state.comments.filter(comment => comment._id !== commentId)
    });
  }

  componentDidUpdate(){
    console.log('comp updated');
    
  }


  render(){
    
if(Math.random()< 0.5){
  throw new Error('Error while rendering')
}

    return(
      <ul className={styles['admin-section']}>
        {this.state.comments.map(comment=> <CommentItem key={comment._id} 
        id={comment._id} 
        content={comment.comment} 
        onDelete={this.deleteCommentHandler.bind(this)}/>)}
      </ul>
    )
  }
}