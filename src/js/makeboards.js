const ALPHA = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export function makeBoard(height, width) {
    let board = [];
    for (let i = 0; i < height + 1; i++) {
        board.push([]);
        if (i !== 0) {
            board[i].push(String(i));
        }
        else {
            board[i].push(i);
        }
        for (let j = 0; j < width; j++) {
            if (i === 0) {
                board[i].push(ALPHA[j]);
            }
            else {
                board[i].push('*');
            }
        }
    }
    return board;
}

export function placementAlg(board, ships) {
    for (let key in ships) {
        let colInc;
        let rowInc;
        const currentShip = key;
        const dimension = board.length - 1;
        let currentShipLength = ships[key];
        let row = Math.floor(Math.random() * (board.length - 1)) + 1;
        let col = Math.floor(Math.random() * (board.length - 1)) + 1;

        while (board[row][col] !== '*' || board[row][col] === currentShip) {
            row = Math.floor(Math.random(1, board.length));
            col = Math.floor(Math.random(1, board.length));
        }

        if (currentShipLength <= (dimension - row) + 1) {
            rowInc = 'I';
        }
        else if (currentShipLength <= row) {
            colInc = 'D';
        }
        else {
            colInc = 'S';
        }

        if (currentShipLength <= (dimension - col) + 1) {
            colInc = 'I';
        }
        else if (currentShipLength <= col) {
            colInc = 'D';
        }
        else {
            colInc = 'S';
        }

        while (currentShipLength > 0) {
            board[row][col] = currentShip;

            if (rowInc === 'I')
                row += 1;
            else if (rowInc === 'D')
                row -= 1;
            else
                row = row;
            
            if (colInc === 'I')
                col += 1;
            else if (colInc === 'D')
                col -= 1;
            else
                col = col;

            currentShipLength -= 1;
        }
        
    }
    
    return(board);
}

export function CPUBoard(height, width, ships) {
    let board = makeBoard(height, width);
    placementAlg(board, ships);
}