$(() => {
	// random background color generator
	const getColor = () => {
		return `hsl(${360 * Math.random()}, ${25 + 70 * Math.random()}%, ${85 +
			10 * Math.random()}%)`;
	};
	// Players class
	class Player {
		constructor(name, score) {
			this.name = name;
			this.score = score;
			this.correct = 0;
			this.incorrect = 0;
			this.unanswered = 0;
			this.currentSet = 0;
			this.timerOn = false;
		}
	}

	// assign name to the players
	const player1 = new Player(name, 0);
	const player2 = new Player(name, 0);
	//console.log(player1, player2);
	const players = { a: player1, b: player2 };

	// Get player stats / start game
	$('#init-game').on('submit', event => {
		// get players name
		let $firstPlayer = $('#nameP1').val();
		let $secodPlayer = $('#nameP2').val();
		event.preventDefault();
		player1.name = $firstPlayer;
		player2.name = $secodPlayer;
		$('body').css('background-color', getColor);
		$('#start-container').fadeOut(400, () => {
			$('#start-container').remove();
		});
		getQuestion();
		roundTimer();
	});

	const clearQuestion = () => {
		$('#question')
			.children()
			.remove();
		$('#choices')
			.children()
			.remove();
	};

	// rounds variable
	let rounds = 0;

	const changeTurn = () => {
		if (rounds === 10) {
			console.log('game ended');
		} else if (rounds % 2 === 0) {
			console.log(player1);
			player1.score++;
			console.log(rounds);
		} else {
			console.log(player2);
			player2.score++;
			console.log(rounds);
		}
	};

	// Movie trivia API (data)
	// get question
	const getQuestion = () => {
		$.ajax({
			url: `https://opentdb.com/api.php?amount=1&category=11&type=multiple`,
		}).then(
			data => {
				// API data
				// API variables
				const dataQuestion = data.results[0].question;
				// stored the correct answer in a variable
				const correctAnswer = data.results[0].correct_answer;
				// stored the incorrect answer in a variable
				const incorrectAnswers = data.results[0].incorrect_answers;
				// invoking function to take on switch turns between players
				changeTurn();
				// callback functions to handle data outside the API call
				createQuestion(dataQuestion);
				createOptions(correctAnswer, incorrectAnswers);
				checkAnswer(correctAnswer);
				console.log(data.results);
			},
			() => {
				console.log('Bad request');
			}
		);
	};

	// create question in the games
	const createQuestion = question => {
		$('#question').append(
			$('<p>')
				.attr('id', 'current-question')
				.html(question)
		);
		return rounds++;
	};

	// function to generate the options for the question
	const createOptions = (correct, incorrect) => {
		// options for the answers
		let options = [];
		// get right answer and store it in the array
		options.push(correct);
		// for loop for the incorrect answers
		for (let i = 0; i < incorrect.length; i++) {
			// add the incorrect answers into the choices array
			options.push(incorrect[i]);
		}
		// function to change the order of the options randomly
		const shuffleChoices = arr => {
			for (let i = arr.length - 1; i > 0; i--) {
				let j = Math.floor(Math.random() * (i + 1));
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}
			return arr;
		};

		options = shuffleChoices(options);

		for (let i = 0; i < options.length; i++) {
			$('#choices').append(
				$('<div>')
					.attr('id', 'option' + i)
					.addClass('choice-items')
					.html(options[i])
			);
		}
	};

	const checkAnswer = correct => {
		// checking if there answer is the correct on click
		$('#choices')
			.children('div')
			.on('click', event => {
				if (event.currentTarget.innerHTML === correct) {
					console.log('correct');
					clearQuestion();
					$('body').css('background-color', getColor);
					getQuestion();
					timeleft = 20;
				} else {
					console.log('incorrect');
					clearQuestion();
					alert('Wrong Answer');
					getQuestion();
					timeleft = 20;
				}
			});
	};

	// get player's names and initial scores
	const playerStats = () => {
		// first player name
		// $('#playable-area')
		$('#player-1')
			.children('#name')
			.text(player1.name);
		$('#player-1')
			.children('#score')
			.text(player1.score);
		// second player name
		$('#player-2')
			.children('#name')
			.text(player2.name);
		$('#player-2')
			.children('#score')
			.text(player2.score);
	};

	const gameInit = () => {
		// get values from the text input fields
		// const $p1 = $('#nameP1').val();
		// const $p2 = $('#nameP2').val();
		// event.preventDefault();
		//console.log($p1);
	};

	// Timer
	let timeleft = 20;
	const roundTimer = () =>
		setInterval(() => {
			$('#timer').text(timeleft) - timeleft;
			timeleft -= 1;
			if (timeleft <= 0) {
				clearInterval(roundTimer);
				$('#timer').text(`Time's up!`);
				clearQuestion();
				getQuestion();
				timeleft = 20;
			}
		}, 1000);

	// event => {
	//////////////
	// event.preventDefault();
	// playerStats();
	//////////////
	// change background color on submit
	// $('body').css('background-color', getColor);
	// $('#start-container').fadeOut(400, () => {
	// 	$('#start-container').remove();
	// });
	// getQuestion();
	// Timer
	// let timeleft = 20;
	// const roundTimer = setInterval(() => {
	// 	$('#timer').text(timeleft) - timeleft;
	// 	timeleft -= 1;
	// 	if (timeleft == 0) {
	// 		clearInterval(roundTimer);
	// 		$('#timer').text(`Time's up!`);
	// 	}
	// }, 1000);
	// roundTimer;
	//});
	$('body').css('background-color', getColor);
});
