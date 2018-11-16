/**
Will display
 - a ChessBoard,
 - a draggable Knight
 - a draggable Pawn
 - a start Button
 - a reset Button
 - a place to display message and indications

 Knight and Pawn will be draggable.
 ChessBoard will accept them to be dropped over.
 The start button will be enabled after
 Knight and Peon are dropped onto the chessboard.
 Once clicked the Button will trigger:
 -> a fetch of the knight path
  -> if successfull
      -> Buton is disabled
      -> ChessBoard display the Knight on its path to Pawn
      -> after animation finishes
        -> the start over button is enabled
  -> if Not successfull
      -> a message is displayed
      -> the start over button is enabled

      Will be in charge with creating data matrix for ChessBoard.
      Its state will keep:
      - the knight position
      - the pawn position
      - the knight path to follow
      - a message to display
      - a flag for when the animation can start
      - a flag for when the thigs are done and another sessioncan start

      The "animation" should consist in setting the chessboard data for each desired frame with some framerate.
      GameBoard {
        state {
          knightPos[]
          pawnPos[]
          path[]
          message
          ready
          finished
        }
        getTableData(state)
        onDrop(draggable)
        animate()
        reset()
        render(chessboard, 2xdraggable, 2xbuttons, message)
    }

*/

import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import GameBoard from "./GameBoard";
import Draggable from "./Draggable";
import Layout from "./Layout";
import ChessBoard from "./chessboard/ChessBoard";
import BoardSquare from "./chessboard/BoardSquare";

const findByTag = ReactTestUtils.findRenderedDOMComponentWithTag,
      findOneByType = ReactTestUtils.findRenderedComponentWithType,
      findByType = ReactTestUtils.scryRenderedComponentsWithType;

let div;
beforeEach(() => (div = document.createElement("div")));
afterEach(() => ReactDOM.unmountComponentAtNode(div));

it("renders without crashing", () => {
  ReactDOM.render(<GameBoard />, div);
});

it("should have a Layout", () => {
  const game = ReactDOM.render(<GameBoard />, div);
  const layout = findByType(game, Layout);

  expect(layout.length).toEqual(1)
});

it("should have a ChessBoard", () => {
  const game = ReactDOM.render(<GameBoard />, div);
  const board = findByType(game, ChessBoard);

  expect(board.length).toEqual(1)
});

it("should have 2 Dropable items", () => {
  const game = ReactDOM.render(<GameBoard />, div);
  const items = findByType(game, Draggable);

  expect(items.length).toEqual(2);
});

it("should reflect the Knight position", () => {
  const game = ReactDOM.render(<GameBoard />, div),
        x = 2,
        y = 3;

  game.setState({
    knightPos: [x, y]
  },() => {
     const data = game.generateTableData(),
           squares = findByType(game, BoardSquare),
           matches = squares.filter(sq => sq.props.markup.indexOf(ChessBoard.symbols.WHITE_QUEEN_KNIGHT)>-1);

     expect(data[x-1].split(' ')[y-1]).toEqual(ChessBoard.symbols.WHITE_QUEEN_KNIGHT);
     expect(matches.length).toEqual(1);

  })
});

it("should reflect the Pawn position", () => {
  const game = ReactDOM.render(<GameBoard />, div),
        x = 2,
        y = 3;

  game.setState({
    pawnPos: [x, y]
  },() => {
     const data = game.generateTableData(),
           squares = findByType(game, BoardSquare),
           matches = squares.filter(sq => sq.props.markup.indexOf(ChessBoard.symbols.BLACK_PAWN)>-1);

     expect(data[x-1].split(' ')[y-1]).toEqual(ChessBoard.symbols.BLACK_PAWN);
     expect(matches.length).toEqual(1);

  })
});

it("should reflect the Knight path", () => {
  const game = ReactDOM.render(<GameBoard />, div),
        path = [[1,2], [5, 6], [2, 8]];

  game.setState({
    pawnPos: [1, 1],
    knightPos: [8, 8],
    path: path
  },() => {
     const data = game.generateTableData(),
           squares = findByType(game, BoardSquare),
           matches = squares.filter(sq =>
             sq.props.markup.indexOf(ChessBoard.symbols.SELECTED_CELL) > -1
           );

     expect(matches.length).toEqual(path.length);

  })
});

it("on ready should display the start button", () => {
  const game = ReactDOM.render(<GameBoard />, div),
        x = 2,
        y = 3;

  game.setState({
    ready: true
  },() => {
      const button = findByTag(game, 'input');

     expect(button.value).toEqual('Go');

  })
});

it("on finish should display the start over button", () => {
  const game = ReactDOM.render(<GameBoard />, div),
        x = 2,
        y = 3;

  game.setState({
    finished: true
  },() => {
      const button = findByTag(game, 'input');

     expect(button.value).toEqual('Start Over');

  })
});

it("click on start should trigger the animation", () => {
  const game = ReactDOM.render(<GameBoard />, div),
        spy = jest.spyOn(game, 'animate');

  game.setState({
    ready: true
  }, () => {
      const button = findByTag(game, 'input');
     ReactTestUtils.Simulate.click(button);
     expect(spy).toHaveBeenCalledTimes(1);

  })
});

it("click on start should triggerfinished in some time", () => {
  const game = ReactDOM.render(<GameBoard />, div),
        x=2 ,y=2,
        z=8, t=6,
        path = [[3,4], [4, 6],[6, 5]];
        const promise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(game.state.finished), 5000)
        });
  game.setState({
    ready: true,
    knightPos:[x,y],
    pawnPos:[z,t],
    path: path
  }, () => {
      const button = findByTag(game, 'input');
     ReactTestUtils.Simulate.click(button);
  })

  return expect(promise).resolves.toBe(true)
});

it("should fetch corectly the path", () => {
  const game = ReactDOM.render(<GameBoard />, div);

  return expect(
    game.fetchPath('a1', 'b8')
    .then(response => response.json())
    .then(response => JSON.parse(response))
  ).resolves.toEqual(["A1", "C2", "B4", "A6", "B8"]);
});
