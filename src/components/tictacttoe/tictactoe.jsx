import React, { useState } from 'react';
import './tictactoe.css';
import circle from '../assets/circle.png';
import cross from '../assets/cross.png';

const Tictactoe = () => {
    const [data, setData] = useState(Array(9).fill(''));
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const handleClick = (num) => {
        if (lock || data[num] !== '') return; 

        const newData = [...data];
        const newCount = count + 1;
        const currentPlayer = newCount % 2 === 0 ? 'x' : 'o';

        newData[num] = currentPlayer;
        setData(newData);
        setCount(newCount);
        
        if (checkWin(newData)) {
            setLock(true);
        } else if (newCount === 9) {
            setLock(true); 
        }
    };

    const checkWin = (board) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]  
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
        });
    };

    const resetGame = () => {
        setData(Array(9).fill(''));
        setCount(0);
        setLock(false);
    };

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe Game</h1>
            <div className='board'>
                {data.map((value, index) => (
                    <div
                        key={index}
                        className='boxes'
                        onClick={() => handleClick(index)}
                    >
                        {value === 'x' && <img src={cross} alt="cross" />}
                        {value === 'o' && <img src={circle} alt="circle" />}
                    </div>
                ))}
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
        </div>
    );
};

export default Tictactoe;
