import $ from 'jquery';

export default class RespondQuickly {
	constructor(el) {
		this.el = el;

		this.level = 1;
		this.timesClicked = 0;

		this.sequence = [];
		this.sequenceLength = 3; // Actually 4 cause nextRound += 1

		this.nextRound = this.nextRound.bind(this);
		this.animate = this.animate.bind(this);
		this.lightUp = this.lightUp.bind(this);
		this.bindClickEvents = this.bindClickEvents.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.finishedRound = this.finishedRound.bind(this);

		const splittedURL = window.location.href.split('?');
		if (typeof splittedURL[1] === 'undefined') {
			this.nextRound();
		}
	}

	// Increace level + sequenceLength, build new random sequence
	nextRound() {
		this.level += 1;
		this.sequenceLength += 1;

		for (let i = 0; i < this.sequenceLength; i++) {
			this.sequence.push(this.randomNumber());
		}

		this.animate(this.sequence);
	}

	// Shows which buttons to press
	animate() {
		let i = 0;
		const interval = setInterval(() => {
			this.lightUp(this.sequence[i]);

			i++;
			if (i >= this.sequence.length) {
				clearInterval(interval);
				this.bindClickEvents();
			}
		}, 400);
	}

	// Actually lightUp the buttons
	lightUp(tile) {
		const curTile = $(`[data-tile='${tile}']`).addClass('response__item--lit');

		setTimeout(() => {
			curTile.removeClass('response__item--lit');
		}, 200);
	}

	bindClickEvents() {
		this.el.on('click', '[data-tile]', (ev) => {
			this.registerClick(ev);
		});
	}

	// Check if clicked items is on same place in sequence
	registerClick(ev) {
		const curElem = ev.currentTarget;

		if (parseInt(curElem.dataset.tile, 10) === this.sequence[this.timesClicked]) {
			this.timesClicked += 1;
			$(`#${curElem.id}`).addClass('response__item--lit');
		} else {
			window.location = `${window.location.href}?failed=1`;
		}

		setTimeout(() => {
			$(`#${curElem.id}`).removeClass('response__item--lit');
		}, 100);

		if (this.timesClicked === this.sequenceLength) {
			this.finishedRound();
		}
	}

	// Reset elems and check if success or failed
	finishedRound() {
		this.timesClicked = 0;
		this.sequence = [];

		$('.response__item--lit').each(() => {
			$(this).removeClass('response__item--lit');
		});

		if (this.level !== 4) {
			const nextElem = $('.response__next');
			nextElem.fadeIn(500, () => {
				nextElem.fadeOut(500);
			});
		}

		this.el.off('click', '[data-tile]');

		setTimeout(() => {
			if (this.level === 4) {
				window.location = `${window.location.href}?success=1`;
			} else {
				this.nextRound();
			}
		}, 1200);
	}

	// Generate random number between 1 and 4
	randomNumber() {
		return Math.floor((Math.random() * 4) + 1);
	}
}

const responseElem = $('#response');
if (responseElem.length > 0) {
	new RespondQuickly(responseElem);
}
