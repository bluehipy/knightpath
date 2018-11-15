import React, { Component } from 'react';
import ChessBoard from './components/chessboard/ChessBoard';
import './App.css';

class App extends Component {
  render() {
    const data = [
      '- - - - - - - - ',
      '- - - - - P2 - - ',
      '- - - - - - - - ',
      '- - - - - - - - ',
      '- - QN1 - - - - - ',
      '- - - - - - - - ',
      '- - - - - - - - ',
      '- - - - - - - - '
    ];
    return (
      <ChessBoard data={data}/>
    );
  }
}

export default App;
