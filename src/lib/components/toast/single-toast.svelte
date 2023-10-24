<!-- Toast.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { removeToast } from './toast';
	import { cn } from '$lib/utils/cn';

	import { tweened } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	export let toast: import('./toast').Toast;

	export let customClass: string = '';

	const progress = tweened(0);
	const duration = toast.duration || 3000; // Default duration is 3000 ms
	let animationFrameId: number;
	let startTime: number;

	// transition
	export let enterTransition;
	export let exitTransition;

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
</script>

<div
	in:fly={{ ...enterTransition }}
	out:fly={{ ...exitTransition }}
	class={cn(
		`relative flex w-72 py-1  overflow-hidden  border border-gray-500 border-opacity-30 rounded-md shadow-xl bg-slate-50 text-slate-900 ${customClass} `
	)}
>
	<div class="mx-3 relative w-full flex">
		<div class="w-1/6 h-1 bg-gray-500 absolute top-0 left-0 rounded-lg">
			<div class={`h-full  rounded-lg ${toast.progressColor}`} style="width: {$progress}%" />
		</div>

		<div class="flex flex-col items-start my-1">
			<span class="font-semibold capitalize">{toast.title}</span>
			<p class="text-sm text-gray-400">{toast.content}</p>
		</div>

		<button class="absolute top-4 right-0" on:click={() => removeToast(toast.id)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="w-4 h-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
			>
		</button>
	</div>
</div>

<style>
	.progress-bar {
		width: 100%;
		height: 8px;
		background: #e0e0e0;
		position: relative;
	}

	.progress {
		height: 100%;
		background: #4caf50;
	}
</style>
