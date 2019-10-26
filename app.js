$(() => {
	// const randomMovieId = Math.floor(Math.random() * 2155529 + 1);
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
			this.timer = 20;
			this.timerOn = false;
		}
	}

	// Get player stats / start game
	$('#init-game').on('submit', event => {
		event.preventDefault();
		// get players name
		const $firstPlayer = $('#nameP1').val();
		const $secodPlayer = $('#nameP2').val();

		// assign name to the players
		const player1 = new Player($firstPlayer, 0);
		const player2 = new Player($secodPlayer, 0);
		console.log(player1, player2);

		// change background color on submit
		$('body').css('background-color', getColor);
		$('#start-container').fadeOut(400, () => {
			$('#start-container').remove();
		});

		// get player's names and initial scores
		const playerStats = () => {
			// first player name
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
			// $('#playable-area').
		};
		playerStats();

		const getQuestion = () => {
			// Movie trivia API (data)
			$.ajax({
				url: `https://opentdb.com/api.php?amount=10&category=11&type=multiple`,
			}).then(
				data => {
					// API data
					console.log(data.results);
					// random question from my api call
					const randomQuestion =
						data.results[Math.floor(Math.random() * data.results.length)];
					console.log(randomQuestion);
					$('#question').append(
						$('<p>')
							.attr('id', 'current-question')
							.html(randomQuestion.question)
					);

					// store the correct answer in a variable
					const correctAnswer = randomQuestion.correct_answer;
					const incorrectAnswer = randomQuestion.incorrect_answers;

					// array with all the options to the question
					const choices = [];
					// get right answer and store it in the array
					choices.push(correctAnswer);
					// for loop for the incorrect answers
					for (let i = 0; i < incorrectAnswer.length; i++) {
						//const $answers = $('<div>').attr('id', 'answer-' + i);
						//$answers.html(randomQuestion.incorrect_answers[i]);
						//$('#choices').append($answers);
						choices.push(incorrectAnswer[i]);
					}
					console.log(choices);
				},
				() => {
					console.log('Bad request');
				}
			);
		};
		getQuestion();
	});
});
