<script>
	import { Toast, toaster } from '$lib/index.ts';

	let isProgess = false;

	function randomToast() {
		// show the three type of toast in random

		const type = ['success', 'error', 'info'];
		const randomType = type[Math.floor(Math.random() * type.length)];

		toaster.show({
			type: randomType,
			title: `Toast ${randomType}`,
			content: `Toast ${randomType}`,
			duration: 3000,
			progressColor: 'bg-green-500'
		});
	}

	function checkbox() {
		isProgess = !isProgess;
		console.log(isProgess);
	}
</script>

<div class="w-full flex flex-col items-center justify-center gap-5">
	<h1 class="text-4xl my-10">Toast</h1>

	<p class="text-lg first-letter:capitalize">a drop in toast component for svelte</p>

	<div class="flex gap-5 items-center justify-center my-10">
		<button
			class="capitalize px-5 py-2 border rounded-md bg-slate-800 text-slate-50"
			on:click={randomToast}>toast</button
		>
		<a
			href="https://github.com/itsarunkumar/svelte-toast"
			target="_blank"
			class=" bg-slate-600 text-slate-50 capitalize px-2 py-2 border shadow-md rounded-md"
			>documentation</a
		>
	</div>

	<label for="progress" class="flex items-center gap-2">
		<input
			type="checkbox"
			name="progress"
			id="progress"
			on:input={checkbox}
			bind:checked={isProgess}
			class="w-4 h-4"
		/>
		Show progress
	</label>

	<div
		class="w-80 h-20 border border-gray-600 border-opacity-30 shadow-xl rounded-md flex justify-start items-center px-2 py-2 relative"
	>
		<div class="flex items-start flex-col">
			<h1 class="text-lg capitalize">toast title</h1>
			<p class="text-gray-400">you message shows here</p>
		</div>
	</div>

	<a href="https://github.com/itsarunkumar/svelte-toast" class="underline">Github</a>
</div>

<Toast position="top-center" customClass="" withProgress={isProgess} />
