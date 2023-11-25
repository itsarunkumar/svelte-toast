import { onMount } from 'svelte';

let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

let last = {
	starTimestamp: start,
	starPosition: originPosition,
	mousePosition: originPosition
};

const config = {
	starAnimationDuration: 700,
	minimumTimeBetweenStars: 250,
	minimumDistanceBetweenStars: 75,
	glowDuration: 75,
	maximumGlowPointSpacing: 10,
	colors: ['purple', 'crimson'],
	sizes: ['1.4rem', '1rem', '0.6rem'],
	animations: ['fall-1', 'fall-2', 'fall-3']
};

let count = 0;

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const selectRandom = (items: string | any[]) => items[rand(0, items.length - 1)];

const withUnit = (value: any, unit: string) => `${value}${unit}`;
const px = (value: any) => withUnit(value, 'px');
const ms = (value: any) => withUnit(value, 'ms');

const calcDistance = (a: { x: any; y: any }, b: { x: any; y: any }) => {
	const diffX = b.x - a.x,
		diffY = b.y - a.y;

	return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const calcElapsedTime = (start: number, end: number) => end - start;

const appendElement = (element: HTMLSpanElement) => document.body.appendChild(element);
const removeElement = (element: HTMLSpanElement, delay: number | undefined) =>
	setTimeout(() => document.body.removeChild(element), delay);

const createStar = (position: { x: any; y: any }) => {
	const color = selectRandom(config.colors);
	const animationName = config.animations[count++ % 3];

	const star = document.createElement('span');
	star.className =
		'star  w-4 h-4 border border-slate-900 border-opacity-50 animatio-spin shadow-mg transition-all transition-opacity ';
	star.style.left = px(position.x);
	star.style.top = px(position.y);
	star.style.fontSize = selectRandom(config.sizes);
	star.style.color = `${color}`;
	star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
	star.style.animationName = animationName[0];

	// Use Svelte's animate directive to apply animations
	//   star animate:{{ [animationName]: '' }}={{ duration: config.starAnimationDuration }};

	appendElement(star);

	removeElement(star, config.starAnimationDuration);
};

const createGlowPoint = (position: { x: any; y: any }) => {
	const glow = document.createElement('div');
	glow.className = 'glow-point';
	glow.style.left = px(position.x);
	glow.style.top = px(position.y);

	appendElement(glow);
	removeElement(glow, config.glowDuration);
};

const determinePointQuantity = (distance: number) =>
	Math.max(Math.floor(distance / config.maximumGlowPointSpacing), 1);

const createGlow = (last: { x: any; y: any }, current: { x: any; y: any }) => {
	const distance = calcDistance(last, current);
	const quantity = determinePointQuantity(distance);

	const dx = (current.x - last.x) / quantity;
	const dy = (current.y - last.y) / quantity;

	Array.from(Array(quantity)).forEach((_, index) => {
		const x = last.x + dx * index;
		const y = last.y + dy * index;

		createGlowPoint({ x, y });
	});
};

const updateLastStar = (position: { x: any; y: any }) => {
	last.starTimestamp = new Date().getTime();
	last.starPosition = position;
};

export const updateLastMousePosition = (position: { x: any; y: any }) =>
	(last.mousePosition = position);

const adjustLastMousePosition = (position: { x: any; y: any }) => {
	if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
		last.mousePosition = position;
	}
};

export const handleOnMove = (e: { clientX: any; clientY: any }) => {
	const mousePosition = { x: e.clientX, y: e.clientY };

	adjustLastMousePosition(mousePosition);

	const now = new Date().getTime();
	const hasMovedFarEnough =
		calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars;
	const hasBeenLongEnough =
		calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

	if (hasMovedFarEnough || hasBeenLongEnough) {
		createStar(mousePosition);
		updateLastStar(mousePosition);
	}

	// createGlow(last.mousePosition, mousePosition);
	updateLastMousePosition(mousePosition);
};
