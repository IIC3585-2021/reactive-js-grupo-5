var trophy;
var playerOne;
var playerTwo;

function startGame() {
    myGameArea.start();

    playerOne = new NewComponent(0, 570, "pink");
    playerTwo = new NewComponent(970, 570, "orange");

    obstacle1l = new NewObstacle(150, 40, 50,500);
    obstacle1r = new NewObstacle(150, 40, 800,500);
    obstacle2l = new NewObstacle(50, 150, 150, 350);
    obstacle2r = new NewObstacle(50, 150, 800, 350);
    obstacle3l = new NewObstacle(100, 30, 0, 415);
    obstacle3r = new NewObstacle(100, 30, 900, 415);
    obstacle4l = new NewObstacle(150, 40, 50,310);
    obstacle4r = new NewObstacle(150, 40, 800,310);

    obstacle5l = new NewObstacle(40, 40, 255,500);
    obstacle6l = new NewObstacle(40, 40, 345,500);
    obstacle7l = new NewObstacle(40, 40, 215,400);
    obstacle8l = new NewObstacle(40, 40, 310,400);
    obstacle9l = new NewObstacle(40, 40, 300,300);
    obstacle10l = new NewObstacle(40, 40, 390, 300);

    obstacle5r = new NewObstacle(40, 40, 605,500);
    obstacle6r = new NewObstacle(40, 40, 695,500);
    obstacle7r = new NewObstacle(40, 40, 565,400);
    obstacle8r = new NewObstacle(40, 40, 660,400);
    obstacle9r = new NewObstacle(40, 40, 650,300);
    obstacle10r = new NewObstacle(40, 40, 740, 300);

    obstacle11l = new NewObstacle(20, 250, 450, 300);
    obstacle11r = new NewObstacle(20, 250, 530, 300);

    obstacle12l = new NewObstacle(270, 20, 0,230);
    obstacle12m = new NewObstacle(300, 20, 350,200);
    obstacle12r = new NewObstacle(270, 20, 730,230);
    obstacleFinal = new NewObstacle(700, 30, 150, 100);

    trophy = new NewImage(50, 50, "trophy.jpeg" , 485, 50);

    const { fromEvent } = rxjs; 
    const { map } = rxjs.operators;

    const playerOneObserver = fromEvent(document, "keydown").pipe(
        map((event) => event.key)
    );

    playerOneObserver.subscribe((key) => {
        const direction = {
            ArrowUp: { x: 0, y: -1 },
            ArrowDown: { x: 0, y: 1 },
            ArrowLeft: { x: -1, y: 0 },
            ArrowRight: { x: 1, y: 0 },
        };
        playerOne.speedx = direction[key]["x"];
        playerOne.speedy = direction[key]["y"];
    });



}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.canvas.style = "border: 4px solid grey";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    trophy.update();
    playerOne.newPos();
    playerOne.update();
    playerTwo.newPos();
    playerTwo.update();
}

function NewComponent(x, y, color) {
    this.width = 30;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.speedx = 0
    this.speedy = 0
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function() {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedx
        this.y += this.speedy   
    }
}

function NewObstacle(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = "lightblue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

function NewImage(width, height, src, x, y) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;   
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
        }
}

    



