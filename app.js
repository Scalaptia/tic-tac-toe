gameBoard = ["", "", "", "", "", "", "", "", ""]

const boardEl = document.querySelector("#gameBoard")
const boxesEl = document.querySelectorAll(".board-box")

const Player = (name, mark) => { // Player factory function
    const placeMark = (box) => {
        gameBoard.splice((box-1), 1, mark) // Add mark to gameBoard array
    }


    return {name, mark, placeMark}
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

    return {showBoard}
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

    return {updateActivePlayer}
})()

boxesEl.forEach(box => {
    box.addEventListener("click", () => {
        Game.updateActivePlayer().placeMark(box.id.substring(4))
        Gameboard.showBoard()
    })
})

let playerOne = Player("Fernando", "X")
let playerTwo = Player("CPU", "O")