<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Svelte Toast</title>
</svelte:head>

<!-- <div
	class="w-full h-full absolute -z-20 bg-gradient-to-br from-fuchsia-600/25 via-slate-100 to-slate-600/30"
/> -->
<slot />

<style>
	:global(body) {
		@apply bg-gradient-to-tr from-amber-200/30 via-slate-50/10 to-violet-600/10;
		@apply text-slate-900;
		@apply flex justify-center items-center;
	}
</style>
