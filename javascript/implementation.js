/*
    @function moveBgLeft
    @param {number} x
    @returns {number}
    @desc return the input param minus 10 (or some other value that you like)
*/
function moveBgLeft(x) {
    console.log(x);
    // if(x !== 'number'){return false}
    return x - 10;
}

/*
    @function keyUpHandler
    @param {number} keyCode
    @param {boolean} upArrowPressed
    @param {boolean} rightArrowPressed
    @param {boolean} downArrowPressed
    @param {boolean} leftArrowPressed
    @param {boolean} shiftKeyPressed 
    @returns { object }
    @desc returns all the above params but flips a switch setting val to false
*/

function keyDownHandler(keyCode = 0, 
    upArrowPressed = false, 
    rightArrowPressed = false, 
    downArrowPressed = false, 
    leftArrowPressed = false, 
    shiftKeyPressed = false) {
    // you need a bunch of if statements here...

    keyCode = event.keyCode
    if(keyCode === 38) upArrowPressed = true;
    if(keyCode === 39) rightArrowPressed = true;
    if(keyCode === 40) downArrowPressed = true;
    if(keyCode === 37) leftArrowPressed = true;
    if(keyCode === 16) shiftKeyPressed = true;

    return {
        upArrowPressed,
        rightArrowPressed,
        downArrowPressed,
        leftArrowPressed,
        shiftKeyPressed
    };
}

/*
    @function keyDownHandler
    @param {number} keyCode
    @param {boolean} upArrowPressed
    @param {boolean} rightArrowPressed
    @param {boolean} downArrowPressed
    @param {boolean} leftArrowPressed
    @param {boolean} shiftKeyPressed 
    @returns { object }
    @desc returns all the above params but flips a switch setting val to true 
*/
function keyUpHandler(keyCode = 0, 
    upArrowPressed = true, 
    rightArrowPressed = true, 
    downArrowPressed = true, 
    leftArrowPressed = true, 
    shiftKeyPressed = true) {
    // you need a bunch of if statements here...

    keyCode = event.keyCode
    if(keyCode === 38) upArrowPressed = false;
    if(keyCode === 39) rightArrowPressed = false;
    if(keyCode === 40) downArrowPressed = false;
    if(keyCode === 37) leftArrowPressed = false;
    if(keyCode === 16) shiftKeyPressed = false;

    return {
        upArrowPressed,
        rightArrowPressed,
        downArrowPressed,
        leftArrowPressed,
        shiftKeyPressed
    };
}

/*
    @function shouldJumpNow
    @param {number} y
    @returns {number}
    @desc subtracts a value from y to simulate jump
*/
function shouldJumpNow(y) {

    // return y - 60;
    return Math.floor(Math.random() * 5) + 0.5;
}


