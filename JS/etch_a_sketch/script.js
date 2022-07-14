var dimensionSlider = document.querySelector('#myRange');
dimensionSlider.addEventListener('change', function() {

	var newDimension = dimensionSlider.value;
	if ((newDimension % 2) == 0) {
		newDimension -= 1;
	}

	var ratio = newDimension/dimension;
	dimension = newDimension;
	var newColors = new Array(newDimension * newDimension);
	const boxes = document.querySelectorAll('.box');
	const boxesMax = boxes.length - 1;
	for (let i = 0; i < newColors.length; i++) {
		sampledColorIdx = Math.round(i/ratio);
		if (sampledColorIdx > boxesMax) {
			sampledColorIdx = boxesMax;
		}
		newColors[i] = boxes[sampledColorIdx].style.backgroundColor;
	}

	var parentContainer = document.querySelector('#container');
	for (let i = parentContainer.childNodes.length - 1; i >= 0; i--) {
		parentContainer.removeChild(parentContainer.childNodes[i]);
	}
	createGrid(newDimension, newColors);
});


var initSlider = dimensionSlider.value;
if ((initSlider % 2) == 0) {
	initSlider -= 1;
}
var dimension = initSlider;
var colorMode = false;
const container = document.querySelector('#container');
var containerHeight = container.getBoundingClientRect().height;
var count = 0;
var temp = [];
createGrid(dimension, temp);

function createGrid(dimension, colorsArray) {
	var gridSize = dimension*dimension;
	for (let i = 0; i < gridSize; i++)
	{
		var divSize = containerHeight/dimension;
		const div = document.createElement('div');
		div.style.height = divSize + 'px';
		div.style.width = divSize + 'px';
		div.classList.add('box');
		container.appendChild(div);
		if (colorsArray.length > 1) {
			div.style.backgroundColor = colorsArray[i];
		} 
		else {
			div.style.backgroundColor = "white";
		}
	}

	const boxes = document.querySelectorAll('.box');
	for (let i = 0; i < boxes.length; i++)
	{
		boxes[i].addEventListener("mouseover", colorBlock);
	}
}


function colorBlock(event) {
	var color = 0;
	if (colorMode)
	{
		color = randomColor();
	}
	else {
		color = "black";
	}
	event.target.style.backgroundColor = color;
}


let vWidth = window.innerHeight;
let sideBarWidth = (window.innerWidth - containerHeight)/2;

const leftSideBar = document.querySelector('#left-side-bar');
leftSideBar.style.width = sideBarWidth + 'px';
leftSideBar.style.height = containerHeight + 'px';

const rightSideBar = document.querySelector('#right-side-bar');
rightSideBar.style.width = sideBarWidth + 'px';
rightSideBar.style.height = containerHeight + 'px';

// reset button
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function() {

	var gridContainer = document.querySelector('#container');
	var squares = gridContainer.childNodes;
	for (let i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = 'white';
	}
});

// color toggle button
const colorButton = document.querySelector('#color-toggle');
colorButton.addEventListener('click', function() {
	colorButton.classList.toggle('button-toggle');
	if (colorButton.classList.contains('button-toggle')) {
		colorMode = true;
	}
	else {
		colorMode = false;
	}	
});


function colorGrid(colorScheme) {
	var gridContainer = document.querySelector('#container');
	var squares = gridContainer.childNodes;
	for (let i = 0; i < squares.length; i++){
		switch(colorScheme) {
			case "white":
				squares[i].style.backgroundColor = 'white';
				break;
			case "random":
				squares[i].style.backgroundColor = randomColor();
				break;
			default:
				squares[i].style.backgroundColor = 'white';
		}
	}
}

function randomColor() {
	var randomNum = Math.floor(Math.random() * 16777215)
	color = '#' + ('00000' + randomNum.toString(16)).slice(-6);
	return color;
}

// random button
const randomButton = document.querySelector('#random');
randomButton.addEventListener('click', function() {
	colorGrid("random");
});


function xyToWrappedLinear(x, y) {
	var dimensionSlider = document.querySelector('#myRange');
	const dimension = parseInt(dimensionSlider.value);
	return x + dimension * y;
}


const sleep = (time) => {
	return new Promise(resolve => setTimeout(resolve,time));
}


const animate = async () => {
	var dimensionSlider = document.querySelector('#myRange');
	const dimension = parseInt(dimensionSlider.value);
	if ((dimension % 2) != 0) {
		var centerPoint = ((dimension - 1)/2);
		var numLayers = ((dimension + 1)/2);
		var max = centerPoint;
		var min = centerPoint;
		const boxes = document.querySelectorAll('.box');
		for (let layer = 0; layer < numLayers; layer++) {
			var numPointsChanging = (((max - min)*2) + ((max - min - (2*(!!(max-min))))*2));
			var pointsArray = new Array(numPointsChanging);
			if (layer == 0) {
				pointsArray[0] = xyToWrappedLinear(centerPoint,centerPoint);
			}
			else {
				min -= 1;
				max += 1;
				var idx = 0;
				for (let i = 0; i + min <= max; i++) {
					pointsArray[idx++] = xyToWrappedLinear(min + i, min);
					pointsArray[idx++] = xyToWrappedLinear(min, min + i);
				}
				for (let i = 0; max - i > min; i++) {
					pointsArray[idx++] = xyToWrappedLinear(max - i, max);
					pointsArray[idx++] = xyToWrappedLinear(max, max - i);
				}
			}
			for (let i = 0; i < pointsArray.length; i ++) {
				var screenIndex = pointsArray[i];
				if (screenIndex > boxes.length - 1) {
					screenIndex = boxes.length - 1;
				}
				boxes[screenIndex].style.backgroundColor = randomColor();
			}
			await sleep(200);
		}
	}
}

// animate button
const animateButton = document.querySelector('#animate');
animateButton.addEventListener('click', animate);

// https://www.w3schools.com/colors/colors_groups.asp
// const greenGroup = ["#ADFF2F","#7FFF00","#7CFC00","#00FF00","#32CD32","#98FB98","#90EE90","#00FA9A",
// 					"#00FF7F","#3CB371","#2E8B57","#2E8B57","#008000","#006400","#9ACD32","#6B8E23",
// 					"#556B2F","#66CDAA","#8FBC8F","#20B2AA","#008B8B","#008080"];
