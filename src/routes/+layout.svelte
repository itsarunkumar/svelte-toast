<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Svelte Toast</title>
</svelte:head>

<slot />

<style>
	:global(body) {
		@apply bg-gray-900 text-gray-200;
	}
</style>
