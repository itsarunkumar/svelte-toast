<!-- ToastContainer.svelte -->
<script lang="ts">
	import { usePortal } from '$lib/utils/portal.js';
	import { toasts, clearLastToast } from './toast.js';
	import { cn } from '$lib/utils/cn.js';

	import { flip } from 'svelte/animate';

	import Toast from './toast-component.svelte';
	import { fly } from 'svelte/transition';

	// Props
	export let customClass = '';
	export let withProgress = false;
	export let stacked = true;
	export let maxToasts = 3;
	export let closable = true;

	export let customToast = false;

	// Position prop
	export let position:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right' = 'bottom-right';

	// Transitions according to position
	let enterTransition: Record<string, any> = { x: 20, duration: 500 };
	let exitTransition: Record<string, any> = { x: -20, duration: 500 };

	function positionClass(position: string) {
		switch (position) {
			case 'top-left':
				return 'top-0 left-0 flex-col-reverse';
			case 'top-center':
				return 'top-0 left-1/2 transform -translate-x-1/2 flex-col-reverse';
			case 'top-right':
				return 'top-0 right-0 flex-col-reverse';
			case 'bottom-left':
				return 'bottom-0 left-0 flex-col';
			case 'bottom-center':
				return 'bottom-0 left-1/2 transform -translate-x-1/2 flex-col';
			case 'bottom-right':
				return 'bottom-0 right-0 flex-col';
			default:
				return 'bottom-0 right-0 flex-col'; // Default to 'bottom-right' if an invalid position is provided
		}
	}

	function calculatePositionStyle(index: number) {
		return position === 'top-center' || position === 'top-left' || position === 'top-right'
			? `top: calc(${index * 15}px);`
			: position === 'bottom-center' || position === 'bottom-left' || position === 'bottom-right'
			? `bottom: calc(${index * 15}px);`
			: '';
	}

	$: {
		switch (position) {
			case 'top-center':
				enterTransition = { y: -20, duration: 500 };
				exitTransition = { y: 20, duration: 500 };
				break;
			case 'top-right':
				enterTransition = { x: 20, duration: 500 };
				exitTransition = { x: -20, duration: 500 };
				break;
			case 'top-left':
				enterTransition = { x: -20, duration: 500 };
				exitTransition = { x: 20, duration: 500 };
				break;
			case 'bottom-center':
				enterTransition = { y: 20, duration: 500 };
				exitTransition = { y: -20, duration: 500 };
				break;
			case 'bottom-left':
				enterTransition = { x: -20, duration: 500 };
				exitTransition = { x: 20, duration: 500 };
				break;
			case 'bottom-right':
				enterTransition = { x: 20, duration: 500 };
				exitTransition = { x: -20, duration: 500 };
				break;
		}
	}

	$: if ($toasts.length > maxToasts) {
		clearLastToast(maxToasts);
	}

	$: if ($toasts.length === 0) {
		stacked = true;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!--  -->
<div
	use:usePortal
	class={cn(
		`fixed max-w-max max-h-max flex items-end gap-2 z-[9999] mx-2 my-3 ${positionClass(
			position
		)} ${customClass}`
	)}
>
	{#each $toasts as toast, index (toast.id)}
		<div
			animate:flip
			in:fly={enterTransition}
			out:fly={exitTransition}
			class={`${stacked ? `absolute py-3 ${positionClass(position)}` : ''}`}
			style={calculatePositionStyle(index)}
		>
			{#if customToast}
				<slot data={toast} />
			{:else}
				<Toast {withProgress} {toast} {closable} {customClass} {enterTransition} {exitTransition} />
			{/if}
		</div>
	{/each}
</div>
