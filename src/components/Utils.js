export const toCartezian = (s) => {
  const pos = s.toLowerCase().split(""),
    alpha = "abcdefgh";
  return [9 - parseInt(pos[1], 10), 1 + alpha.indexOf(pos[0])];
}
export const toChess = (x, y) => {
  const alpha = "abcdefgh".split("");
  return alpha[y - 1] + (9 - x);
}
