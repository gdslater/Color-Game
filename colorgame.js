var colors = [];
var squares = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var numSquares = 6;
var mode = document.querySelectorAll(".mode");
var expertMode = false;

init();

function init() {
	for (var i = 0; i < mode.length; i++) {
		mode[i].addEventListener("click", function() {
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			mode[2].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			if (this.textContent === "Expert") {
				expertMode = true;
			} else {
				expertMode = false;
			}
			reset();
		});
	}

	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!  :)";
				messageDisplay.style.color = "#1dcf4c";
				changeColors(pickedColor);
				h1.style.backgroundColor = clickedColor;
				resetBtn.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
				messageDisplay.style.color = "#ff304f";

			}
		});
	}
	reset();
}

resetBtn.addEventListener("click", function() {
	reset();
});

function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	resetBtn.textContent = "New Colors";
	for(var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		squares[i].style.backgroundColor = colors[i];
	}
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	var arr = [];
	var randColor = "";
	for (var i = 0; i < num; i++) {
		if (expertMode && i > 0) {
			arr.push(similarColor(randColor));
		} else {
			randColor = randomColor();
			arr.push(randColor);
		}
	}
	return arr;
}

function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function similarColor(rgb) {
	var r = "";
	var g = "";
	var b = "";
	var isNum = true;
	var i = 4;
	while(isNum) {
		if (rgb.charAt(i) >= 0 && rgb.charAt(i <= 9)) {
			r += rgb.charAt(i);
			i++;
		} else {
			isNum = false;
		}
	}
	i += 2;
	isNum = true;
	while(isNum) {
		if (rgb.charAt(i) >= 0 && rgb.charAt(i) <= 9) {
			g += rgb.charAt(i);
			i++;
		} else {
			isNum = false;
		}
	}
	i += 2;
	isNum = true;
	while(isNum) {
		if (rgb.charAt(i) >= 0 && rgb.charAt(i) <= 9) {
			b += rgb.charAt(i);
			i++;
		} else {
			isNum = false;
		}
	}

	var newR = generateRandom(r);
	var newG = generateRandom(g);
	var newB = generateRandom(b);
	return "rgb(" + newR + ", " + newG + ", " + newB + ")";
}

function generateRandom(n) {
	n = Number(n) + Math.floor(Math.random() * 150 - 75);
	if (n > 255) {
		n = 255;
	}
	if (n < 0) {
		n = 0;
	}
	return n;
}