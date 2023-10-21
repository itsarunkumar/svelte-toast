<!-- Toast.svelte -->
<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { removeToast } from './toast';

	import { tweened } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	export let toast: import('./toast').Toast;

	const progress = tweened(0);
	const duration = toast.duration || 3000; // Default duration is 3000 ms
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
</script>

<div
	in:fly={{ x: 20, duration: 500 }}
	out:fly={{ x: -20, duration: 500 }}
	class="relative flex w-72 px-1 py-2 overflow-hidden bg-primary-foreground border border-slate-300 border-opacity-30 rounded-md shadow-xl"
>
	<span class="absolute -top-2 -left-3">
		<!-- <Dot
			class={`w-9 h-9 ${
				toast.type === 'success'
					? 'text-green-500'
					: toast.type === 'error'
					? 'text-red-500'
					: 'text-violet-500'
			} `}
		/> -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class={`w-9 h-9 ${
				toast.type === 'success'
					? 'text-green-500'
					: toast.type === 'error'
					? 'text-red-500'
					: 'text-violet-500'
			} `}><circle cx="12.1" cy="12.1" r="1" /></svg
		>
	</span>
	<div class="mx-3 relative w-full">
		<div class="flex flex-col gap-1 items-start py-2">
			<span class="font-semibold capitalize">{toast.title}</span>
			<p class="text-sm text-muted-foreground">{toast.content}</p>
		</div>

		<div class="w-16 bg-muted-foreground/30 h-1 absolute top-0 left-0 right-0 rounded-lg">
			<div
				class={`h-full  rounded-lg ${
					toast.type === 'success'
						? 'bg-green-500'
						: toast.type === 'error'
						? 'bg-red-500'
						: 'bg-violet-500'
				}`}
				style="width: {$progress}%"
			/>
		</div>

		<button class="absolute top-0 right-0 p-1" on:click={() => removeToast(toast.id)}>
			<!-- <X class="w-4 h-4" /> -->
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
