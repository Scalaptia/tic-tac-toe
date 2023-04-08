const Bot = (() => {
    const randomMove = () => {
        let randomIndex = Math.floor(Math.random() * 10);

        if (gameBoard[randomIndex - 1] == "") {
            return randomIndex;
        } else {
            return Bot.randomMove();
        }
    }

    return {
        randomMove
    }
})()