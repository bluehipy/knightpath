import React from "react";

export default class Draggable extends React.Component {
  onDragStart(event) {
    const props = this.props;
    event.dataTransfer && event.dataTransfer.setData("text", props.transport);
    props.onDragStart && props.onDragStart(event);
  }
  render(){
    const {onDragStart, ...props} = this.props;
    return <div onDragStart={this.onDragStart.bind(this)} draggable="true" {...props}/>
  }
}
