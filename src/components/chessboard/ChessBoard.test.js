/**
ChessBoard will be able to display on a 10 x 10 matrix
- 64 blak and white squares
- 36 numeric and alpha numeric labels

ChessBoard will be able to display a chess game state specified trough its props
The chess game state will cover the pieces positions as well as special markup
for specific squares (Eg. some slected squares, possible moves)
Code for pieces beeing:
- white [QR1, QN1, QB1, Q1, K1, KB1, KN1, KR1, P1i, i=1,8]
- black [QR2, QN2, QB2, Q2, K2, KB2, KN2, KR2, P2i, i=1,8]
The game state will be described like:
[
  '- - - - - - - -',
  '- - - - - - P21 -',
  '- - - - - - - -',
  '- - - - - - - -',
  '- - - - - - - -',
  '- - - - - - - -',
  '- QN1 - - - - - -',
  '- - - - - - - -'
]
We'll implemenet only QN, P, and selection markup, for now
So the board will be able to:
- render two types of cells: sqaures and labels
- add a markup to cells based on the data it receives as a prop
- react on drop, since we plan to drop objects on it
*/

import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import ChessBoard from "./ChessBoard";
import BoardSquare from "./BoardSquare";
import BoardLabel from "./BoardLabel";

const findByTag = ReactTestUtils.findRenderedDOMComponentWithTag,
  findOneByType = ReactTestUtils.findRenderedComponentWithType,
  findByType = ReactTestUtils.scryRenderedComponentsWithType;

let div;
beforeEach(() => (div = document.createElement("div")));
afterEach(() => ReactDOM.unmountComponentAtNode(div));

it("renders without crashing", () => {
  ReactDOM.render(<ChessBoard />, div);
});

it("renders 64 BoardSquares", () => {
  const board = ReactDOM.render(<ChessBoard />, div),
    squares = findByType(board, BoardSquare);

  expect(squares.length).toEqual(64);
});

it("renders 36 BoardLabels", () => {
  const board = ReactDOM.render(<ChessBoard />, div),
    labels = findByType(board, BoardLabel);

  expect(labels.length).toEqual(36);
});

it("renders BoardSquare", () => {
  const board = ReactDOM.render(<ChessBoard />, div),
    square = board.renderSquare(1, 1);

  expect(square.type).toEqual(BoardSquare);
});

it("renders BoardLabel", () => {
  const board = ReactDOM.render(<ChessBoard />, div),
    label = board.renderLabel(0, 0);

  expect(label.type).toEqual(BoardLabel);
});

it("renders cell based on coordinates", () => {
  const board = ReactDOM.render(<ChessBoard />, div),
    square = board.renderCell(1, 1),
    label = board.renderCell(0, 0);

  expect(square.type).toEqual(BoardSquare);
  expect(label.type).toEqual(BoardLabel);
});
