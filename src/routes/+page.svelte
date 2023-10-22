<script>
	import { Toast, addToast, toaster } from '$lib/index.ts';
	// import { addToast, Toast, toaster } from '@svelte-things/toast';
</script>

<div class="w-full flex flex-col items-center justify-center gap-5">
	<h1 class="text-4xl my-10">svelte-things / Toast</h1>

	<p class="text-lg first-letter:capitalize">a drop in toast component for svelte</p>

	<div class="flex gap-5 items-center justify-center my-10">
		<button
			class="px-3 py-1 border bg-slate-50 text-slate-900 rounded-md"
			on:click={() =>
				toaster.success({
					title: 'Success',
					content: 'This is a success toast',
					progressColor: 'bg-green-500'
				})}
		>
			success
		</button>
		<button
			class="px-3 py-1 bg-red-500 text-slate-900 rounded-md"
			on:click={() => toaster.error({ title: 'error', content: 'This is a error toast' })}
		>
			error
		</button>
		<button
			class="px-3 py-1 bg-blue-500 text-slate-900 rounded-md"
			on:click={() =>
				toaster.info({
					title: 'info',
					content: 'This is a info toast',
					duration: 3000,
					progressColor: 'bg-yellow-500'
				})}
		>
			info
		</button>
	</div>

	<a href="" class="underline">documentation</a>
</div>

<Toast position="bottom-right" customClass=" bg-slate-900 " />
