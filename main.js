const gameBtn = document.querySelector(".gameBtn")
const pauseBtn = document.querySelector(".pauseBtn");
const timer = document.querySelector(".timer")
const ground = document.querySelector(".ground");
const alert = document.querySelector(".alert");
const alertMessage = document.querySelector(".alertMessage");
const counter = document.querySelector(".counter");
const replayBtn = document.querySelector(".replayBtn");
const sound_bg = new Audio('bg.mp3');
const sound_alert = new Audio ("alert.wav");
const game = () => gameStart();

gameBtn.addEventListener("click", game);

function gameStart () {
    sound_alert.play();
    sound_bg.play();
    randomSet();

    timer.innerHTML = `00:10`;
    timeCountDown();

    gameBtn.style.display = "none";
    pauseBtn.style.visibility = "visible";
    pauseBtn.style.display = "block"; 

    alert.style.display = "none";

    counter.innerHTML = "10";

    gameBtn.removeEventListener("click", game);
    ground.addEventListener("click", clickCarrot);
}

function timeCountDown () {
    let timeLeft = 9
    const interval = setInterval(() => {
    timer.innerHTML = `00:0${timeLeft}`;
    timeLeft--;
    if (timeLeft < 0) {
        clearInterval(interval);
        showAlert('lose');
        sound_alert.play();
    } else if (counter.textContent == 0) {
        clearInterval(interval);
        showAlert('win');
        const sound_win = new Audio ("game_win.mp3");
        sound_win.play();
    }
  }, 1000);

  pauseBtn.addEventListener("click", () => {
    clearInterval(interval);
    showAlert('stop');
    sound_alert.play();
})

  function clickClear (e) {
    if (e.target.className == "gameChar bug") {
        let sound_bug = new Audio ("bug_pull.mp3");
        sound_bug.play();
        showAlert('lose');
        clearInterval(interval);
    } else {
        return;
    }
  }
  ground.addEventListener("click", clickClear);
}

function clickCarrot(e) {
    if (e.target.className == "gameChar carrot") {
        const sound_carrot = new Audio ("carrot_pull.mp3");
        sound_carrot.play();
        const clickedCarrot = e.target
        console.log(clickedCarrot);
        ground.removeChild(clickedCarrot);
        const carrotArray = document.querySelectorAll('.carrot');
        counter.innerHTML = carrotArray.length;
    }
}

function randomSet () {
    //return the ground with randomly set bugs and rabbits
    for (let i=0; i < 10; i++) {
        const bug = document.createElement("img")
        bug.setAttribute("src", "bug.png")
        bug.setAttribute("class", "gameChar bug")
        const carrot = document.createElement("img")
        carrot.setAttribute("src", "carrot.png")
        carrot.setAttribute("class", "gameChar carrot")

        let xyBug = randomPosition(bug);
        let xyCarrot = randomPosition(carrot);

        bug.style.top = `${xyBug[1]}px`;
        bug.style.left = `${xyBug[0]}px`;
        carrot.style.top = `${xyCarrot[1]}px`;
        carrot.style.left = `${xyCarrot[0]}px`;

        ground.appendChild(bug);
        ground.appendChild(carrot);
    }
    return ground;
}

function randomPosition(gameChar) {
    let randomY = Math.floor(Math.random()*(ground.offsetHeight-gameChar.height));
    let randomX = Math.floor(Math.random()*(ground.offsetWidth-gameChar.width));
    return [randomX, randomY];
}

function showAlert(cases) {{
    sound_bg.pause();
    sound_bg.load();
    pauseBtn.style.visibility = "hidden";

    if (cases == 'lose'){
        alert.style.display = "flex";
        alertMessage.innerHTML = "YOU LOST ☠";
        ground.removeEventListener("click", clickCarrot);
    } else if (cases == 'win'){
        alert.style.display = "flex";
        alertMessage.innerHTML = "YOU WON 🎉";
    } else if (cases == 'stop') {
        alert.style.display = "flex";
        alertMessage.innerHTML = "TRY AGAIN?";
        ground.removeEventListener("click", clickCarrot);
    }
}}

replayBtn.addEventListener("click", () => {
    ground.innerHTML = "";
    gameStart();
    sound_alert.play();
});
