import { toaster } from '$lib/index.js';

export function randomToast(duration: number) {
	// show the three type of toast in random

	const type = ['success', 'error', 'info'];
	const color = ['bg-green-500', 'bg-red-500', 'bg-blue-500'];

	const i = Math.floor(Math.random() * type.length);
	const randomType = type[i];
	const randomColor = color[i];

	toaster.show({
		type: randomType as 'success' | 'error' | 'info',
		title: `Toast ${randomType}`,
		content: `this is a toast with ${randomType} type`,
		duration: duration,
		progressColor: randomColor
	});
}
