<script>
	import { Toast, toaster } from '$lib/index.ts';
</script>

<div class="w-full flex flex-col items-center justify-center gap-5">
	<h1 class="text-4xl my-10">Toast</h1>

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

	<div class="w-80 h-24 border rounded-md flex justify-start items-center px-5 py-2 relative">
		<div class="flex items-start flex-col">
			<h1 class="text-lg capitalize">toast title</h1>
			<p class="text-gray-400">you message shows here</p>
		</div>
		<span class="absolute top-2 right-2">X</span>
	</div>

	<a href="https://github.com/itsarunkumar/svelte-toast" class="underline">documentation</a>
</div>

<Toast position="bottom-right" customClass=" bg-slate-900 " />
