// toast.ts
import { writable, type Writable } from 'svelte/store';
import { tick } from 'svelte';

export type ToastType = 'success' | 'error' | 'info' | 'promise';

export type Toast = {
	id: string;
	title: string;
	content: string | Promise<string>;
	duration?: number;
	type?: ToastType;
	progressColor?: string;
};

export type PromiseToast = {
	id?: string;
	title: string;
	content: Promise<string>; // Change content type to Promise<string>
	type?: 'promise'; // Explicitly set type to 'promise'
	progressColor?: string;
};

type ToastStore = Writable<Toast[]>;

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
let toastIdCounter = 1;

function generateUniqueId(): string {
	return `${Date.now()}_${toastIdCounter++}_${Math.random()}`;
}

async function addPromiseToast(promiseToast: PromiseToast) {
	const t: Toast = {
		id: generateUniqueId(),
		title: promiseToast.title,
		content: promiseToast.content,
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
	const t: Toast = {
		id: generateUniqueId(),
		title: toast.title,
		content: toast.content,
		duration: toast.duration || defaultToastConfig.duration,
		type: toast.type || defaultToastConfig.type,
		progressColor: toast.progressColor
	};

	await tick();

	toasts.update((existingToasts) => [...existingToasts, t]);

	await tick();

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
	success: (toast: Omit<Toast, 'type'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.SUCCESS,
			progressColor: toast.progressColor || 'bg-green-500'
		}),
	error: (toast: Omit<Toast, 'type'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.ERROR,
			progressColor: toast.progressColor || 'bg-red-500'
		}),
	info: (toast: Omit<Toast, 'type'>) =>
		addToast({
			...toast,
			type: TOAST_TYPES.INFO,
			progressColor: toast.progressColor || 'bg-violet-600'
		}),
	promise: (toast: Omit<PromiseToast, 'type'>) =>
		addPromiseToast({
			...toast,
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
