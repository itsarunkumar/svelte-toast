import { writable } from 'svelte/store';

type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id?: string;
	title: string;
	content: string;
	duration?: number;
	type?: ToastType;
};

const toasts = writable<Toast[]>([]);

function addToast({
	id = crypto.randomUUID(),
	title,
	content,
	duration = 2000,
	type = 'info'
}: Toast) {
	const t = {
		id,
		title: title,
		content: content,
		duration: duration,
		type: type
	};
	toasts.update((toasts) => [...toasts, t]);

	// Automatically remove the toast after the specified duration, if provided
	if (t.duration) {
		setTimeout(() => {
			removeToast(id); // Use the generated ID to remove the toast
		}, t.duration);
	}
}

function removeToast(id: string | undefined) {
	toasts.update((toasts) => toasts.filter((t) => t.id !== id));
}

function clearToasts() {
	toasts.set([]);
}

export { toasts, addToast, removeToast, clearToasts };
