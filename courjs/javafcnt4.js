/* Fonction closure =>
function test () {
	let teub = 0
	return () => {
		console.log(teub++)
	}

	const fn = test()
}*/


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

	const canvas = document.getElementById('canvas'); // <= Initialisation canvas memoire
	const ctx = canvas.getContext('2d');
	canvas.width = window.innerWidth; // <= taille du canvas en largeur
	canvas.height = window.innerHeight; // <= taille du canvas en hauteur

//	requestAnimationFrame(game);

/* Controller
 * => ArrowRight
 * <= ArrowLeft
 * /\ Arrowup
 * \/ ArrowDown
*/

// Debug console.log
const square = {
	axeX: 0,
	axeY: Math.round(canvas.height / 2),
	size: 50,
//	fcnt: false,
	animation: false,
	dbanimation: false,
	fn: walk
}

const animation = {
	frame: 0,
	clock: 0,
	deby: 0,
	fx: sqrt
}

const dbanimation = {
	frame: 0,
	clock: 0,
	deby: 0,
	fx: sqrt
}

function deal_key(key, fctn = false) {
	if (key === "ArrowUp" && square.animation === false) {
		square.fn = jump;
	}
	if (key === "ArrowUp" && square.animation === true && square.dbanimation === false) {
		square.fn = dbjump
	}
}

function walk() {
	square.axeX = (square.axeX + 10) % canvas.width;
}

function sqrt(x, y) {
	x -= 15;
	y += (x ** 2);
	y -= 225;
	return (y)
}

function jump() {
	if (square.animation === false) {
		square.animation = true;
		animation.clock = 30;
		animation.frame = 0;
		animation.deby = square.axeY;
	} else {
		walk();
		square.axeY = animation.fx(animation.frame, animation.deby);
		animation.frame++;
		animation.clock--;
	}
	if (animation.clock == -1 && square.animation == true) {
		square.animation = false;
		square.dbanimation = false;
		square.fn = walk;
	}
}

function dbjump() {
	if (square.dbanimation === false) {
		square.dbanimation = true;
		dbanimation.clock = 30;
		dbanimation.frame = 0;
		dbanimation.deby = square.axeY;
	} else {
		walk();
		square.axeY = dbanimation.fx(dbanimation.frame, dbanimation.deby);
		dbanimation.frame++;
		dbanimation.clock--;
	}
	if (dbanimation.clock == -1 && square.dbanimation == true) {
		square.fn = jump;
	}

}

function game() {
	ctx.clearRect(square.axeX, square.axeY, square.size, square.size);
	square.fn();
	ctx.fillRect(square.axeX, square.axeY, square.size, square.size);
	requestAnimationFrame(game);
//	deal_key("lol");

}

function get_key() {
	document.addEventListener('keydown', (event) => {
		deal_key(event.key);
		event.preventDefault()
	})
}

get_key();
ctx.fillRect(0, square.axeY + 50, canvas.width, 10);
ctx.fillStyle = 'red';
game()
