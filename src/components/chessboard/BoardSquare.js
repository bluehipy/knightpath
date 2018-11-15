import React from "react";
class BoardSquare extends React.Component {
  onDrop(event) {
    const props = this.props,
      onDrop = props && props.onDrop;

    event.preventDefault();
    onDrop && onDrop(event);
  }
  render() {
    const props = this.props,
      state = this.state,
      markup = props && props.markup,
      listClasses = []
        .concat(["sq"], markup || [])
        .join(" ");

    return (
      <div
        className={listClasses}
        onDrop={this.onDrop.bind(this)}
      />
    );
  }
}

export default BoardSquare;
