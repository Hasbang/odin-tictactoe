//game board module
const GameBoard = (() =>{
    let board = Array(9).fill(null);

    const getBoard = () => board;
    const updateBoard = (index, value) => {
        if (index >= 0 && index < board.length && !board[index]){
            board[index] = value;
        }
    };

    const resetBoard = () =>{
        board = Array(9).fill(null);
    };
    return {getBoard, updateBoard, resetBoard};
})();