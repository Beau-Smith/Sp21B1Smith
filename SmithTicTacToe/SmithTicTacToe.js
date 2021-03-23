spots = [
    [0,0,0] ,  //the first bracket is down
    [0,0,0] ,  //the second bracket is side to side
    [0,0,0]
];

currentPlayer = 1;  //also decides  which mark to use
playOn = true;

function setup() {
    createCanvas(300, 300); //Makes the board
    noLoop();
}

function draw() {
    background(220);
    strokeWeight(4);
        line(0, height / 3, width, height / 3);
        line(0, height / 1.5, width, height / 1.5); //draws grid
        line(width / 3, 0, width / 3 ,height);
        line(width / 1.5, 0, width / 1.5 ,height);
        for(row = 0; row < spots.length; row++) {
            for(col = 0; col < spots[row].length; col++) {
                mark = spots[row][col];
                if(mark == 1) {             //game loop
                    drawX(row, col);
                } else if (mark == -1) {
                    drawO(row, col);
                }
            }
        }
}

function mouseClicked() {
    if(playOn != false){
        row = getRowForClick(mouseY); 
        col = getColForClick(mouseX);
        if (row == null || col == null){ //does not attempt to get null values from spots
            return                       //therefore does not give error message in console
        }
        if(spots[row][col] == 0){  //this stops users from picking a square that's already been played
            spots[row][col] = currentPlayer; //whichever square was pick = mark(X or O)
            if(currentPlayer == 1) {
                currentPlayer = -1;
            } else {
                currentPlayer = 1;
            }
            draw();
            winTest();
            return false;
        }
    }
}

function getRowForClick(y){  //returns which column is clicked
    if (y < height / 3 && y > 0){
        return 0;
    } else if (y < height / 3 * 2) {
        return 1;
    } else if (y < height) {
        return 2;
    } else {
        return null;    //outputs null if the user clicks outside the grid
    }
}

function getColForClick(x) {  //returns which row is clicked
    if(x < width / 3 && x > 0){
        return 0;
    } else if (x < width / 3 * 2) {
        return 1;
    } else if (x < width) {
        return 2;
    } else {
        return null;    //outputs null if the user clicks outside the grid
    }
}

function drawX(row, col){       //X = 1
    strokeWeight(4);
    centerX = width / 6 + (width / 3 * col);
    centerY = height / 6 + (height / 3 * row);
    xWidth = width / 3 - 20;
    line(centerX - xWidth / 2, centerY - xWidth / 2,
        centerX + xWidth / 2, centerY + xWidth / 2);
    line(centerX + xWidth / 2, centerY - xWidth / 2, centerX - xWidth / 2, centerY + xWidth / 2);
}

function drawO(row, col){       //O = -1
    strokeWeight(4);
    noFill();
    centerX = width / 6 + (width / 3 * col);
    centerY = height / 6 + (height / 3 * row);
    circleWidth = width / 3 - 20;
    circle(centerX, centerY, circleWidth);
}

function winTest(){
    row1 = spots[0][0] + spots[0][1] + spots[0][2];     //gets the value of
    row2 = spots[1][0] + spots[1][1] + spots[1][2];     //each line on the board
    row3 = spots[2][0] + spots[2][1] + spots[2][2];     
    col1 = spots[0][0] + spots[1][0] + spots[2][0];     //if it equals 3 or -3,
    col2 = spots[0][1] + spots[1][1] + spots[2][1];     //the game is over
    col3 = spots[0][2] + spots[1][2] + spots[2][2];   
    diagonalDown = spots[0][0] + spots[1][1] + spots[2][2];
    diagonalUp = spots[0][2] + spots[1][1] + spots[0][2];
    rowsFilled = [row1,col1,row2,col2,row3,col3,diagonalDown,diagonalUp]; //places the values in one array
    //console.log(rowsFilled);
    //console.log(playOn);
    if(rowsFilled.includes(3)){  //checks the array for 3 to see if X's won
        console.log("X's Win!");
        playOn = false;
    } else if(rowsFilled.includes(-3)){ //checks the array for -3 to see if O's won
        console.log("O's Win!");
        playOn = false;
    } return;
    //if the game is won, playOn is set to false so that no more squares may be played
}
