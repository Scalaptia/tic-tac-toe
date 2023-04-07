gameBoard = ["", "", "", "", "", "", "", "", ""]

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

    const clearBoard = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""]
        Gameboard.showBoard()
    }

    return {
        showBoard,
        clearBoard
    }
})()

const Game = (() => { // Game logic module
    let activePlayer = 2

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
        let gameEnd = false
        let winner

        if ((checkRows(playerOne.mark) || checkCols(playerOne.mark) || checkDiags(playerOne.mark)) == true){
            winner = playerOne.name
            gameEnd = true
            
        } else if ((checkRows(playerTwo.mark) || checkCols(playerTwo.mark) || checkDiags(playerTwo.mark)) == true){
            winner = playerTwo.name
            gameEnd = true
            
        } else {
            let count = 0
            boxesEl.forEach(box => {
                if(box.childNodes.length != 0) {
                    count++
                }
            })
    
            if (count == 9) {
                winner = "Tie"
                gameEnd = true
            }
        }

        if (gameEnd) {
            WinnerModal.showModal(winner)
        }
    }

    const restartGame = () => {
        WinnerModal.hideModal()
        Modal.showModal()
    }

    return {
        updateActivePlayer,
        checkWin,
        restartGame
    }
})()

const boxesEl = document.querySelectorAll(".board-box")
boxesEl.forEach(box => {
    box.addEventListener("click", () => {
        if (box.childNodes.length === 0){ // Check if box is empty
            Game.updateActivePlayer().placeMark(box.id.substring(4))
            Gameboard.showBoard()
            Game.checkWin()
        }
    })
})

/* UI ELEMENTS */

const Modal = (() => {
    const modalEl = document.querySelector(".modal")
    const modalContent = document.querySelector(".modal-content")
    
    const showModal = () => {
        modalEl.classList.add("open")
        modalContent.classList.add("open")
    }

    const hideModal = () => {
        modalEl.classList.remove("open")
        modalContent.classList.remove("open")
    }

    return {
        showModal,
        hideModal
    }
})()

const WinnerModal = (() => {
    const modalEl = document.querySelector(".modal")
    const winnerContent = document.querySelector(".winner-content")

    const showModal = (winner) => {
        modalEl.classList.add("open")
        winnerContent.classList.add("open")
        if (winner == "Tie") {
            console.log(`Tie!`)
            winnerContent.firstElementChild.innerHTML = `Tie!`
        } else {
            console.log(`The winner is ${winner}!`)
            winnerContent.firstElementChild.innerHTML = `The winner is <b style="color: #68AAE6">${winner}</b>!`
        }
    }

    const hideModal = () => {
        modalEl.classList.remove("open")
        winnerContent.classList.remove("open")
    }

    return {
        showModal,
        hideModal
    }
})()

const chooseXBtn = document.querySelector(".x-mark")
const chooseOBtn = document.querySelector(".o-mark")
const restartBtn = document.querySelector(".restart-game")

chooseXBtn.addEventListener("click", () => {
    playerOne = Player("Player One", "X")
    playerTwo = Player("Bot", "O")
    Modal.hideModal()
})

chooseOBtn.addEventListener("click", () => {
    playerOne = Player("Player One", "O")
    playerTwo = Player("Bot", "X")
    Modal.hideModal()
})

restartBtn.addEventListener("click", () => {
    Game.restartGame()
    Gameboard.clearBoard()
})