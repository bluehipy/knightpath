import {toChess, toCartezian} from "./Utils";

it("converts to chess coords", () => {
  expect(toChess(1, 1)).toEqual('a8');
  expect(toChess(1, 8)).toEqual('h8');
});

it("converts to cartezian  coords", () => {
  expect(toCartezian('a8')).toEqual([1,1]);
  expect(toCartezian('h8')).toEqual([1, 8]);
});
