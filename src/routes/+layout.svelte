<script>
	import '../app.css';
	import { inject } from '@vercel/analytics'

	inject()
</script>

<svelte:head>
	<title>Svelte Toast</title>
</svelte:head>

<slot />

<style>
	:global(body) {
		@apply bg-orange-200/10;
		@apply text-slate-900;
	}
</style>
