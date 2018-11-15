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
*/
