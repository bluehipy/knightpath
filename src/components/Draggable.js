import React from "react";
export default class Draggable extends React.Component {
  render(){
    return <div draggable="true" {...this.props}/>
  }
}
