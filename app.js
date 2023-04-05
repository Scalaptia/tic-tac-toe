gameBoard = ["", "", "", "", "", "", "", "", ""]

const boardEl = document.querySelector("#gameBoard")
const boxesEl = document.querySelectorAll(".board-box")

const Player = (name, mark) => { // Player factory function
    const placeMark = (box) => {
        gameBoard.splice((box-1), 1, mark) // Add mark to gameBoard array
    }


    return {
        name,
        mark,
        placeMark
    }
}

const Gameboard = (() => { // Initiate gameboard module
    const showBoard = () => {
        let boxCount = 1
        gameBoard.forEach(element => {
            let box = document.querySelector(`#box-${boxCount}`)
            box.innerHTML = element
            boxCount++
        });
    }

    return {
        showBoard
    }
})()

const Game = (() => { // Game logic module
    let activePlayer = 1

    const updateActivePlayer = () => {
        if (activePlayer == 1) {
            activePlayer = 2
            return playerTwo
        } else {
            activePlayer = 1
            return playerOne
        }
    }

    const checkRows = (mark) => {
        if (
            ((gameBoard[0] == mark) && (gameBoard[1] == mark) && (gameBoard[2] == mark)) ||
            ((gameBoard[3] == mark) && (gameBoard[4] == mark) && (gameBoard[5] == mark)) ||
            ((gameBoard[6] == mark) && (gameBoard[7] == mark) && (gameBoard[8] == mark))
        ) {
            return true;
        }
    }

    const checkCols = (mark) => {
        if (
            ((gameBoard[0] == mark) && (gameBoard[3] == mark) && (gameBoard[6] == mark)) ||
            ((gameBoard[1] == mark) && (gameBoard[4] == mark) && (gameBoard[7] == mark)) ||
            ((gameBoard[2] == mark) && (gameBoard[5] == mark) && (gameBoard[8] == mark))
        ) {
            return true;
        }
    }

    const checkDiags = (mark) => {
        if (
            ((gameBoard[0] == mark) && (gameBoard[4] == mark) && (gameBoard[8] == mark)) ||
            ((gameBoard[2] == mark) && (gameBoard[4] == mark) && (gameBoard[6] == mark)) 
        ) {
            return true;
        }
    }

    const checkWin = () => {
        if ((checkRows(playerOne.mark) || checkCols(playerOne.mark) || checkDiags(playerOne.mark)) == true){
            console.log("Player One WIN")
            
        } else if ((checkRows(playerTwo.mark) || checkCols(playerTwo.mark) || checkDiags(playerTwo.mark)) == true){
            console.log("Player Two WIN")
            
        } else {
            let count = 0
            boxesEl.forEach(box => {
                if(box.childNodes.length != 0) {
                    count++
                }
            })
    
            if (count == 9) {
                console.log("Game Finished TIE")
            }
        }
    }

    return {
        updateActivePlayer,
        checkWin
    }
})()

boxesEl.forEach(box => {
    box.addEventListener("click", () => {
        if (box.childNodes.length === 0){ // Check if box is empty
            Game.updateActivePlayer().placeMark(box.id.substring(4))
            Gameboard.showBoard()
            Game.checkWin()
        }
    })
})

let playerOne = Player("Fernando", "X")
let playerTwo = Player("CPU", "O")


/* UI ELEMENTS */

const modal = document.querySelector(".modal")
const modalContent = document.querySelector(".modal-content")

modal.addEventListener("click", (event) => {
    if(event.target.classList.contains("modal")) {
        modal.classList.remove("open")
        modalContent.classList.remove("open")
    }
})