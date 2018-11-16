import React from 'react';
import BoardSquare from './BoardSquare';
import BoardLabel from './BoardLabel';
import './ChessBoard.css';

class ChessBoard extends React.Component {
  static symbols = {
   SEPARATOR: " ",
   EMPTY_CELL: "-",
   SELECTED_CELL: "X",
   WHITE_QUEEN_KNIGHT: "QN1",
   BLACK_PAWN: "P2"
 }
  renderCell(i, j) {
    if(i===0 || i===9 || j===0 || j===9){
      return this.renderLabel(i, j)
    }else{
      return this.renderSquare(i, j);
    }
  }
  renderLabel(i, j) {
    const alpha=" abcdefgh ".split(''),
          nums = " 87654321 ".split(''),
          value = (i===0 || i===9) ? alpha[j] : nums[i];

    return <BoardLabel key={`L${i}x${j}}`} value={value} />
  }
  renderSquare(i, j) {
    const props = this.props,
          data = props && props.data,
          row = data && data[i-1],
          cells = row && row.split(ChessBoard.symbols.SEPARATOR),
          markup = this.getMarkup(cells && cells[j-1], i, j),
          isFree = cells && cells[j-1] && cells[j-1] === ChessBoard.symbols.EMPTY_CELL;

    return <BoardSquare key={`C${i}x${j}}`} isFree={isFree} markup={markup} onDrop={this.onDrop.bind(this, i, j)}/>
  }
  getMarkup(code, i, j){
    const classes = [],
          isBlack = i%2 ? (j+1)%2 : j%2;

    classes.push(isBlack ? 'black' : 'white');

    if(typeof code === 'undefined') return classes;

    const className = code.toUpperCase();

    if(className !== ChessBoard.symbols.EMPTY_CELL) {
        classes.push(className);
    }
    // As a rule white figures will end in 1 and black ones in 2
    if(className.match(/1$/)) {
      classes.push('withWhite');
    }
    if(className.match(/2$/)) {
      classes.push('withBlack');
    }
    return classes;
  }
  onDrop(i, j, data) {
    const props = this.props,
          onDrop = props && props.onDrop;

    onDrop && onDrop(i, j, data);
  }
  render () {
    const children = [];
    for(let i=0;i<10;i++) {
      for(let j=0;j<10;j++) {
        children.push(this.renderCell(i, j));
      }
    }
    return (
      <div className="ChessBoard">
        {children}
       </div>
    )
  }
}

export default ChessBoard;
