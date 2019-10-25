$(() => {
	// const randomMovieId = Math.floor(Math.random() * 2155529 + 1);
	// random background color generator
	const getColor = () => {
		return `hsl(${360 * Math.random()}, ${25 + 70 * Math.random()}%, ${85 +
			10 * Math.random()}%)`;
	};
	// DOM Variables
	const $container = $('#contianer');
	const $startGame = $('#start-game');
	const $firstPlayer = $('#nameP1').val();
	const $secodPlayer = $('#nameP2').val();

	// Players class
	class Player {
		constructor(name, score) {
			this.name = name;
			this.score = score;
		}
	}

	const player1 = new Player($firstPlayer, 0);
	const player2 = new Player($secodPlayer, 0);

	// Get player stats / start game
	$startGame.on('submit', event => {
		event.preventDefault();
		$('body').css('background-color', getColor);
	});

	// Movie trivia API (data)
	$.ajax({
		url: `https://opentdb.com/api.php?amount=50&category=11&type=multiple`,
	}).then(
		data => {
			// API data
			//console.log(data.results);
		},
		() => {
			console.log('Bad request');
		}
	);

	// Begin the game
});
