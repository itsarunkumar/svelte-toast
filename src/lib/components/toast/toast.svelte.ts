// toast.ts
import { writable } from 'svelte/store';
import { tick } from 'svelte';

import type { PromiseToast, Toast, ToastStore, ToastType } from './types.js';

import { generateUniqueId, updateProgress } from './utils.svelte.js';

const defaultToastConfig = {
	duration: 2000,
	type: 'info' as ToastType
};

const TOAST_TYPES = {
	SUCCESS: 'success' as const,
	ERROR: 'error' as const,
	INFO: 'info' as const,
	PROMISE: 'promise' as const
};

const toasts: ToastStore = writable<Toast[]>([]);

async function addPromiseToast(promiseToast: PromiseToast) {
	const t: Toast = {
		id: generateUniqueId(),
		title: promiseToast.title,
		content: promiseToast.content as Promise<string>,
		type: 'promise',
		progressColor: promiseToast.progressColor
	};

	await tick();

	toasts.update((toasts) => [...toasts, t]);

	if (t.content instanceof Promise) {
		t.content.then((result) => {
			updateToastContent(t.id as string, result);
			setTimeout(() => {
				removeToast(t.id as string);
			}, 2000); // Adjust the duration as needed
		});
	}
}

function updateToastContent(id: string, content: string) {
	toasts.update((toasts) => toasts.map((t) => (t.id === id ? { ...t, content } : t)));
}

async function addToast(toast: Omit<Toast, 'id'>) {
	const progress = writable(0);
	const t: Toast = {
		id: generateUniqueId(),
		title: toast.title,
		content: toast.content,
		duration: toast.duration || defaultToastConfig.duration,
		type: toast.type || defaultToastConfig.type,
		progressColor: toast.progressColor,
		progress
	};

	await tick();

	toasts.update((existingToasts) => [...existingToasts, t]);

	await tick();

	const start = Date.now();
	updateProgress(t, start);

	setTimeout(() => {
		removeToast(t.id as string);
	}, t.duration);
}

function removeToast(id: string) {
	toasts.update((existingToasts) => existingToasts.filter((t) => t.id !== id));
}

function clearToasts() {
	toasts.set([]);
}

function clearLastToast(num: number) {
	toasts.update((existingToasts) => existingToasts.slice(-num));
}

function updateToastConfig(newConfig: { duration: number; type: ToastType }) {
	defaultToastConfig.duration = newConfig.duration;
	defaultToastConfig.type = newConfig.type;
}

const toaster = {
	success: (toast: Omit<Toast, 'id'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.SUCCESS,
			progressColor: toast.progressColor || 'bg-green-500'
		}),
	error: (toast: Omit<Toast, 'id'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.ERROR,
			progressColor: toast.progressColor || 'bg-red-500'
		}),
	info: (toast: Omit<Toast, 'id'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.INFO,
			progressColor: toast.progressColor || 'bg-violet-600'
		}),
	promise: (toast: Omit<PromiseToast, 'id'>) =>
		addPromiseToast({
			...toast,
			type: TOAST_TYPES.PROMISE,
			progressColor: toast.progressColor || 'bg-yellow-500'
		}),
	show: addToast
};

export {
	toasts,
	addToast,
	removeToast,
	clearToasts,
	clearLastToast,
	TOAST_TYPES,
	updateToastConfig,
	toaster
};
