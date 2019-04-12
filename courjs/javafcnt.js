let Password;
let UserName = prompt("Wath's your login", '');

UserName == undefined ? alert("cancelled") :
	UserName != "Admin" ? alert ("I don’t know you") :
	Password = prompt("Password", '');

UserName == "Admin" && (Password == undefined ? alert("cancelled") :
	Password != "TheMaster" ? alert ("Wrong password") :
	alert ("Welcome master"));

let i = 3;
let value = ''

if (Password != "TheMaster") {
	out: while (i)
	{
		alert (`Un(e) intru(e) !! Explosion dans ${i--}`);
		for (let ind = 0; ind < 3; ind++)
		{
			value = prompt(`vous avez ${3 - ind} tentatives de trouver le code`, value);
			if (value == undefined || value == "TheMaster")
				break out;
		}
	}
	if (value != "TheMaster") {
		alert ("BOUMMMMM !!!!!");
	} else
		alert ("don't scare mei master i was going to kill you");
}
