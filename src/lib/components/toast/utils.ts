import type { Toast } from './types.js';

let toastIdCounter = 1;
export function generateUniqueId(): string {
	return `${Date.now()}_${toastIdCounter++}_${Math.random()}`;
}

export function updateProgress(toast: Toast, startTime: number) {
	const currentTime = Date.now();
	const elapsed = currentTime - startTime;

	const percentage = +((elapsed / toast.duration!) * 100 + 8).toFixed(2);

	const limitedPercentage = Math.min(percentage, 100); // Limit to 100%
	const roundedPercentage = Math.round(limitedPercentage * 100) / 100; // Round to 2 decimal places

	// Convert to string and then back to number to avoid precision issues in some cases
	toast.progress!.set(Number(roundedPercentage.toFixed(2)));

	if (percentage < 100) {
		// Continue updating progress if not complete
		requestAnimationFrame(() => updateProgress(toast, startTime));
	}
}
