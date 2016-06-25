import $ from 'jquery';

export default class SwipePattern {
	constructor(el, amount = 5) {
		this.el = el;
		this.amountOfDots = amount;

		this.filledAreas = [];

		this.placement = this.placement.bind(this);
		this.checkOverlap = this.checkOverlap.bind(this);

		this.placement();
	}

	placement() {
		const minX = 0;
		const maxX = this.el.innerWidth() - 50;
		const minY = 0;
		const maxY = this.el.innerHeight() - 50;

		for (let i = 0; i < this.amountOfDots; i++) {
			const newElem = $('<div>').addClass('pattern__dot');

			let randX = 0;
			let randY = 0;
			let area = {};

			randX = Math.round(minX + ((maxX - minX) * (Math.random() % 1)));
			randY = Math.round(minY + ((maxY - minY) * (Math.random() % 1)));
			area = {
				x: randX,
				y: randY,
				width: '100',
				height: '100',
			};

			this.checkOverlap(area);
			this.filledAreas.push(area);

			newElem.css({
				left: randX,
				top: randY,
			});

			newElem.appendTo(this.el);
		}
	}

	checkOverlap(area) {
		for (let i = 0; i < this.filledAreas.length; i++) {
			const currentArea = this.filledAreas[i];

			const bottom1 = area.y + area.height;
			const bottom2 = currentArea.y + currentArea.height;

			const top1 = area.y;
			const top2 = currentArea.y;

			const left1 = area.x;
			const left2 = currentArea.x;

			const right1 = area.x + area.width;
			const right2 = currentArea.x + currentArea.width;

			if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
				continue;
			}

			return true;
		}

		return false;
	}
}

const patternElem = $('#pattern');
if (patternElem.length > 0) {
	new SwipePattern(patternElem);
}
