<!-- Toast.svelte -->
<script lang="ts">
	import { removeToast } from './toast.js';
	import { cn } from '$lib/utils/cn.js';
	import type { Toast } from './types.js';

	import { fly } from 'svelte/transition';

	// Icons
	import CheckIcon from './icons/success.svelte';
	import InfoIcon from './icons/info.svelte';
	import ErrorIcon from './icons/error.svelte';
	import Loader from './icons/loading.svelte';


	interface Props {
		toast: Toast;
		closable?: boolean;
		enterTransition: Record<string, any>;
		exitTransition: Record<string, any>;
		withProgress?: boolean;
	}

	let {
		toast = $bindable(),
		closable = true,
		enterTransition,
		exitTransition,
		withProgress = false
	}: Props = $props();

	const { progress } = toast;

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

	let promiseResolved = $state(false);

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

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	role="button"
	onclick={() => removeToast(toast.id)}
	in:fly={{ ...enterTransition }}
	out:fly={{ ...exitTransition }}
	class={`relative flex w-80 rounded-md   bg-gray-100 text-slate-800 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] drop-shadow-md `}
>
	{#if withProgress}
		<div
			class={cn('absolute top-0 left-0 h-[3px] bg-yellow-500 rounded-md', toast.progressColor)}
			style={`width: ${$progress}%`}
		></div>
	{/if}
	<div class="relative w-full h-full py-4 flex items-center justify-center">
		<div class="flex items-center justify-center gap-4 w-full h-full">
			{#if toast.type === 'promise'}
				{#if promiseResolved}
					{@const SvelteComponent = getIconComponent()}
					<SvelteComponent class={`${getIconColor()} w-5 h-5`} ` />
					<p class="text-base">{@html toast.content}</p>
				{:else if !promiseResolved}
					<Loader class={` w-5 h-5 animate-spin `} />
					<p class="animate-pulse text-base">Loading...</p>
				{/if}
			{:else}
				{@const SvelteComponent_1 = getIconComponent()}
				<SvelteComponent_1 class={`${getIconColor()} w-5 h-5  `} ` />
				<p class="text-base text-center">{@html toast.content}</p>
			{/if}
		</div>

		{#if closable}
			<button
				class="absolute top-1 right-1 p-1 text-gray-800 hover:text-gray-700 focus:outline-none"
				aria-label="Close"
				onclick={() => removeToast(toast.id)}
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
