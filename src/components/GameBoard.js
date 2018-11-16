import React from "react";
import ChessBoard from "./chessboard/ChessBoard";
import Draggable from "./Draggable";
import './GameBoard.css';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      finished: false,
      knightPos: null,
      pawnPos: null,
      message: "Drag pieces on table"
    };
    this.animate = this.animate.bind(this);
  }
  generateTableData() {
    let state = this.state,
      pieces = [],
      emptyRow = new Array(8),
      emptyTable = new Array(8);

    emptyRow.fill("-", 0, 8);
    emptyRow = emptyRow.join(" ");
    emptyTable.fill(emptyRow, 0, 8);
    if (!state) {
      return emptyTable;
    }

    if (state.path) {
      state.path.forEach(pos => {
        pieces.push(["X", ...pos]);
      });
    }

    if (state.pawnPos) {
      pieces.push(["P2", ...state.pawnPos]);
    }

    if (state.knightPos) {
      pieces.push(["QN1", ...state.knightPos]);
    }

    return this.addPieces(pieces, emptyTable);
  }
  addPieces(pieces, data) {
    const separator = " ";
    let tmp = data.slice();

    pieces.forEach(item => {
      const symbol = item[0],
        i = item[1] - 1,
        j = item[2] - 1;
      let row = tmp[i];

      row = row.split(separator);
      row[j] = symbol;
      tmp[i] = row.join(separator);
    });
    return tmp;
  }
  animate() {
   const state = this.state;
   let path = state && state.path && state.path.slice(),
     knight = state && state.knightPos,
     pawn = state && state.pawnPos,
     busy = state && state.busy;

   if (!busy) {
     this.setState({
       busy: true,
       ready: false,
       message: "This is how Knight is moving in the chess game"
     });
   }
   // move on path
   if (path && path.length) {
     this.moveKnightTo(...path.shift()).then(() =>
       this.setState(
         {
           path: path
         },
         () => setTimeout(() => this.animate(), 500)
       )
     );
   } else if (pawn) { // capture the pawn
     this.moveKnightTo(...pawn).then(() =>
       this.setState(
         {
           pawnPos: null
         },
         () => this.animate()
       )
     );
   } else { // finished
     this.setState({
       message: "The End",
       finished: true
     });
   }
 }
 moveKnightTo(x0, y0) {
   return new Promise((resolve, reject) => {
     const state = this.state;
     let dt = 250,
       knight = state.knightPos,
       x = knight[0],
       y = knight[1];

     let hasMoved = false;
     // check x
     if (x != x0) {
       x = x < x0 ? x + 1 : x - 1;
       hasMoved = true;
     }
     // if not changed yet check y
     if (!hasMoved && y != y0) {
       y = y < y0 ? y + 1 : y - 1;
     }

     // if not there yet go further
     if (x != x0 || y != y0) {
       setTimeout(() => resolve(this.moveKnightTo(x0, y0)), dt);
     }
     //update position => redraw
     this.setState({
       knightPos: [x, y]
     });

     //L finished
     if (x == x0 && y == y0) {
       resolve();
     }
   });
 }
  reset() {
    this.setState({
      knightPos: null,
      pawnPos: null,
      path: null,
      busy: null,
      ready: null,
      finished: null,
      message: "Drag pieces on table"
    });
  }
  onDrop(i, j, data) {
    const changes = {};

    changes[data] = [i, j];
    this.setState(changes, () => this.checkPath());
  }
  checkPath() {
    const state = this.state,
      hasKnight = state && state.knightPos,
      hasPawn = state && state.pawnPos;

    let start, end;

    if (hasKnight && hasPawn) {
      start = this.toChess(...hasKnight);
      end = this.toChess(...hasPawn);

      this.setState({ message: "Please wait" });

      this.fetchPath(start, end)
        .then(response => response.json())
        .then(response => this.drawPath(JSON.parse(response)))
        .catch(err =>
          this.setState({
            message: "Something went wrong",
            finished: true
          })
        );
    } else {
      this.setState({
        message: "Now drop the other one"
      });
    }
  }
  fetchPath(start, end) {
    const url = `https://v86wed9i20.execute-api.eu-west-1.amazonaws.com/public/knight-path?start=${start}&end=${end}`,
      request = new Request(url);

    return fetch(request);
  }
  drawPath(path) {
    let coords = path;
    coords.pop();
    coords.shift();
    coords = coords.map(s => this.toCartezian(s));

    this.setState(
      {
        path: coords,
        ready: true,
        message: coords.length
        ? "Now press the button to see the Knight moves"
        : "Not much to walk"
      }
    );
  }
  toCartezian (s) {
  const pos = s.toLowerCase().split(""),
    alpha = "abcdefgh";
  return [9 - parseInt(pos[1], 10), 1 + alpha.indexOf(pos[0])];
}
toChess(x, y) {
  const alpha = "abcdefgh".split("");
  return alpha[y - 1] + (9 - x);
}
  render() {
    const state = this.state,
      message = state && state.message,
      hasKnight = state && state.knightPos,
      hasPawn = state && state.pawnPos,
      isBusy = state && state.busy,
      isReady = state && state.ready,
      isFinished = state && state.finished,
      data = this.generateTableData();

    return (
      <div>
        <ChessBoard data={data} onDrop={this.onDrop.bind(this)} />
          {!hasKnight && !isBusy && (
            <Draggable transport="knightPos" className="QN1 big withWhite" />
          )}
          {!hasPawn && !isBusy && (
            <Draggable transport="pawnPos" className="big P2 withBlack" />
          )}
          {isReady && (
            <input
              type="button"
              className="bigBtn"
              value="Go"
              onClick={this.animate}
            />
          )}
          {isFinished && (
            <input
              className="bigBtn"
              type="button"
              value="Start Over"
              onClick={this.reset.bind(this)}
            />
          )}
        <div className="info">{message}</div>
        </div>
    );
  }
}
export default GameBoard;
