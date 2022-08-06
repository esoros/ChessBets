import { useEffect, useState } from "react"
import {Chess, PieceType} from "chess.js"
import "./Game.css"
import SelectDifficulty from "./SelectDifficulty"

type ChessPiece = "queen" | "rook" | "pawn" | "king" | "bishop" | "knight"
type Player = "b" | "w"

type Square = {
    notation: string 
    piece?: ChessPiece
    player?: Player
    onClick?: () => void
    isHighlighted: boolean
}

function boardToChessPiece(type: PieceType) : ChessPiece {
    switch(type) {
        case "r":
            return "rook"
        case "q":
            return "queen"
        case "b":
            return "bishop"
        case "k":
            return "king"
        case "n":
            return "knight"
        case "p":
            return "pawn"
    }
}

function boardToChessPlayer(color: string) : Player {
    if(color == "b") {
        return "b"
    } else {
        return "w"
    }
}

function toKey(square: Square) {
    return square.notation
}

export function ChessSquare(props: {square: Square, onClick? : () => void}) {
    return <div className={props.square.isHighlighted ? "highlighted" : ""} onClick={props.onClick}>
        {
            props.square.piece && props.square.player ?
                <img src={`/pieces/${props.square.player! == "b" ? "black" : "white"}/${props.square.piece!}.svg`} />
                : <></>
        }
    </div>
}

//add check/checkmate etc and then black shuld just make random moved now, then we can get into minmax

export default function Game() {    
    let [board, setBoard] = useState<Square[]>()
    let [chess, _] = useState(new Chess())
    let [difficulty, setDifficulty] = useState<number>()
    let [lastClickedSquare, setLastClickedSquare] = useState<Square>()

    function onClick(square: Square) {
        unHighlight()
        if(square.piece && square.player == chess.turn()) {
            let moves = chess.moves({square: square.notation, verbose: true}).map(v => v.to)
            console.log("possible moves found", moves)
            highlightSquares(moves)
        } else if (lastClickedSquare?.piece) {
            let move = chess.moves({verbose: true, square: lastClickedSquare.notation}).find(mv => mv.from == lastClickedSquare?.notation && mv.to == square.notation)
            console.log("making move", move)
            if(move) {
                chess.move(move!.san)
                renderBoard()
            }
        } else {
        
        }
        setLastClickedSquare(square)
    }

    function unHighlight() {
        setBoard(s => {
            let squares : Square[] = []
            s?.forEach(square => squares.push({...square, isHighlighted: false}))
            return squares
        })
    }

    function highlightSquares(notations: string[]) {
        setBoard(s => {
            let squares : Square[] = []
            s?.forEach(square => {
                if(notations.includes(square.notation)) {
                    squares.push({...square, isHighlighted: true})
                } else {
                    squares.push(square)
                }
            })
            return squares
        })
    }

    function renderBoard() {
        let board = chess.board()
        console.log("render board", board)
        let chessBoard : Square[] = []
        let board_letters = "abcdefgh"
        let board_numbers = "87654321"
        for(let i = 0; i < board.length; ++i) {
            for(let j = 0; j < board.length; ++j) {
                let square : Square = {
                    notation: board_letters[j] + board_numbers[i],
                    isHighlighted: false,
                    piece: board[i][j] == null ? undefined : boardToChessPiece(board[i][j]!.type),
                    player: board[i][j] == null ? undefined : boardToChessPlayer(board[i][j]!.color)
                }
                chessBoard.push(square)
            }
        }
        setBoard(chessBoard)
        console.log("chess board", chessBoard)
    }

    useEffect(() => {
        renderBoard()
    }, [])

    if(!difficulty) {
        return <SelectDifficulty onSelect={setDifficulty} />
    }

    if(!board) {
        return <p>Loading...</p>
    }

    return <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{display: "flex", flexDirection: "row"}}>
            <button>Current Player: {boardToChessPlayer(chess.turn())}</button>
            <div style={{flexGrow: 1}} />
            <p style={{fontWeight: "bold"}}>{difficulty}</p>
            <img style={{width: "2rem"}} src={"./tokens/avax.svg"} />
            <input disabled={true} value={difficulty} min={1} max={100} type={'range'} />
        </div> 
        <div className="chess-board">
            {board!.map(square => <ChessSquare onClick={() => onClick(square)} key={toKey(square)} square={square} /> )}
        </div>
    </div> 
}
