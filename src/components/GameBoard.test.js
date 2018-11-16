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
      - a flag for when the animation can start
      - a flag for when the thigs are done and another sessioncan start

      The "animation" should consist in setting the chessboard data for each desired frame with some framerate.
*/
