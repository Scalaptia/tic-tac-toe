let gameBoard = ["", "", "", "", "", "", "", "", ""]
const gameBoardEl = document.getElementById("game-board")

const Player = (name, mark, playerNumber) => { // Player factory function
    let score = 0
    let scoreEl = document.querySelector(`.player-${playerNumber}-score`)

    const placeMark = (box) => {
        console.log(`${Game.activePlayer.name} is placing ${Game.activePlayer.mark} inside ${box}`)
        gameBoard.splice((box), 1, mark) // Add mark to gameBoard array
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
        let boxCount = 0
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
    let isBotTurn

    const makeMove = (box) => {
        if (!Game.isBotTurn) {
            Game.activePlayer.placeMark(box)
            Gameboard.showBoard()
            Game.checkWin()
            Game.updateActivePlayer()
        }
        
        if (Game.isBotTurn) {
            setTimeout(() => {
                box = Bot.bestMove()
                Game.activePlayer.placeMark(box)
                Gameboard.showBoard()
                Game.checkWin()
                Game.updateActivePlayer()
            }, 1000)
        }
    }

    const setActivePlayer = (player) => {
        Game.activePlayer = player
        Game.activePlayer.scoreEl.lastElementChild.classList.add("active-player")
        gameBoardEl.classList.add(`player-${Game.activePlayer.playerNumber}`)
    }

    const updateActivePlayer = () => {
        Game.activePlayer.scoreEl.lastElementChild.classList.remove("active-player")
        gameBoardEl.classList.remove(`player-${Game.activePlayer.playerNumber}`)
        Game.activePlayer = (Game.activePlayer === playerOne) ? playerTwo : playerOne

        Game.activePlayer.scoreEl.lastElementChild.classList.add("active-player")
        gameBoardEl.classList.add(`player-${Game.activePlayer.playerNumber}`)

        Game.isBotTurn = !Game.isBotTurn
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
        let roundWinner = null, gameWinner = null

        if ((checkRows(playerOne.mark) || checkCols(playerOne.mark) || checkDiags(playerOne.mark)) == true){
            roundWinner = playerOne.mark
            playerOne.score++
            roundEnd = true
            
        } else if ((checkRows(playerTwo.mark) || checkCols(playerTwo.mark) || checkDiags(playerTwo.mark)) == true){
            roundWinner = playerTwo.mark
            playerTwo.score++
            roundEnd = true
            
        } else {
            let count = 0
            for (let box = 0; box < 9; box++) { 
                if (gameBoard[box] !== "") {
                    count++
                }
            }
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

        return roundWinner // Returns null || "Tie" || winner.mark
    }

    const restartGame = () => {
        Game.activePlayer = ""
        WinnerModal.hideModal()
        Modal.showModal()
    }

    return {
        makeMove,
        activePlayer,
        setActivePlayer,
        updateActivePlayer,
        checkRows,
        checkCols,
        checkDiags,
        checkWin,
        restartGame,
        isBotTurn
    }
})()

const boxesEl = document.querySelectorAll(".board-box")
boxesEl.forEach(box => {
    box.addEventListener("click", () => {
        if (box.childNodes.length === 0){ // Check if box is empty
            Game.makeMove(box.id.substring(4))
        }
    })
})