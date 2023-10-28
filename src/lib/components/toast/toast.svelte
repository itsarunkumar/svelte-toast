<script lang="ts">
	import { usePortal } from '$lib/utils/portal';
	import { toasts, clearToasts, clearLastToast } from './toast';
	import { cn } from '$lib/utils/cn';

	import { flip } from 'svelte/animate';
	import SingleToast from './single-toast.svelte';
	import NormalToast from './normal-toast.svelte';
	import { onMount } from 'svelte';

	// props
	export let customClass = '';

	export let withProgress = false;

	export let stacked = false;

	export let maxToasts = 3;

	export let closable = true;

	// postion prop
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
				return 'bottom-0 right-0 flex-col'; // Default to 'bottom-right' if an invalid position is provided
		}
	}

	// transitions according to position

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

	$: if ($toasts.length > maxToasts) {
		clearLastToast(maxToasts);
	}
</script>

<div
	use:usePortal
	class={cn(
		`fixed max-w-max max-h-max flex items-end gap-2 z-[9999] mx-2 my-3  ${positionClass(
			position
		)}  `
	)}
>
	{#each $toasts as toast, i (toast.id)}
		<div
			animate:flip
			class={`${stacked ? `absolute   py-3 ${positionClass(position)} ` : ''}`}
			style={position === 'top-center' || position === 'top-left' || position === 'top-right'
				? `top: calc(${i}*10px);`
				: position === 'bottom-center' || position === 'bottom-left' || position === 'bottom-right'
				? `bottom: calc(${i}*10px);`
				: ''}
		>
			<svelte:component
				this={withProgress ? SingleToast : NormalToast}
				{toast}
				{customClass}
				{enterTransition}
				{exitTransition}
				{closable}
			/>
		</div>
	{/each}
</div>
