const numberButtons = document.querySelectorAll('.num,.num-button,.op-button');
const mathScreen = document.querySelector('.digit-display');
const answerScreen = document.querySelector('.answer');
var currentEquation = "";
const opTerms = ["(",")","sqrt","/","x","-","+"];
var previousAnswer = "";

// event registration for number buttons
for (let i = 0; i < numberButtons.length; i++) {
	numberButtons[i].addEventListener("click", () => {

	if (numberButtons[i].querySelector('.num')) {
		var num = numberButtons[i].innerText;
		updateEquation(num);
	}

	if (numberButtons[i].querySelector('.op')) {
		var op = numberButtons[i].innerText;
		switch(op) {
			case "ans":
				updateEquation(previousAnswer);
				break;
			case "x":
			case "-":
			case "+":
			case "/":
			case "(":
			case ")":
				updateEquation(op);
				break;
			case "sqrt":
				updateEquation("sqrt(");
				break;
		}	
	}
	});
}

// event registration for clear buttons
const clearButtons = document.querySelectorAll('.clear-button');
for (let i = 0; i < clearButtons.length; i++) {
	clearButtons[i].addEventListener("click", () => {
		currentEquation = "";
		updateEquation("");
		if (clearButtons[i].querySelector(".AC")) {
			previousAnswer = "";
			answerScreen.innerText = "";
		}
	});
}

// event registration for ENTER buttons
const enterButton = document.querySelectorAll('.enter-button,.enter');
for (let i = 0; i < enterButton.length; i++) {
	enterButton[i].addEventListener("click" , () => {
		if (enterButton[i].querySelector('.enter')) {
			var result = evaluateExpression(currentEquation);
			if (result) {
				answerScreen.innerText = result;
				previousAnswer = result;
				currentEquation = "";
				updateEquation("");	
			}
			else {
				answerScreen.innerText = "invalid expression";
			}
		}
	});
}

// event registration for back button
const backButton = document.querySelectorAll('.back-button,.back');
for (let i = 0; i < backButton.length; i++) {
	backButton[i].addEventListener("click", () => {
		if (backButton[i].querySelector('.back')) {
			currentEquation = currentEquation.slice(0, -1);
			mathScreen.innerText = currentEquation;
		}
	});
}

// event registration for random number button
const randomNumButton = document.querySelectorAll('.random-number,.random');
for (let i = 0; i < randomNumButton.length; i++) {
	randomNumButton[i].addEventListener("click", () => {
		if (randomNumButton[i].querySelector('.random')) {
			var randNum = (Math.round( Math.random() * 100 + Number.EPSILON ) / 100).toString();
			updateEquation(randNum);
		}
	});
}


function subStrReplace(initialStr, index, removeLength, insertStr) {
	var newString = initialStr.slice(0, index) + insertStr + initialStr.slice(index + removeLength, initialStr.length);
	return newString;
}


function evaluateExpression(exp) {
	var result = "";
	var sqrtStart = exp.search("sqrt");

	if (sqrtStart >= 0)
	{
		var sqrtEnd = sqrtStart + 6;
		var stack = [];
		stack.push("(");
		while(stack.length > 0 && sqrtEnd < exp.length) {
			if (exp[sqrtEnd] == "(")
			{
				stack.push("(");
			}
			else if (exp[sqrtEnd] == ")")
			{
				stack.pop();
			}
			sqrtEnd++;
		}

		var sqrtExp = "";
		if (stack.length > 0)
		{
			// invalid expression
			return null;
		}
		else {
			sqrtExp = exp.slice(sqrtStart + 5, sqrtEnd - 1);
			var sqrtExpResult = Math.sqrt(parseFloat(evaluateExpression(sqrtExp))).toFixed(2);
			exp = subStrReplace(exp, sqrtStart, sqrtEnd - sqrtStart, sqrtExpResult);
		}
	}
	// find additional sqrt() functions and recurse
	sqrtStart = exp.search("sqrt");
	if (sqrtStart >= 0) {
		exp = evaluateExpression(exp);
	}

	var postFixExp = toPostFix(exp);
	console.log("postFixExp: ", postFixExp);
	if (postFixExp != null) {
		result = evaluatePostFixExp(postFixExp);
	}
	else {
		return null;
	}
	return result;
}


function toPostFix(exp) {
	var stack = [];
	var p = [];

	numAccum = "";
	for (let i = 0; i < exp.length; i++) {
		var token = exp[i];
		if (!isNaN(token) || token == ".") {
			numAccum += token;
			console.log("i: ", i, " numaccum: ",numAccum);
			if (i < exp.length - 1) {
				var nextToken = exp[i + 1];
				if (isNaN(nextToken) && nextToken != ".") {
					p.push(parseFloat(numAccum));
					numAccum = "";
				}
			}
			else {
				p.push(parseFloat(numAccum));
			}
		}
		else if (token == "(") {
			stack.push(token);
		}
		else if (token == ")") {
			if (stack.length == 0) {
				return null;
			}
			while((!(stack.length == 0)) && (stack[stack.length - 1] != "(")) {
				p.push(stack.pop());
			}
			// discard "("
			stack.pop();
		}
		else if (opTerms.includes(token)) {
			if ((stack.length == 0) || (stack[stack.length - 1] == "(")) {
				stack.push(token);
			}
			else {
				while ((!(stack.length == 0)) && (stack[stack.length - 1] != "(")) {
					p.push(stack.pop());
				}
				stack.push(token);
			}
		}
	}

	while (!(stack.length == 0)) {
		p.push(stack.pop());
	}

	if (!(stack.length == 0)) {
		return null;
	}
	else {
		return p;
	}
}


function evaluatePostFixExp(exp) {
	var stack = [];
	for (let i = 0; i < exp.length; i++) {
		token = exp[i];
		if (!isNaN(token)) {
			stack.push(token);
		}
		else {
			var valA = parseFloat(stack.pop());
			var valB = parseFloat(stack.pop());
			console.log(typeof(valA));
			var result = 0;
			switch(token) {
				case "+":
					result = valA + valB;
					break;
				case "-":
					result = valB - valA;
					break;
				case "x":
					result = valA * valB;
					break;
				case "/":
					result = valB / valA;
					break;
			}
			result = result.toFixed(2);
			console.log("result: ", result);
			stack.push(result.toString());
		}
	}
	if (stack.length == 1) {
		return stack.pop();
	}
	else {
		return null;
	}
}


function updateEquation(character) {
	currentEquation += character;
	mathScreen.innerText = currentEquation;
}
