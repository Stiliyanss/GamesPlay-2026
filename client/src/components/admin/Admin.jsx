import {Component} from "react";
import AdminComments from "./admin-comments/AdminComments";
import ErrorBoundary from "../error-boundary/ErrorBoundary";

export default class Admin extends Component{
  render(){
    return(
      <ErrorBoundary>
      <h1>Admin Section</h1>
      <AdminComments/>
      </ErrorBoundary>
      
    )
  }
}

