import { Component } from "react";
import request from "../../../../utils/request";

export default class CommentItem extends Component{
  async deleteHandler(){
    await request.delete(`${import.meta.env.VITE_APP_SERVER_URL}/data/comments/${this.props.id}`, {
      headers: {
        'X-Admin':'admin'
      }
    })

    this.props.onDelete(this.props.id)
  }

  componentWillUnmount(){
    console.log('Component unmounted');
  }

  render(){
    return(
      <li>{this.props.content} <button onClick={this.deleteHandler.bind(this)}>X</button></li>
    )
  }
}