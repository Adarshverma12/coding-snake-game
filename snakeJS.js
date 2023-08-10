
    // variable for games
    let inputDir = { x: 0, y: 0 };
    const moveSound = new Audio("move.mp3");
    const musicSound = new Audio("music.mp3");
    const foodSound = new Audio("food.mp3");
    const gameSound = new Audio("gameover.mp3");
    let speed = 7;
    let score = 0;
    let lastPaintTime = 0;
    let snakeArr = [
        { x: 13, y: 15 }
    ]
    food = { x: 6, y: 5 }

    // function for games
    function main(ctime) {
        window.requestAnimationFrame(main);
        // console.log(ctime)
        if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
            return;
        }
        lastPaintTime = ctime;
        gameEngin();
    }

    function isCollide(snake) {
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;
            }
        }
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true;
        }


    }
    function gameEngin() {

        // update snake and snake food

        if (isCollide(snakeArr)) {
            gameSound.play()
            musicSound.pause();
            inputDir = { x: 0, y: 0 }
            alert(`Your Game Is over! and your total score is ${score}`)
            alert("Press any key to Restart the Game!!")
            snakeArr = [{ x: 13, y: 15 }]
            musicSound.play();
            score = 0;
        }

        // when snake eat food and increasesing the score

        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
            foodSound.play();
            score += 1;
            if (score > hiscoreval) {
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                HiScoreBox.innerHTML = "Hi Score " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: " + score;
            let a = 2;
            let b = 16;
            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        }

        // movement of snake

        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;



        // display snake

        boader.innerHTML = "";
        snakeArr.forEach((e, index) => {
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if (index === 0) {
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('snake');
            }
            boader.appendChild(snakeElement);
        });

        // display snake food

        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        boader.appendChild(foodElement);
    }

    // main function calling for game
    moveSound.play();
    let hiscore = localStorage.getItem("hiscore");
    if (hiscore === null) {
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
    }
    else {
        hiscoreval = JSON.parse(hiscore);
        HiScoreBox.innerHTML = "Hi Score " + hiscoreval;
    }


    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
        inputDir = { x: 0, y: 1 };
        moveSound.play();
        switch (e.key) {
            case "ArrowUp":
                console.log("ArrowUp");
                inputDir.x = 0;
                inputDir.y = -1;
                break;

            case "ArrowDown":
                console.log("ArrowDown");
                inputDir.x = 0;
                inputDir.y = 1;
                break;

            case "ArrowLeft":
                console.log("ArrowLeft");
                inputDir.x = -1;
                inputDir.y = 0;
                break;

            case "ArrowRight":
                console.log("ArrowRight");
                inputDir.x = 1;
                inputDir.y = 0;

                break;

            default:
                break;
        }
    })