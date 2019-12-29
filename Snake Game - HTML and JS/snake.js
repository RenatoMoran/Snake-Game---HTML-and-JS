const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// Criar uma unidade
const box = 32;

// Carregar imagens
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// Carregar audio

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let left = new Audio();
let right = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

// Cria a cobrinha

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
}

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// Criar um score

let score = 0;

// Controlar a cobrinha

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// Verifica que houve collisão

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


// Desenhar tudo no canvas

function draw(){

	ctx.drawImage(ground,0,0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

	ctx.drawImage(foodImg, food.x, food.y);

	// Posição antiga da cobrinha

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// Qual direção?
	if( d == "LEFT" ) snakeX -= box;
	if( d == "UP" ) snakeY -= box;
	if( d == "RIGHT" ) snakeX += box;
	if( d == "DOWN" ) snakeY += box;

	// Se a cobrinha comer uma frutinha

	if(snakeX == food.x && snakeY == food.y){
		score++;
		eat.play();

		food = {
			x : Math.floor(Math.random()*17*1) * box,
			y : Math.floor(Math.random()*15*3) * box

		}
	}else{
		// Remove rabo
		snake.pop();
	}

	// Adiciona uma nova cabeça a cobrinha

	let newHead = {
		x : snakeX,
		y : snakeY
	} 

	// Game over

	if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)){
		clearInterval(game);
		dead.play();
	}

	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);

}

// Chamar a função draw sempre que passar 100 ms

let game = setInterval(draw,100);