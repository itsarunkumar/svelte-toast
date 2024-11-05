<!-- ToastContainer.svelte -->
<script lang="ts">
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	import { usePortal } from '$lib/utils/portal.js';
	import { toasts, clearLastToast } from './toast.svelte.js';
	import { cn } from '$lib/utils/cn.js';

	import Toast from './toast-component.svelte';

	// Props

	// Position prop
	interface Props {
		withProgress?: boolean;
		stacked?: boolean;
		maxToasts?: number;
		closable?: boolean;
		customToast?: boolean;
		position?:
			| 'top-left'
			| 'top-center'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-center'
			| 'bottom-right';
		children?: import('svelte').Snippet<[any]>;
	}

	let {
		withProgress = false,
		stacked = true,
		maxToasts = 3,
		closable = false,
		customToast = false,
		position = 'bottom-right',
		children
	}: Props = $props();

	// Transitions according to position
	let enterTransition: Record<string, any> = $state({ x: 20, duration: 500 });
	let exitTransition: Record<string, any> = $state({ x: -20, duration: 500 });

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

	$effect(() => {
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
	});

	$effect(() => {
		if ($toasts.length > maxToasts) {
			clearLastToast(maxToasts);
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<!--  -->
<div
	use:usePortal
	class={cn(
		`fixed max-w-max max-h-max flex items-end gap-2 z-[9999] mx-2 my-3 ${positionClass(position)} `
	)}
>
	{#each $toasts as toast, index (toast.id)}
		<div
			animate:flip
			in:scale={{ duration: 200, easing: linear, delay: 0, opacity: 0.5, start: 0.8 }}
			out:scale={exitTransition}
			class={`${stacked ? `absolute py-3 ${positionClass(position)}` : ''}`}
			style={calculatePositionStyle(index)}
		>
			{#if customToast}
				{@render children?.({ data: toast })}
			{:else}
				<Toast {withProgress} {toast} {closable} {enterTransition} {exitTransition} />
			{/if}
		</div>
	{/each}
</div>
