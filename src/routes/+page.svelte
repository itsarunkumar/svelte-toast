<script lang="ts">
	import { Toast, toaster, type ToastType, TOAST_TYPES } from '$lib/index.js';

	import toastlogo from './toast-logo.png';

	// updateToastConfig({ duration: 9000, type: 'success' });

	let isProgess = false;
	let isStacked = true;

	let maxToasts = 3;

	// for select value
	let selectValue = 'top-center';

	function randomToast() {
		// show the three type of toast in random

		const type = ['success', 'error', 'info'];
		const color = ['bg-green-500', 'bg-red-500', 'bg-blue-500'];

		let i = Math.floor(Math.random() * type.length);
		const randomType = type[i];
		const randomColor = color[i];

		toaster.show({
			type: randomType as ToastType,
			title: `Toast ${randomType}`,
			content: `this is a toast with ${randomType} type`,
			duration: 3000,
			progressColor: randomColor
		});
	}

	function checkbox() {
		isProgess = !isProgess;
	}

	function stackedToasts() {
		isStacked = !isStacked;
	}
</script>

<div class="w-full flex flex-col items-center justify-center gap-5">
	<div class="flex items-center gap-3">
		<img src={toastlogo} alt="" class="w-7 h-7" />

		<h1 class="text-4xl my-10">Toast</h1>
	</div>

	<p class="text-lg first-letter:capitalize">a drop in toast component for svelte</p>

	<div class="flex gap-5 items-center justify-center my-10">
		<button
			class="capitalize px-5 py-2 border rounded-md bg-slate-800 text-slate-50"
			on:click={randomToast}>toast</button
		>
		<button
			class="capitalize px-5 py-2 border rounded-md bg-amber-500 text-slate-50"
			on:click={() => {
				toaster.promise({
					title: 'Promise Toast',
					content: new Promise((resolve) => {
						setTimeout(() => {
							resolve('Promise resolved!');
						}, 3000);
					}),
					progressColor: 'bg-blue-500'
				});
				console.log('clicked');
			}}>promise</button
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

	<label for="stacked" class="flex items-center gap-2">
		<input
			type="checkbox"
			name="stacked"
			id="stacked"
			on:input={stackedToasts}
			bind:checked={isStacked}
			class="w-4 h-4"
		/>
		Stacked toast
	</label>

	<label for="maxtoast" class="flex items-center gap-2">
		<input
			type="number"
			name="maxtoast"
			id="maxtoast"
			bind:value={maxToasts}
			min="1"
			max="10"
			class=" border shadow-md px-2 py-2 w-16 rounded-md"
		/>
		Maximum toast to show
	</label>

	<label for="position" class="flex items-center gap-2">
		Position
		<select
			id="position"
			name="position"
			bind:value={selectValue}
			class="border shadow-md px-2 py-2 w-full rounded-md"
		>
			<option value="top-left">top-left</option>
			<option value="top-center">top-center</option>
			<option value="top-right">top-right</option>
			<option value="bottom-left">bottom-left</option>
			<option value="bottom-center">bottom-center</option>
			<option value="bottom-right">bottom-right</option>
		</select>
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

<Toast
	position={selectValue}
	stacked={isStacked}
	{maxToasts}
	withProgress={isProgess}
	closable={false}
/>
