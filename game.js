gameBoard = ["", "", "", "", "", "", "", "", ""]
const gameBoardEl = document.getElementById("game-board")

const Player = (name, mark, playerNumber) => { // Player factory function
    let score = 0
    let scoreEl = document.querySelector(`.player-${playerNumber}-score`)

    const placeMark = (box) => {
        gameBoard.splice((box-1), 1, mark) // Add mark to gameBoard array
    }

    return {
        name,
        mark,
        playerNumber,
        score,
        scoreEl,
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

    const updateScoreDisplay = () => {
        playerOne.scoreEl.firstElementChild.innerHTML = playerOne.name
        playerOne.scoreEl.lastElementChild.innerHTML = playerOne.score
        playerTwo.scoreEl.firstElementChild.innerHTML = playerTwo.name
        playerTwo.scoreEl.lastElementChild.innerHTML = playerTwo.score
    }

    return {
        showBoard,
        clearBoard,
        updateScoreDisplay
    }
})()

const Game = (() => { // Game logic module
    let activePlayer

    const setActivePlayer = (player) => {
        Game.activePlayer = player
        Game.activePlayer.scoreEl.lastElementChild.classList.add("active-player")
        gameBoardEl.classList.add(`player-${Game.activePlayer.playerNumber}`)
    }

    const updateActivePlayer = () => {
        Game.activePlayer.scoreEl.lastElementChild.classList.remove("active-player")
        gameBoardEl.classList.remove(`player-${Game.activePlayer.playerNumber}`)
        if (Game.activePlayer == playerOne) {
            Game.activePlayer = playerTwo
        } else {
            Game.activePlayer = playerOne
        }
        Game.activePlayer.scoreEl.lastElementChild.classList.add("active-player")
        gameBoardEl.classList.add(`player-${Game.activePlayer.playerNumber}`)
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
        const winnerEl = document.querySelector(".winner")

        if ((checkRows(playerOne.mark) || checkCols(playerOne.mark) || checkDiags(playerOne.mark)) == true){
            roundWinner = playerOne
            playerOne.score++
            roundEnd = true
            
        } else if ((checkRows(playerTwo.mark) || checkCols(playerTwo.mark) || checkDiags(playerTwo.mark)) == true){
            roundWinner = playerTwo
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
        activePlayer = ""
        WinnerModal.hideModal()
        Modal.showModal()
    }

    return {
        activePlayer,
        setActivePlayer,
        updateActivePlayer,
        checkWin,
        restartGame
    }
})()

const boxesEl = document.querySelectorAll(".board-box")
boxesEl.forEach(box => {
    box.addEventListener("click", () => {
        if (box.childNodes.length === 0){ // Check if box is empty
            Game.activePlayer.placeMark(box.id.substring(4))
            Gameboard.showBoard()
            Game.checkWin()
            Game.updateActivePlayer()
        }
    })
})