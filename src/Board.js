import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

    static defaultProps ={
        nrows: 5,
        ncols: 5,
        chanceOn: 0.25
    };

    constructor(props) {
        super(props);
        this.state ={
            hasWon: false,
            board: this.createBoard()
        }
    }

    createBoard() {
        let board = [];
        for(let y=0; y<this.props.nrows; y++){
            let row=[];
            for(let x=0; x<this.props.ncols; x++){
                row.push(Math.random() < this.props.chanceOn)
            }
            board.push(row);
        }
        return board;
    }

    flipCells(crd) {
        console.log("flip", crd);
        let {ncols, nrows} = this.props;
        let board = this.state.board;
        let [y,x] = crd.split("-").map(Number);

        function flipCell(y,x) {
            if(x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }
        
        flipCell(y, x);     //Flip initial cell
        flipCell(y, x - 1); //flip left
        flipCell(y, x + 1); //flip right
        flipCell(y - 1, x); //flip below
        flipCell(y + 1, x); //flip above


       let hasWon = board.every(row => row.every(cell => !cell));
       this.setState({board: board, hasWon: hasWon});
    }

    makeTable() {
        let tableBoard =[];
        for(let y=0; y<this.props.nrows; y++){
            let row=[];
            for(let x=0; x<this.props.ncols; x++){
                let crd = `${y}-${x}`
                row.push(<Cell key={crd} isLit={this.state.board[y][x]} flipCells={() => this.flipCells(crd)}/>);
            }
            tableBoard.push(<tr>{row}</tr>);
        }
        return(
            <table className="Board">
                <tbody>
                    {tableBoard}
                </tbody>
            </table>
        ) 
    }

    render() {
        return (
            <div>
               {this.state.hasWon ? (
                <div className="Board-title">
                    <div className="winner">
                    <span className="neon-orange">WON</span>
                    <span className="neon-blue">!!!</span>
                    </div>
                </div>
           ) : (
                <div>
                    <div className="Board-title">
                        <div className="neon-orange">Light</div>
                        <div className="neon-blue">Up</div>
                    </div>
                    {this.makeTable()}
                </div>
           )}
            </div>
        );
    }
}

export default Board;