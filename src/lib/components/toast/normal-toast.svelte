<!-- Toast.svelte -->
<script lang="ts">
	import { removeToast, type Toast } from './toast';
	import { cn } from '$lib/utils/cn';

	import { fly, type FlyParams } from 'svelte/transition';

	// icons
	import Success from './icons/success.svelte';
	import Info from './icons/info.svelte';
	import Error from './icons/error.svelte';

	export let toast: Toast;

	export let customClass: string = '';

	// transition
	export let enterTransition;
	export let exitTransition;

	function giveIcon() {
		switch (toast.type) {
			case 'success':
				return Success;
			case 'info':
				return Info;
			case 'error':
				return Error;
			default:
				return Success;
		}
	}

	function giveIconstyle() {
		switch (toast.type) {
			case 'success':
				return 'w-5 h-5 text-green-500';
			case 'info':
				return 'w-5 h-5 text-blue-500';
			case 'error':
				return 'w-5 h-5 text-red-500';
			default:
				return 'w-5 h-5 text-green-500';
		}
	}
</script>

<div
	in:fly={{ ...enterTransition }}
	out:fly={{ ...exitTransition }}
	class={cn(
		`relative flex w-80    border border-gray-200 rounded-md shadow-xl bg-slate-50 text-slate-900 
			
		 ${customClass} `
	)}
>
	<div class="mx-3 relative w-full">
		<div class="flex items-center gap-2 px-5 py-2">
			<svelte:component this={giveIcon()} class={giveIconstyle()} />
			<p class="text-base text-muted-foreground">{toast.content}</p>
		</div>

		<button class="absolute top-3 right-0" on:click={() => removeToast(toast.id)}>
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
