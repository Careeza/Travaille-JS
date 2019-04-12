	let mem = Array.from({ length: 4096 }).map(() => Math.floor(Math.random() * 256)) // <= Initialisation memoire de test

	// Widht = largeur = x
	// Height = hauteur = y
	// strokeRect (x, y, largeur, hauteur); => contour rectangle
	// fillRect (x, y, largeur, hauteur); => rectangle entier
	// clearRect (x, y, largeur, hauteur); => supprime zone rectangle
	// ctx.font = '48px serif'; => police d'ecriture
	// ctx.fillText('Hello world', 10, 50); => ecrire texte

	var canvas = document.getElementById('canvas'); // <= Initialisation canvas memoire
	var ctx = canvas.getContext('2d');

	var process = document.getElementById('process'); // <= Initialisation canvas process
	var process_ctx = canvas.getContext('2d');

	zoom = prompt("zoom", '20') // <= taille canvas

	let axeX = 0;
	let axeY = 0;
	canvas.width = 64 * zoom; // <= taille du canvas en largeur
	canvas.height = 64 * zoom; // <= taille du canvas en hauteur

	for (let i= 0; i < 4096; i++) {
		axeX = (i % 64) * zoom; // <= calcul coord axe X
		axeY = (Math.floor(i / 64) * zoom); // <= calcul coord axe Y
		console.log(axeX, axeY);
		let hexadecimal = decimalToHex(mem[i]); // <= Conersion en hexadecimal
		if (mem[i] >= 128) {
			ctx.strokeRect(axeX, axeY, zoom, zoom);
			ctx.fillStyle = 'grey'; // <= Changement couleur du carre (gris a define)
			ctx.fillRect(axeX, axeY, zoom, zoom);
		}
		else {
			ctx.strokeRect(axeX, axeY, zoom, zoom);
			ctx.fillStyle = 'orange';
			ctx.fillRect(axeX, axeY, zoom, zoom);
		}
		ctx.fillStyle = 'black'; 
		ctx.font = '12px'; // => Police de base
		ctx.fillText(hexadecimal, axeX + 2, axeY + 15); // <= A define de facon modulaire (+2) || (+15)
	}


function decimalToHex(number) {
	var hex = Number(number).toString(16); // <= convertis en Hexa
	if (hex.length < 2) {
		hex = "0" + hex; // <= ajoute des 0 si necessaire
	}
	return hex;
}
