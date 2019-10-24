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

	// Players
	const player1 = {
		name: '',
		score: 0,
	};

	const player2 = {
		name: '',
		score: 0,
	};

	// Movie trivia API (data)
	$.ajax({
		url: `https://opentdb.com/api.php?amount=50&category=11&type=multiple`,
	}).then(
		data => {
			console.log(data);
		},
		() => {
			console.log('Bad request');
		}
	);

	// Begin the game
	$('body').css('background-color', getColor);
});
