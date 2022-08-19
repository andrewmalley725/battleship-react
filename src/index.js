import React from 'react';
import ReactDOM from 'react-dom/client';
import Board from './components/board'

const DIMENSIONS = {
    height: 8,
    width: 8
}

function Index() {
    return(
        <Board dimensions={DIMENSIONS}/>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index/>);

