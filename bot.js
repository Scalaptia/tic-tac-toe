const Bot = (() => {
    const randomMove = () => {
        let randomIndex = Math.floor(Math.random() * 9);

        if (gameBoard[randomIndex] == "") {
            return randomIndex;
        } else {
            return Bot.randomMove();
        }
    }

    const checkBotWin = () => {
        let roundWinner = null

        if ((Game.checkRows(bot.mark) || Game.checkCols(bot.mark) || Game.checkDiags(bot.mark)) == true){
            roundWinner = "botWin"
            
        } else if ((Game.checkRows(human.mark) || Game.checkCols(human.mark) || Game.checkDiags(human.mark)) == true){
            roundWinner = "humanWin"
            
        } else {
            let count = 0
            for (let box = 0; box < 9; box++) { 
                if (gameBoard[box] !== "") {
                    count++
                }
            }
            if (count == 9) {
                roundWinner = "tie"
            }
        }

        return roundWinner
    }

    const bestMove = () => {
        let count = 0

        for (let box = 0; box < 9; box++) {   // Check if board is empty
            if (gameBoard[box] == "") {
                count++
            }
        }

        if (count == 9) {
            let randomIndex = Math.floor(Math.random() * 4);

            switch (randomIndex) {   // Place in random corner
                case 0:
                    return 0
                case 1:
                    return 2
                case 2:
                    return 6
                case 3:
                    return 8
            }
        }

        let bestScore = -Infinity
        let move
        for (let box = 0; box < 9; box++) { 
            console.log(`Checking box ${box}`)
            if (gameBoard[box] === "") {
                console.log(`Box ${box} is available`)
                bot.placeMark(box)          // Do move
                let score = minimax(0, false)             // Check board
                gameBoard[box] = ""                       // Undo move
                if (score > bestScore) {
                    bestScore = score
                    move = box
                }
            }
            else {
                console.log(`Box ${box} is not empty`)
            }
        }
        return move
    }
    
    let scores = {
        botWin: 1,
        humanWin: -1,
        tie: 0
    }

    const minimax = (depth, isMaximizing) => {
        let result = checkBotWin()
        console.log(`The result is ${result}`)

        if (result !== null) {     // If its a win/loss, return score
            console.log("The game finishes")
            return scores[result]
        }

        if (isMaximizing) {  // Check if its bots turn
            console.log("Is maximizing is true")
            let bestScore = -Infinity
            for (let box = 0; box < 9; box++) {
                if (gameBoard[box] == "") {
                    bot.placeMark(box) // Do move for bot
                    let score = minimax(depth + 1, false) // Check board
                    gameBoard[box] = "" // Undo move
                    bestScore = Math.max(score, bestScore)
                }
            }
            return bestScore
        } else {  // Check if its humans turn
            let bestScore = Infinity
            for (let box = 0; box < 9; box++) {
                if (gameBoard[box] == "") {
                    human.placeMark(box) // Do move for human
                    let score = minimax(depth + 1, true)
                    gameBoard[box] = ""
                    bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore
        }
    }

    return {
        randomMove,
        bestMove
    }
})()