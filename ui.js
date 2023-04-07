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
    Gameboard.updateScoreDisplay()
})

chooseOBtn.addEventListener("click", () => {
    playerOne = Player("Player One", "O")
    playerTwo = Player("Bot", "X")
    Modal.hideModal()
    Gameboard.updateScoreDisplay()
})

restartBtn.addEventListener("click", () => {
    Game.restartGame()
    Gameboard.clearBoard()
})