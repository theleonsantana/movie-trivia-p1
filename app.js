$(() => {
	// const randomMovieId = Math.floor(Math.random() * 2155529 + 1);
	// random background color generator
	const getColor = () => {
		return `hsl(${360 * Math.random()}, ${25 + 70 * Math.random()}%, ${85 +
			10 * Math.random()}%)`;
	};
	// DOM Variables
	const $container = $('#container');
	const $initGame = $('#init-game');
	const $player1 = $('#player-1');
	const $player2 = $('#player-2');

	// Players class
	class Player {
		constructor(name, score) {
			this.name = name;
			this.score = score;
			this.correct = 0;
			this.incorrec = 0;
			this.unanswered = 0;
			this.currentSet = 0;
			this.timer = 20;
			this.timerOn = false;
		}
	}

	// Get player stats / start game
	$initGame.on('submit', event => {
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
		$('#start-container').fadeOut(3000, () => {
			$(this).remove();
		});

		const initTrivia = () => {
			$('#player-1')
				.children('#name')
				.text(player1.name);

			// $('#playable-area').
		};
		initTrivia();
	});

	// Movie trivia API (data)
	$.ajax({
		url: `https://opentdb.com/api.php?amount=20&category=11&type=multiple`,
	}).then(
		data => {
			// API data
			console.log(data.results);
			// random question from my api call
			const randomQuestion =
				data.results[Math.floor(Math.random() * data.results.length)];
			console.log(randomQuestion);
		},
		() => {
			console.log('Bad request');
		}
	);
});
