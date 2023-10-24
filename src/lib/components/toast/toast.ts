import { writable } from 'svelte/store';
import { tick } from 'svelte';

type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id?: string;
	title: string;
	content: string;
	duration?: number;
	type?: ToastType | undefined;
	progressColor?: string;
};

const defaultToastConfig = {
	duration: 2000, // Default duration is 2 seconds
	type: 'info' // Default toast type
};

const TOAST_TYPES = {
	SUCCESS: 'success',
	ERROR: 'error',
	INFO: 'info'
};

const toasts = writable<Toast[]>([]);
let toastIdCounter = 1;

function generateUniqueId(): string {
	return `${Date.now()}_${toastIdCounter++}_${Math.random()}`;
}

async function addToast(toast: Toast) {
	const t: Toast = {
		id: generateUniqueId(),
		title: toast.title,
		content: toast.content,
		duration: toast.duration || defaultToastConfig.duration,
		type: toast.type || defaultToastConfig.type,
		progressColor: toast.progressColor
	};

	await tick();

	toasts.update((toasts) => [...toasts, t]);

	await tick();

	if (t.duration) {
		setTimeout(() => {
			removeToast(t.id);
		}, t.duration);
	}
}

function removeToast(id: string) {
	toasts.update((toasts) => toasts.filter((t) => t.id !== id));
}

function clearToasts() {
	toasts.set([]);
}

function updateToastConfig(newConfig: { duration: number; type: string }) {
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
	show: addToast
};

export { toasts, addToast, removeToast, clearToasts, TOAST_TYPES, updateToastConfig, toaster };
