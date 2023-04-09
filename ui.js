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
            if (winner == playerOne.name) {
                winnerContent.firstElementChild.innerHTML = `The winner is <b style="color: rgba(101, 168, 230, 0.75)">${winner}</b>!`
            } else if (winner == playerTwo.name) {
                winnerContent.firstElementChild.innerHTML = `The winner is <b style="color: rgba(173, 228, 96, 0.75)">${winner}</b>!`
            }

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
const startBtn = document.querySelector(".start-btn")
const restartBtn = document.querySelector(".restart-btn")
const nameInputEl = document.getElementById("name-input")

chooseXBtn.addEventListener("click", () => {
    chooseOBtn.classList.remove("selected-mark")
    chooseXBtn.classList.add("selected-mark")
    selectedMark = "X"
    Game.isBotTurn = false
})

chooseOBtn.addEventListener("click", () => {
    chooseXBtn.classList.remove("selected-mark")
    chooseOBtn.classList.add("selected-mark")
    selectedMark = "O"
    Game.isBotTurn = true
})

startBtn.addEventListener("click", () => {
    if (nameInputEl.value && selectedMark) {
        if (selectedMark == "X") {
            playerOne = Player(`${nameInputEl.value}`, "X", 1)
            playerTwo = Player("Bot", "O", 2)
            human = playerOne
            bot = playerTwo

        } else if (selectedMark == "O") {
            playerOne = Player("Bot", "X", 1)
            playerTwo = Player(`${nameInputEl.value}`, "O", 2)
            human = playerTwo
            bot = playerOne
        }

        Game.setActivePlayer(playerOne)
        Modal.hideModal()
        Gameboard.updateScoreDisplay()
        if (Game.isBotTurn) {
            Game.makeMove()
        }
    }
})

restartBtn.addEventListener("click", () => {
    Game.restartGame()
    Gameboard.clearBoard()
})