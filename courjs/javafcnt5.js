/* Fonction closure =>
function test () {
	let teub = 0
	return () => {
		console.log(teub++)
	}

	const fn = test()
}*/

	// Width = largeur = x
	// Height = hauteur = y
	// strokeRect (x, y, largeur, hauteur); => contour rectangle
	// fillRect (x, y, largeur, hauteur); => rectangle entier
	// clearRect (x, y, largeur, hauteur); => supprime zone rectangle
	// ctx.font = '48px serif'; => police d'ecriture
	// ctx.fillText('Hello world', 10, 50); => ecrire texte

//	requestAnimationFrame(game);

/* Controller
 * => ArrowRight
 * <= ArrowLeft
 * /\ Arrowup
 * \/ ArrowDown
*/

let img = new Image();

const canvas = document.getElementById('canvas'); // <= Initialisation canvas memoire
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; // <= taille du canvas en largeur adapter a la fenetre
canvas.height = window.innerHeight; // <= taille du canvas en hauteur adapter a la fenetre

const ground = Math.round(canvas.height / 2);

// Debug console.log
const square = {
	acc: {
		x: 0,
		y: 2
	},
	speed: {
		x: 0,
		y: 0
	},
	pos: {
		x: 100,
		y: ground
	},
	size: 50,
	frame: 0,
	ground: ground,
	newground: ground,
	saveframe: 0,
	jump: false,
	dbjump: false,
	score: 0,
	bestscore: 0
}

let ennemies = []

function createEnemy(x) {
	let size = Math.round(Math.random() * 70);
	let surprise = Math.round(Math.random()) * 300;

	const obj = {
		acc: {
			x: 0,
			y: 2
		},
		speed: {
			x: -10,
			y: 0
		},
		pos: {
			x: x,
			y: ground - size
		},
		size: {
			x: 50,
			y: 50 + size
		},
		frame: 0,
		ground: ground - size,
		newground: ground - size,
		saveframe: 0,
		jump: false,
		dbjump: false,
		suprisejump: 600 - surprise
	}
	if (Math.round(Math.random() * 10) > 1) {
		obj.suprisejump = -600;
	}
	if (Math.round(Math.random() * 3) == 1) {
		obj.size.y = 50;
		obj.pos.y = ground - 200;
		obj.ground = ground - 200;
		obj.newground = ground - 200;
		obj.suprisejump = -600
	}
	ennemies.push(obj);
}

function collision(ennemy) {
	if (square.pos.x < ennemy.pos.x + ennemy.size.x &&
	square.pos.x + square.size > ennemy.pos.x &&
	square.pos.y < ennemy.pos.y + ennemy.size.y &&
	square.pos.y + square.size > ennemy.pos.y) {
		return (false);
	}
	return (true);
}

function dealKey(key) {
	if (key === "ArrowUp" && !square.jmp) {
		square.jmp = true;
		square.speed.y = 30;
		square.frame = 0;
	} else if (key === "ArrowUp" && square.jmp && !square.dbjump) {
		square.newground = square.pos.y;
		square.saveframe = square.frame;
		square.speed.y = 30;
		square.frame = 0;
		square.dbjump = true;
	}
	if (key === 'ArrowRight') {
		ctx.clearRect(ennemies[0].pos.x, ennemies[0].pos.y, ennemies[0].size.x, ennemies[0].size.y);
		createEnemy(ennemies[ennemies.length - 1].pos.x + 400);
		ennemies.splice(0, 1);
	}
}

function mouvement(mvt) {
	mvt.pos.x = mvt.pos.x + mvt.speed.x;
	mvt.pos.y = ((mvt.acc.y / 2) * (mvt.frame ** 2) - (mvt.speed.y * mvt.frame) + mvt.newground);
	if (mvt.pos.y > mvt.ground) {
		mvt.jmp = false
		mvt.dbjump = false;
		mvt.newground = mvt.ground;
		mvt.pos.y = mvt.ground;
	}
	mvt.frame++;
}

function playerMouvement() {
	ctx.clearRect(square.pos.x, square.pos.y, square.size, square.size);
	mouvement(square)
	ctx.fillStyle = 'black';
//	ctx.fillRect(square.pos.x, square.pos.y, square.size, square.size);
	ctx.drawImage(img, square.pos.x, square.pos.y, 50, 50);
}

function enemyMouvement() {
	for (const [ index, enemy ] of ennemies.entries()) {
		if (enemy.pos.x == enemy.suprisejump)
		{
			enemy.jmp = true;
			enemy.speed.y = 30;
			enemy.frame = 0;
		}
		if (enemy.pos.x < 0) {
			createEnemy(ennemies[ennemies.length - 1].pos.x + 400);
			ennemies.splice(0, 1);
		} else {
			ctx.clearRect(enemy.pos.x, enemy.pos.y, enemy.size.x, enemy.size.y);
			mouvement(enemy)
			ctx.fillStyle = 'red';
			enemy.pos.x > 0 && ctx.fillRect(enemy.pos.x, enemy.pos.y, enemy.size.x, enemy.size.y);
		}
		if (!collision(enemy)) {
			return (false);
		}
	}
	return (true);
}

function gameOver() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	if (confirm("Try again")) {
		ennemies.splice(0, ennemies.length);
		let num = 600;
		while (num <= 3000 ) {
			createEnemy(num);
			num += 400;
		}
		ctx.fillStyle = 'black';
		ctx.fillRect(0, ground + square.size, canvas.width, 10);
		square.score = 0;
		return (true);
		} else {
			ctx.font = '100px Quicksand';
			ctx.fillStyle = 'red';
			ctx.textAlign = "center"; 
			ctx.fillText(`Game Over Score = ${square.score}`, canvas.width / 2, canvas.height / 2);
			return (false);
	}
}

function game() {
	playerMouvement();
	if (!enemyMouvement()) {
		if (!gameOver()) { return (false); }
	}
	ctx.fillStyle = 'black';
	ctx.clearRect(0, 0, 300, 21);
	ctx.font = '20px Quicksand';
	if (square.score > square.bestscore) {
		square.bestscore = square.score;
	}
	ctx.fillText(`Score: ${square.score} Bestscore: ${square.bestscore}`, 0, 20);
	ctx.fillStyle = 'red';
	square.score++;
	requestAnimationFrame(game);
}

function getKey() {
	document.addEventListener('keydown', (event) => {
		dealKey(event.key);
		event.preventDefault()
	})
}

getKey();

let num = 600;
while (num <= 3000 ) {
	createEnemy(num);
	num += 400;
}
img.src = "./44497.png";
ctx.fillRect(0, square.pos.y + square.size, canvas.width, 10);
img.onload = game;
