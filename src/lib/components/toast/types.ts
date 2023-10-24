type ToastType = 'success' | 'error' | 'info';

export type Toast = {
	id?: string;
	title: string;
	content: string;
	duration?: number;
	type?: ToastType;
	progressColor?: string;
};
