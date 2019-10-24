$(() => {
	const randomMovieId = Math.floor(Math.random() * 2155529 + 1);
	// Variables
	const player1 = {
		name: '',
		score: 0,
	};

	const player2 = {
		name: '',
		score: 0,
	};

	const $modal = $('#modal');
	const $startGame = $('#start-game');

	const gameInit = () => {
		$modal.css('display', 'none');
		event.preventDefault();
	};

	// Movie trivia API
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
	$startGame.on('click', gameInit);
});
