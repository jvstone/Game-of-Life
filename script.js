


//Create the base grid
function createGrid(width, height){
    for(var i = 0; i<width/20; i++){
        for(var j =0; j<height/20; j++){
            ctx.strokeRect(i*20,j*20,20,20);
            
        }
    }
}



//Game Tile
function tile (row, col){
    this.isAlive=false;
    this.numNeighbors = 0;
    this.row = row;
    this.col = col 
}
tile.prototype={
    constructor:tile,
    getAlive:function(){
        return this.isAlive;
    },
    toggleAlive:function(){
        this.isAlive= !this.isAlive;
    },
    updateAlive:function(){
        switch(this.numNeighbors){
            case 0:
            case 1:
                this.isAlive = false;
                break;
            case 2:
                if(this.isAlive){
                    this.isAlive=true;
                    break;
                }else{
                    this.isAlive=false;
                    break;
                }
            case 3:
                this.isAlive = true;
                break;
            case 4:
            case 5: 
            case 6:
            case 7:
            case 8:
                this.isAlive=false;
                break;
        default:
            this.isAlive=false;

            }
        },
        drawAlive:function(){
            if(this.isAlive){
                ctx.fillRect((this.col-1)*20,(this.row-1)*20, 20,20);
            }else{
                ctx.clearRect((this.col-1)*20,(this.row-1)*20, 20,20);
                ctx.strokeRect((this.col-1)*20,(this.row-1)*20, 20,20);
            }

        }
    }

//Grid
function GameGrid(width, height){
    this.width=width;
    this.height= height;
    this.grid = new Array(height+2);
    for(var i =0; i<=this.height+1; i++){
        this.grid[i]=new Array(width+2);
        for(var j=0;j<=this.width+1;j++){
            this.grid[i][j] = new tile(i,j);
        }
    }
}
GameGrid.prototype={
    constructor:GameGrid,
    getNeighbors:function(i, j){
                var count = 0;
                count+= this.checkAlive(i-1,j-1);
                count+= this.checkAlive(i-1,j);
                count+= this.checkAlive(i-1,j+1);
                count+= this.checkAlive(i,j-1);
                count+= this.checkAlive(i,j+1);
                count+= this.checkAlive(i+1,j-1);
                count+= this.checkAlive(i+1,j);
                count+= this.checkAlive(i+1,j+1);
                this.grid[i][j].numNeighbors = count;   
        },
        checkAlive:function(row, col){
            if(this.grid[row][col].getAlive()){
                return 1;
            }else{
                return 0;
            }
        },

        updateCells:function(){
            for(var i = 1; i<this.width; i++){
                for(var j = 1; j<this.height; j++){
                    this.getNeighbors(i,j);   
                }

            }
            for(var i = 1; i<this.width; i++){
                for(var j = 1; j<this.height; j++){
                    this.grid[i][j].updateAlive();   
                }

            }
        },
        renderCells:function(){
            for(var i = 1; i<this.width; i++){
                for(var j = 1; j<this.height; j++){
                    
                    this.grid[i][j].drawAlive();
                }
            }
        }
    };


var canvas = document.getElementById('grid');
var ctx = canvas.getContext('2d');
var canWidth = canvas.width;
var canHeight = canvas.height;
var gameRow = canWidth/20;
var gameCol = canHeight/20;
createGrid(canWidth,canHeight);
var game = new GameGrid(gameRow, gameCol);
var isRunning = false;
var startButton = document.getElementById('start');
var interval;
game.grid[10][10].isAlive=true;
game.grid[10][11].isAlive=true;
game.grid[10][12].isAlive=true;
game.renderCells();
ctx.canvas.addEventListener("click", function(event){
    var mouseX = event.clientX-ctx.canvas.offsetLeft;
    var mouseY = event.clientY-ctx.canvas.offsetTop;
    var row = Math.floor(mouseY/20)+1;
    var col = Math.floor(mouseX/20)+1;
    game.grid[row][col].toggleAlive();
    game.grid[row][col].drawAlive();
});
startButton.addEventListener('click', function(event){
    if(!isRunning){
    startButton.innerHTML="Stop";
    interval = setInterval(function(){
            game.updateCells();
            game.renderCells();
        },100);

    }else{
        clearInterval(interval);
        startButton.innerHTML="Start";
        
    }
    isRunning=!isRunning;
   
})


