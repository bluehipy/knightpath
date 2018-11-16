import React from "react";
import ChessBoard from "./chessboard/ChessBoard";
import Draggable from "./Draggable";
import Layout from "./Layout";
import {toChess, toCartezian} from "./Utils";
import "./GameBoard.css";

class GameBoard extends React.Component {
  static strings = {
    MSG_INITIAL: "Drop the White Knight and the Dark Pawn over the chess table",
    MSG_PLEASE_WAIT: "Please wait while we are calculating a path.",
    MSG_EXCEPTION: "Something went wrong",
    MSG_DROP_THE_OTHER: "Great job! Now drag the other one too.",
    MSG_START_ANIMATION:
      "Click the button to see how the Knight attacks the Pawn",
    MSG_KNIGHT_WALKING: "Trop! Trop! Trop! (Knight walking sounds)",
    MSG_THE_END:
      "And the mighty White Knight ended his journey. Press the button to start over."
  };
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      finished: false,
      knightPos: null,
      pawnPos: null,
      message: GameBoard.strings.MSG_INITIAL
    };
    this.animate = this.animate.bind(this);
  }
  generateTableData() {
    let state = this.state,
      pieces = [],
      emptyRow = new Array(8),
      emptyTable = new Array(8);

    emptyRow.fill(ChessBoard.symbols.EMPTY_CELL, 0, 8);
    emptyRow = emptyRow.join(ChessBoard.symbols.SEPARATOR);
    emptyTable.fill(emptyRow, 0, 8);
    if (!state) {
      return emptyTable;
    }

    if (state.path) {
      state.path.forEach(pos => {
        pieces.push([ChessBoard.symbols.SELECTED_CELL, ...pos]);
      });
    }

    if (state.pawnPos) {
      pieces.push([ChessBoard.symbols.BLACK_PAWN, ...state.pawnPos]);
    }

    if (state.knightPos) {
      pieces.push([ChessBoard.symbols.WHITE_QUEEN_KNIGHT, ...state.knightPos]);
    }

    return this.addPieces(pieces, emptyTable);
  }
  addPieces(pieces, data) {
    const separator = ChessBoard.symbols.SEPARATOR;
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
      pawn = state && state.pawnPos,
      busy = state && state.busy;

    if (!busy) {
      this.setState({
        busy: true,
        ready: false,
        message: GameBoard.strings.MSG_KNIGHT_WALKING
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
    } else if (pawn) {
      // capture the pawn
      this.moveKnightTo(...pawn).then(() =>
        this.setState(
          {
            pawnPos: null
          },
          () => this.animate()
        )
      );
    } else {
      // finished
      this.setState({
        message: GameBoard.strings.MSG_THE_END,
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
      if (x !== x0) {
        x = x < x0 ? x + 1 : x - 1;
        hasMoved = true;
      }
      // if not changed yet check y
      if (!hasMoved && y !== y0) {
        y = y < y0 ? y + 1 : y - 1;
      }

      // if not there yet go further
      if (x !== x0 || y !== y0) {
        setTimeout(() => resolve(this.moveKnightTo(x0, y0)), dt);
      }
      //update position => redraw
      this.setState({
        knightPos: [x, y]
      });

      //L finished
      if (x === x0 && y === y0) {
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
      message: GameBoard.strings.MSG_INITIAL
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
      start = toChess(...hasKnight);
      end = toChess(...hasPawn);

      this.setState({ message: GameBoard.strings.MSG_PLEASE_WAIT });

      this.fetchPath(start, end)
        .then(response => response.json())
        .then(response => this.drawPath(JSON.parse(response)))
        .catch(err =>
          this.setState({
            message: GameBoard.strings.MSG_EXCEPTION,
            finished: true
          })
        );
    } else {
      this.setState({
        message: GameBoard.strings.MSG_DROP_THE_OTHER
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
    coords = coords.map(s => toCartezian(s));

    this.setState({
      path: coords,
      ready: true,
      message: GameBoard.strings.MSG_START_ANIMATION
    });
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
      <Layout>
        <ChessBoard data={data} onDrop={this.onDrop.bind(this)} />
        <div>
        {!hasKnight && !isBusy && (
          <Draggable transport="knightPos" className="QN1 big withWhite" />
        )}
        </div>
        <div>
        {!hasPawn && !isBusy && (
          <Draggable transport="pawnPos" className="big P2 withBlack" />
        )}
        </div>
        <div>
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
        </div>
        <div className="info">{message}</div>
      </Layout>
    );
  }
}
export default GameBoard;
