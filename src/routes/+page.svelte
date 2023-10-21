<script>
	import { Toast, addToast } from '$lib/index.ts';
	// import { addToast, Toast } from '@svelte-things/toast';
</script>

<div class="w-full min-h-screen">
	<h1 class="text-4xl">This is UI lib</h1>
	<button on:click={() => addToast({ title: 'test', content: 'test', type: 'success' })}>
		add
	</button>
</div>

<Toast />
