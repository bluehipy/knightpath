import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import App from "./App";
import GameBoard from "./components/GameBoard";

const findByTag = ReactTestUtils.findRenderedDOMComponentWithTag,
      findOneByType = ReactTestUtils.findRenderedComponentWithType,
      findByType = ReactTestUtils.scryRenderedComponentsWithType;

let div;
beforeEach(() => (div = document.createElement("div")));
afterEach(() => ReactDOM.unmountComponentAtNode(div));

it("renders without crashing", () => {
  ReactDOM.render(<App />, div);
});

it("should have a GameBoard", () => {
  const app = ReactDOM.render(<App />, div);
  const board = findOneByType(app, GameBoard);

  expect.anything(board);

});
