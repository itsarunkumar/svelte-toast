<script lang="ts">
	import { usePortal } from '$lib/utils/portal';

	import { toasts, clearToasts } from './toast';

	import Single from './single-toast.svelte';
	import { cn } from '$lib/utils/cn';

	export let customClass = '';
	// export let position = '';

	export let position:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right' = 'bottom-right';

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
				return ''; // Default to 'bottom-right' if an invalid position is provided
		}
	}

	let enterTransition = { x: 20, duration: 500 };
	let exitTransition = { x: -20, duration: 500 };

	$: {
		if (position === 'top-center') {
			enterTransition = { y: -20, duration: 500 };
			exitTransition = { y: 20, duration: 500 };
		}

		if (position === 'top-right') {
			enterTransition = { x: 20, duration: 500 };
			exitTransition = { x: -20, duration: 500 };
		}

		if (position === 'top-left') {
			enterTransition = { x: -20, duration: 500 };
			exitTransition = { x: 20, duration: 500 };
		}

		if (position === 'bottom-center') {
			enterTransition = { y: 20, duration: 500 };
			exitTransition = { y: -20, duration: 500 };
		}

		if (position === 'bottom-left') {
			enterTransition = { x: -20, duration: 500 };
			exitTransition = { x: 20, duration: 500 };
		}
		if (position === 'bottom-right') {
			enterTransition = { x: 20, duration: 500 };
			exitTransition = { x: -20, duration: 500 };
		}
	}
</script>

<div
	use:usePortal
	class={cn(
		`fixed max-w-max max-h-max flex items-end gap-5 z-[9999] mx-2 my-2  ${positionClass(position)}`
	)}
>
	{#each $toasts as toast (toast.id)}
		<Single {toast} {customClass} {enterTransition} {exitTransition} />
	{/each}

	{#if $toasts.length > 5}
		<button class="w-full flex items-center justify-center text-gray-400" on:click={clearToasts}
			>clear all toasts</button
		>
	{/if}
</div>
