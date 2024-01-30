let grid = document.querySelector(".grid");
let resultDisplay = document.querySelector(".results");
let invadersRemoved = [];
let currentShooterIndex = 202;
let invadersId;
let isGoingRight = true;
let direction = 1;
let results = 0;

let width = 15;

for (let i = 0; i < width * width; i++) {
    let square = document.createElement("div");
    square.id = i;
    grid.appendChild(square);
}

let allSquares = Array.from(document.querySelectorAll(".grid div"));

console.log(allSquares);

let Invaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function draw() {
    for (let i = 0; i < Invaders.length; i++) {
        if (!invadersRemoved.includes(i)) {
            allSquares[Invaders[i]].classList.add("spaceInvader");
        }
    }
}
draw();

allSquares[currentShooterIndex].classList.add("shooter");

function removeInvaders() {
    for (let i = 0; i < Invaders.length; i++) {
        allSquares[Invaders[i]].classList.remove("spaceInvader");
    }
}

function moveShooter(e) {
    allSquares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;

    }
    allSquares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
    const leftEdge = Invaders[0] % width === 0;
    const rightEdge = Invaders[Invaders.length - 1] % width === width - 1;
    removeInvaders();
    if (rightEdge && isGoingRight) {
        for (let i = 0; i < Invaders.length; i++) {
            Invaders[i] += width + 1;
            direction = -1;
            isGoingRight = false;
        }
    }
    if (leftEdge && !isGoingRight) {
        for (let i = 0; i < Invaders.length; i++) {
            Invaders[i] += width - 1;
            direction = 1;
            isGoingRight = true;
        }
    }
    for (let i = 0; i < Invaders.length; i++) {
        Invaders[i] += direction;
    }
    draw();

    if (allSquares[currentShooterIndex].classList.contains("spaceInvader")) {
        resultDisplay.innerHTML = 'GAME OVER!';
        clearInterval(invadersId);
    }
    if (invadersRemoved.length === Invaders.length) {
        resultDisplay.innerHTML = 'You win';
        clearInterval(invadersId);
    }
}
invadersId = setInterval(moveInvaders, 600);

function shoot(e){
    let laserId;
    let currenLaserIndex = currentShooterIndex;

    function moveLaser(){
        allSquares[currenLaserIndex].classList.remove("laser");
        currenLaserIndex -= width;
        allSquares[currenLaserIndex].classList.add("laser");
    if(allSquares[currenLaserIndex].classList.contains('spaceInvader')){
        allSquares[currenLaserIndex].classList.remove('laser');
        allSquares[currenLaserIndex].classList.remove('spaceInvader');
        allSquares[currenLaserIndex].classList.add('boom');

        setTimeout(() => allSquares[currenLaserIndex].classList.remove('boom'), 300)
        clearInterval(laserId);

        const invaderRemoved = Invaders.indexOf(currenLaserIndex);
        invadersRemoved.push(invaderRemoved);
        results ++;
        resultDisplay.innerHTML = results;
    }
    }

    if(e.key === 'ArrowUp'){
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener('keydown', shoot);