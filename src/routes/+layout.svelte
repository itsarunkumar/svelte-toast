<script>
	import '../app.css';
	import { inject } from '@vercel/analytics';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

	inject();
</script>

<svelte:head>
	<title>Svelte Toast</title>

	<!-- General Meta Tags -->
	<meta
		name="description"
		content="Svelte Toast is a simple, flexible toast notification system for SvelteKit apps."
	/>
	<meta name="keywords" content="Svelte, SvelteKit, Toast, Notifications, UI Components" />
	<meta name="author" content="Your Name or Your Company" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Open Graph (OG) Meta Tags for social media sharing -->
	<meta property="og:title" content="Svelte Toast - Flexible Notifications for SvelteKit" />
	<meta
		property="og:description"
		content="A Simple and  versatile toast notification component for SvelteKit applications."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://svelte-toast.itsarun.cc/" />
	<!-- <meta property="og:image" content="https://yourwebsite.com/og-image.png" /> -->

	<!-- Additional Meta Tags -->
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://svelte-toast.itsarun.cc/" />
</svelte:head>

{@render children?.()}

<style>
	:global(body) {
		@apply bg-orange-200/10;
		@apply text-slate-900;
	}
</style>
