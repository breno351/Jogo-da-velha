const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
        
        function createBoard() {
            board.innerHTML = "";
            cells.forEach((_, index) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.index = index;
                cell.addEventListener("click", makeMove);
                board.appendChild(cell);
            });
        }
        
        function makeMove(event) {
            const index = event.target.dataset.index;
            if (cells[index] === "" && !checkWinner()) {
                cells[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                if (checkWinner()) {
                    status.textContent = `Jogador ${currentPlayer} venceu!`;
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                status.textContent = `Vez do jogador ${currentPlayer}`;
            }
        }
        
        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winningCombinations.some(combination => {
                const [a, b, c] = combination;
                return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
            });
        }
        
        function resetGame() {
            cells = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            status.textContent = "Vez do jogador X";
            createBoard();
        }
        
        createBoard();