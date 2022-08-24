import React, { useState } from 'react';
import { makeBoard, CPUBoard, placementAlg } from '../js/makeboards';
import '../css/index.css';

let NUM_TRYS = 8;
let ships = {
    "B": 5,
};

// TODO Current algorithm only places one ship on the board, adjust placementAlg()

function Board(props) {
    const height = props.dimensions.height;
    const width = props.dimensions.width;
    const [outMsg, setMsg] = useState('Click Start Button');
    const [oBoard, setO] = useState([]);
    const [play, setPlay] = useState(false);
    const [cpBoard, setCP] = useState([]);
    let CPBoard = makeBoard(height,width);
    let board = makeBoard(height, width);

    function isHit(row, column) {
        if (cpBoard[row][column] !== '*') {
            return true;
        }
        return false;
    }

    function setAll() {
        setO(board);
        setCP(placementAlg(CPBoard,ships));
        setPlay(true);
        setMsg('Click a token to begin!');
    }

    function changeToken(row, col) {
        if (isHit(row,col)) {
            oBoard[row][col] = 'X';
            let hit = cpBoard[row][col];
            if (ships[hit] > 1) {
                setMsg('Hit!');
            }
            else {
                let bHit;
                if (hit === 'B')
                    bHit = 'Battleship';
                setMsg('You sunk my ' + bHit + '!');
            }
            ships[hit] -= 1;
        }
        else {
            setMsg('Miss!');
            oBoard[row][col] = 'O';
            NUM_TRYS -= 1;
            if (NUM_TRYS === 0) {
                setMsg('Out of guesses!');
            }
        }
            setTimeout(() => {
                if (NUM_TRYS > 0) {
                    setMsg('Fire again!');
                }
                else {
                    setMsg('Game over!');
                }
                
            }, 800);
        }

        
    function handleClick(e, row, col) {
        e.preventDefault();
        changeToken(row, col);
    }

    return(
        <div>
            <div className='board'>
                <h1>{outMsg}</h1>
                <button type='button' onClick={() => {setAll()}} style={{display: play ? 'none' : 'block', marginLeft: '47%'}}>Start Game!</button>
                {
                    oBoard.map((row, rowIndex) => {
                        return(
                            <div style={{display: NUM_TRYS > 0 ? 'block' : 'none'}}>
                                <strong>
                                    {
                                        row.map((token, tIndex) => {
                                            return(
                                                <>
                                                    {rowIndex === 0 && tIndex === 0 ? 
                                                    <span style={{visibility: 'hidden'}}>{'_'}</span> : 
                                                    tIndex > 0 ? rowIndex !== 0 ? 
                                                    <a href="#" onClick={(e) => {handleClick(e, rowIndex, tIndex); console.log(cpBoard); console.log(ships)}}>{' ' + token + ' '}</a> :
                                                    ' ' + token + ' ' :
                                                    token + ' '}
                                                </>
                                            );
                                        })
                                    }
                                </strong>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Board;