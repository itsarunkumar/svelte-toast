let toastIdCounter = 1;
export function generateUniqueId(): string {
	return `${Date.now()}_${toastIdCounter++}_${Math.random()}`;
}
