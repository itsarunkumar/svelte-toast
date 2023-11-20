<!-- Toast.svelte -->
<script lang="ts">
	import { removeToast, type ToastType, type Toast } from './toast.js';

	import { fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';

	// Icons
	import CheckIcon from './icons/success.svelte';
	import InfoIcon from './icons/info.svelte';
	import ErrorIcon from './icons/error.svelte';
	import Loader from './icons/loading.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { cn } from '$lib/utils/cn.js';

	export let toast: Toast;
	export let customClass: string = '';
	export let closable: boolean = true;
	export let enterTransition: any;
	export let exitTransition: any;
	export let withProgress: boolean = false;

	// progress bar things
	const progress = tweened(0);
	const duration = toast.duration!; // Default duration is 3000 ms
	let animationFrameId: number;
	let startTime: number;

	onMount(() => {
		progress.set(0);
		startTime = Date.now();

		function updateProgress() {
			const currentTime = Date.now();
			const elapsed = currentTime - startTime;
			const percentage = (elapsed / duration) * 100 + 8;

			progress.set(Math.min(percentage, 100)); // Clamp progress to a maximum of 100%
			animationFrameId = requestAnimationFrame(updateProgress);
		}

		updateProgress();
	});

	onDestroy(() => {
		cancelAnimationFrame(animationFrameId);
	});

	function getIconComponent() {
		switch (toast.type) {
			case 'success':
				return CheckIcon;
			case 'info':
				return InfoIcon;
			case 'error':
				return ErrorIcon;
			default:
				return CheckIcon;
		}
	}

	function getIconColor() {
		switch (toast.type) {
			case 'success':
				return 'text-green-500';
			case 'info':
				return 'text-blue-500';
			case 'error':
				return 'text-red-500';
			case 'promise':
				return 'text-yellow-500'; // Adjust the color for promise type as needed
			default:
				return 'text-gray-800';
		}
	}

	let promiseResolved = false;

	// Handle promise resolution
	if (toast.type === 'promise' && toast.content instanceof Promise) {
		toast.content.then((result) => {
			if (!promiseResolved) {
				toast.content = result;
				promiseResolved = true;
				setTimeout(() => {
					removeToast(toast.id);
				}, 2000); // Adjust the duration as needed
			}
		});
	}
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	role="button"
	on:click={() => removeToast(toast.id)}
	in:fly={{ ...enterTransition }}
	out:fly={{ ...exitTransition }}
	class={`relative flex w-80 rounded-md   bg-gray-100 text-slate-800 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] drop-shadow-md   ${customClass}`}
>
	{#if withProgress}
		<div
			class={cn('absolute top-0 left-0 h-[3px] bg-yellow-500 rounded-md', toast.progressColor)}
			style={`width: ${$progress}%`}
		/>
	{/if}
	<div class="relative w-full h-full py-4 flex items-center justify-center">
		<div class="flex items-center justify-center gap-4 w-full h-full">
			{#if toast.type === 'promise'}
				{#if promiseResolved}
					<svelte:component this={getIconComponent()} class={`${getIconColor()} w-5 h-5`} ` />
					<p class="text-base">{@html toast.content}</p>
				{:else if !promiseResolved}
					<Loader class={` w-5 h-5 animate-spin `} />
					<p class="animate-pulse text-base">Loading...</p>
				{/if}
			{:else}
				<svelte:component this={getIconComponent()} class={`${getIconColor()} w-5 h-5`} ` />
				<p class="text-base">{@html toast.content}</p>
			{/if}
		</div>

		{#if closable}
			<button
				class="absolute top-1 right-1 p-1 text-gray-800 hover:text-gray-700 focus:outline-none"
				aria-label="Close"
				on:click={() => removeToast(toast.id)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-4 h-4"
				>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			</button>
		{/if}
	</div>
</div>

<style>
</style>
