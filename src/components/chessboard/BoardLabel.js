import React from 'react';
class BoardLabel extends React.Component {
  render () {
    const props = this.props,
          value = (props && props.value) || ' ';

    return <div className="lbl">{value}</div>
  }
}

export default BoardLabel;
