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
		//console.log(player1, player2);

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
					// callback functions to handle data outside the API call
					createQuestion(dataQuestion);
					createOptions(correctAnswer, incorrectAnswers);
					checkAnswer(correctAnswer);
				},
				() => {
					console.log('Bad request');
				}
			);
		};
		getQuestion();

		const createQuestion = question => {
			$('#question').append(
				$('<p>')
					.attr('id', 'current-question')
					.html(question)
			);
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
						$('#question')
							.children()
							.remove();
						$('#choices')
							.children()
							.remove();
						getQuestion();
					} else {
						console.log('incorrect');
						alert('Wrong Answer');
					}
				});
		};
	});
});
