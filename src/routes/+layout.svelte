<script>
	import '../app.css';
	import { inject } from '@vercel/analytics'
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	inject()
</script>

<svelte:head>
	<title>Svelte Toast</title>
</svelte:head>

{@render children?.()}

<style>
	:global(body) {
		@apply bg-orange-200/10;
		@apply text-slate-900;
	}
</style>
