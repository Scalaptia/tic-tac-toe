gameBoard = ["", "", "", "", "", "", "", "", ""]

const Player = (name, mark) => { // Player factory function
    let score = 0

    const placeMark = (box) => {
        gameBoard.splice((box-1), 1, mark) // Add mark to gameBoard array
    }

    return {
        name,
        mark,
        score,
        placeMark
    }
}

const Gameboard = (() => { // Initiate gameboard module
    const playerOneScoreEl = document.querySelector(".player-one-score")
    const playerTwoScoreEl = document.querySelector(".player-two-score")

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

    const updateScoreDisplay = () => {
        playerOneScoreEl.firstElementChild.innerHTML = playerOne.name
        playerOneScoreEl.lastElementChild.innerHTML = playerOne.score
        playerTwoScoreEl.firstElementChild.innerHTML = playerTwo.name
        playerTwoScoreEl.lastElementChild.innerHTML = playerTwo.score
    }

    return {
        showBoard,
        clearBoard,
        updateScoreDisplay
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
        let roundEnd = false, gameEnd = false
        let roundWinner, gameWinner

        if ((checkRows(playerOne.mark) || checkCols(playerOne.mark) || checkDiags(playerOne.mark)) == true){
            roundWinner = playerOne.name
            playerOne.score++
            roundEnd = true
            
        } else if ((checkRows(playerTwo.mark) || checkCols(playerTwo.mark) || checkDiags(playerTwo.mark)) == true){
            roundWinner = playerTwo.name
            playerTwo.score++
            roundEnd = true
            
        } else {
            let count = 0
            boxesEl.forEach(box => {
                if(box.childNodes.length != 0) {
                    count++
                }
            })
    
            if (count == 9) {
                roundWinner = "Tie"
                roundEnd = true
            }
        }

        if (playerOne.score == 3) {
            gameWinner = playerOne.name
            gameEnd = true
        } else if (playerTwo.score == 3) {
            gameWinner = playerTwo.name
            gameEnd = true
        }

        if (gameEnd) {
            WinnerModal.showModal(gameWinner)
            playerOne.name = ""
            playerOne.score = 0
            playerTwo.name = ""
            playerTwo.score = 0
        } else if (roundEnd) {
            Gameboard.clearBoard()
            Gameboard.updateScoreDisplay()
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