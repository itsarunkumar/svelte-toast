import { writable, get } from 'svelte/store';

type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id?: string;
	title: string;
	content: string;
	duration?: number;
	type?: ToastType;
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
const toastConfig = writable(defaultToastConfig);

function addToast(toast: Toast) {
	const config = get(toastConfig);
	const t = {
		id: toast.id || crypto.randomUUID(),
		title: toast.title,
		content: toast.content,
		duration: toast.duration || config.duration,
		type: toast.type || config.type,
		progressColor: toast.progressColor
	};
	toasts.update((toasts) => [...toasts, t]);

	// Automatically remove the toast after the specified duration, if provided
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

function updateToastConfig(newConfig: {
	duration: number; // Default duration is 2 seconds
	type: string;
}) {
	toastConfig.update((config) => ({ ...config, ...newConfig }));
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
		})
};

export { toasts, addToast, removeToast, clearToasts, TOAST_TYPES, updateToastConfig, toaster };
