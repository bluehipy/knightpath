/**
The BoardSquare will be able to receive drops and pass them to the onDrop  prop
will decorate itself with various markup based on user interaction and props
*/

import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import BoardSquare from "./BoardSquare";

const findByTag = ReactTestUtils.findRenderedDOMComponentWithTag,
  findOneByType = ReactTestUtils.findRenderedComponentWithType,
  findByType = ReactTestUtils.scryRenderedComponentsWithType;

let div;
beforeEach(() => (div = document.createElement("div")));
afterEach(() => ReactDOM.unmountComponentAtNode(div));

it("renders without crashing", () => {
  ReactDOM.render(<BoardSquare />, div);
});

it("has the proper class", () => {
  const sq = ReactDOM.render(<BoardSquare />, div),
        dom = findByTag(sq, 'div');


  expect(dom.className.indexOf('sq')>-1 ).toEqual(true);
});


it("reacts on drop", () => {
  const fn = jest.fn(),
        sq = ReactDOM.render(<BoardSquare isFree={true} onDrop={fn}/>, div),
        dom = findByTag(sq, 'div');

  ReactTestUtils.Simulate.drop(dom);
  expect(fn).toHaveBeenCalledTimes(1);
});
