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
const restartBtn = document.querySelector(".restart-game")

chooseXBtn.addEventListener("click", () => {
    playerOne = Player("Player One", "X", 1)
    playerTwo = Player("Bot", "O", 2)
    Game.setActivePlayer(playerOne)
    Modal.hideModal()
    Gameboard.updateScoreDisplay()
})

chooseOBtn.addEventListener("click", () => {
    playerOne = Player("Bot", "X", 1)
    playerTwo = Player("Player One", "O", 2)
    Game.setActivePlayer(playerOne)
    Modal.hideModal()
    Gameboard.updateScoreDisplay()
})

restartBtn.addEventListener("click", () => {
    Game.restartGame()
    Gameboard.clearBoard()
})