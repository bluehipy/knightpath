/**
it should enable dragging
*/
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import Draggable from "./Draggable";

const findByTag = ReactTestUtils.findRenderedDOMComponentWithTag,
  findOneByType = ReactTestUtils.findRenderedComponentWithType,
  findByType = ReactTestUtils.scryRenderedComponentsWithType;

let div;
beforeEach(() => (div = document.createElement("div")));
afterEach(() => ReactDOM.unmountComponentAtNode(div));

it("renders without crashing", () => {
  ReactDOM.render(<Draggable />, div);
});
