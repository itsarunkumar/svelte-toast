<script>
	import { usePortal } from '$lib/utils/portal';
	import { fly, scale } from 'svelte/transition';
	import { addToast, toasts, removeToast } from './toast';
	import { get } from 'svelte/store';
	import Single from './single-toast.svelte';

	let toastList = [];

	toasts.subscribe((newToasts) => {
		toastList = newToasts;
	});
</script>

<div
	use:usePortal
	class="fixed max-w-max max-h-max bottom-2 max-sm:top-2 right-2 flex flex-col items-end gap-5 z-[9999]"
>
	{#each $toasts as toast (toast.id)}
		<Single {toast} />
	{/each}
</div>
