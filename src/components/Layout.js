import React from 'react';
import './Layout.css';
export default class Layout extends React.Component {
  render(){
    const kids = React.Children.toArray(this.props.children),
          c1 = kids[0],
          c2 = kids[1],
          c3 = kids[2],
          c4 = kids[3],
          c5 = kids[4];

    return(
      <div id="main">
        <div id="left">{c1}</div>
        <div id="right">
          <div id="top">{c5}</div>
          <div id="bottom">{c2}{c3}{c4}</div>
        </div>
      </div>
    )
  }
}
