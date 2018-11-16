import React from "react";
class BoardSquare extends React.Component {
  onDrop(event) {
    const props = this.props,
      onDrop = props && props.onDrop,
      data = event.dataTransfer && event.dataTransfer.getData("text");

    event.preventDefault();
    this.setState({ hovered: false }, () => onDrop && onDrop(data));
  }
  onDragOver(event) {
    const props = this.props,
      isFree = props && props.isFree;

    if (isFree) {
      event.preventDefault();
    }
  }
  onDragLeave(event) {
    this.setState({ hovered: false });
  }
  onDragEnter(event) {
    this.setState({ hovered: true });
  }
  render() {
    const props = this.props,
      state = this.state,
      isHovered = state && state.hovered,
      markup = props && props.markup,
      listClasses = []
        .concat(["sq"], markup || [])
        .concat(isHovered ? ["hovered"] : [])
        .join(" ");

    return (
      <div
        className={listClasses}
        onDrop={this.onDrop.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
      />
    );
  }
}

export default BoardSquare;
