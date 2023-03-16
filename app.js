window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const display = document.querySelector('.display');
    const reset = document.querySelector('.reset');
    const turn = document.querySelector('.turn');

    let area = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let active = true;

    const condition = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winning = condition[i];
            const first = area[winning[0]];
            const second = area[winning[1]];
            const third = area[winning[2]];
            if (first === '' || second === '' || third === '') {
                continue;
            }
            if (first === second && second === third) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? "O" : "X");
            active = false;
            return;
        }

    if (!area.includes(''))
        announce("Draw");
    }

    const announce = type => {
        if (type === "X"){
            display.textContent = "Player X won";
        }
        else if (type === "O"){
            display.textContent = "Player O won";
        }
        else{
            display.textContent = "Draw";
        }
        display.classList.remove('hide');
        display.classList.add(`player${type}`);
        turn.textContent = '';
    };

    const isValidAction = tile => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updatearea =  (index) => {
        area[index] = currentPlayer;
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && active) {
            tile.innerText = currentPlayer;
            turn.classList.remove(`player${currentPlayer}`);
            tile.classList.add(`player${currentPlayer}`);
            changePlayer();
            turn.textContent = `Player ${currentPlayer}'s turn`;
            turn.classList.add(`player${currentPlayer}`)
            updatearea(index);
            handleResultValidation();
        }
    }
    
    const resetarea = () => {
        area = ['', '', '', '', '', '', '', '', ''];
        active = true;
        display.classList.add('hide');
        turn.textContent = "Player X's turn";
        turn.classList.remove('playerO');
        turn.classList.add('playerX');
        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    reset.addEventListener('click', resetarea);
});