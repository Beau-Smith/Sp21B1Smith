spots = [
    [0,0,0] ,
    [0,0,0] ,
    [0,0,0]
];

currentPlayer = 1;  //also decides which mark to use

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
                if(mark == 1) {             //forever game loop
                    drawX(row, col);
                    //spots[row][col] = "used";
                } else if (mark == 2) {
                    drawO(row, col);
                    //spots[row][col] = "used";
                } else {
                    continue;
                }
            }
        }
}

function mouseClicked() {
    row = getRowForClick(mouseY); 
    col = getColForClick(mouseX);
        console.log(row + " " + col);
        if (row == null || col == null){ //does not attempt to get null values from spots
            return                       //therefore does not give error message in console
        }
    if(spots[row][col] == 0){  //this stops users from picking a square that's already been played
        spots[row][col] = currentPlayer; //whichever square was pick = mark(X or O)
        if(currentPlayer == 1) {
            currentPlayer = 2;
        } else {
            currentPlayer = 1;
        }
        draw();
        return false;
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

function drawX(row, col){
    strokeWeight(4);
    centerX = width / 6 + (width / 3 * col);
    centerY = height / 6 + (height / 3 * row);
    xWidth = width / 3 - 20;
    line(centerX - xWidth / 2, centerY - xWidth / 2,
        centerX + xWidth / 2, centerY + xWidth / 2);
    line(centerX + xWidth / 2, centerY - xWidth / 2, centerX - xWidth / 2, centerY + xWidth / 2);
}

function drawO(row, col){
    strokeWeight(4);
    noFill();
    centerX = width / 6 + (width / 3 * col);
    centerY = height / 6 + (height / 3 * row);
    circleWidth = width / 3 - 20;
    circle(centerX, centerY, circleWidth);
}
/*
function winTest(){
    if(spots[0] || spots[1] || spots[2] == (1,1,1)){
        console.log("Player 1 Wins!");
    }
}
*/

//I still need to figure out a win condition. Don't forget tomorrow