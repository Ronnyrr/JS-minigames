import $ from 'jquery';

export default class Memory {
	constructor(el) {
		this.matched = 0;
		this.attempts = 0;

		this.level = {
			level: 1,
			cards: 8,
			cardTypes: ['red', 'yellow', 'blue', 'green'],
		};

		// init()
		this.el = el;

		// addEvents() && matchCards()
		this.turnedCards = 0;
		this.activeCardIDs = [];
		this.activeCardTypes = [];

		this.init = this.init.bind(this);
		this.addEvents = this.addEvents.bind(this);
		this.matchCards = this.matchCards.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.shuffle = this.shuffle.bind(this);

		this.init();
	}

	// Create cards with for loop
	init() {
		let pickFromArray = 0;
		for (let i = 0; i < this.level.cards; i++) {
			if (i % 2 === 0) {
				pickFromArray++;
			}

			const itemColor = this.level.cardTypes[pickFromArray - 1];

			const newCard = $('<div>').addClass('memory__card').attr({
				id: i,
				'data-color': itemColor,
			});

			newCard.appendTo(this.el);

			const frontFlip = $('<div>').addClass('memory__card__front-side').html(this.getIcon());
			const backFlip = $('<div>').addClass('memory__card__back-side').html(this.getIcon(itemColor));

			frontFlip.appendTo(newCard);
			backFlip.appendTo(newCard);
		}

		this.shuffle($('.memory__card'));
		this.addEvents();
	}

	// Add click events to cards
	addEvents() {
		$('.memory__card').on('click', (elem) => {
			const parent = $(`#${elem.currentTarget.id}`);
			if (this.turnedCards < 2 && !parent.hasClass('memory__card--clicked')) {
				this.turnedCards++;
				parent.addClass('memory__card--clicked');

				// Push to active
				this.activeCardIDs.push(parent[0].id);
				this.activeCardTypes.push(parent[0].dataset.color);

				if (this.turnedCards === 2) {
					this.matchCards(this.activeCardIDs, this.activeCardTypes);
				}
			}
		});
	}

	// Matched clicked cards
	matchCards(matchingCardsIDs, matchingCardsTypes) {
		this.attempts++;

		setTimeout(() => {
			if (matchingCardsTypes[0] !== matchingCardsTypes[1]) {
				for (let i = 0; i < matchingCardsIDs.length; i++) {
					const flipElement = $(`#${matchingCardsIDs[i]}`);
					if (flipElement.hasClass('memory__card--clicked')) {
						flipElement.removeClass('memory__card--clicked');
					}
				}
			} else {
				this.matched += 1;
			}

			if (this.matched === 4) {
				window.location = `${window.location.href}?success=1`;
			} else if (this.attempts === 6) {
				window.location = `${window.location.href}?failed=1`;
			}

			// Reset values
			this.turnedCards = 0;
			this.activeCardIDs = [];
			this.activeCardTypes = [];
		}, 500);
	}

	// Reset cards after matching
	resetGame() {
		const cardElements = $('.memory__card');
		for (let i = 0; i < cardElements.length; i++) {
			cardElements[i].className = 'memory__card';
		}

		// Reset global values
		this.matched = 0;

		// Re-shuffle the cards and add new click events (shuffle deletes)
		this.shuffle(cardElements);
		this.addEvents();
	}

	// Get icons for cards
	getIcon(color) {
		switch (color) {
		case 'red':
			return '<svg class="icon icon--shield"><use xlink:href="/assets/img/icons.svg#shield" width="100%" height="100%" /></svg>';
		case 'blue':
			return '<svg class="icon icon--chip"><use xlink:href="/assets/img/icons.svg#chip" width="100%" height="100%" /></svg>';
		case 'green':
			return '<svg class="icon icon--radioactive"><use xlink:href="/assets/img/icons.svg#radioactive" width="100%" height="100%" /></svg>';
		case 'yellow':
			return '<svg class="icon icon--skull"><use xlink:href="/assets/img/icons.svg#skull" width="100%" height="100%" /></svg>';
		default:
			return '<svg class="icon icon--thunder icon--thunder--opacity"><use xlink:href="/assets/img/icons.svg#thunder" width="100%" height="100%" /></svg>';
		}
	}

	// Shuffle cards in DOM
	shuffle(elems) {
		const allElems = (() => {
			const ret = [];
			let l = elems.length;

			while (l--) {
				ret[ret.length] = elems[l];
			}

			return ret;
		})();

		const shuffled = (() => {
			const ret = [];
			let l = allElems.length;

			while (l--) {
				const random = Math.floor(Math.random() * allElems.length);
				const randEl = allElems[random].cloneNode(true);
				allElems.splice(random, 1);
				ret[ret.length] = randEl;
			}

			return ret;
		})();

		let l = elems.length;
		while (l--) {
			elems[l].parentNode.insertBefore(shuffled[l], elems[l].nextSibling);
			elems[l].parentNode.removeChild(elems[l]);
		}
	}
}

const memoryElem = $('#memory');
if (memoryElem.length > 0) {
	new Memory(memoryElem);
}
