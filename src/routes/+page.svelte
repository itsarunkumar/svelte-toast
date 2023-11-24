<script lang="ts">
	import { Toast, toaster } from '$lib/index.js';
	import { version } from './constant.js';

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
			type: randomType as 'success' | 'error' | 'info',
			title: `Toast ${randomType}`,
			content: `this is a toast with ${randomType} type`,
			duration: 13000,
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
	<div class="flex items-center gap-6 justify-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="w-14 h-14 text-slate-900"
			><path
				d="M21.66 17.67a1.08 1.08 0 0 1-.04 1.6A12 12 0 0 1 4.73 2.38a1.1 1.1 0 0 1 1.61-.04z"
			/><path d="M19.65 15.66A8 8 0 0 1 8.35 4.34" /><path d="m14 10-5.5 5.5" /><path
				d="M14 17.85V10H6.15"
			/></svg
		>
		<h1 class="text-5xl uppercase font-semibold flex gap-4 items-center">
			<span class="text-slate-50 bg-slate-400 p-2 rounded-md skew-x-2">Svelte</span>
			<span class="text-amber-500 skew-x-2">Toast</span>
		</h1>
	</div>

	<p class="text-lg first-letter:capitalize text-slate-500">a drop in toast component for svelte</p>

	<span
		class="text-slate-500 px-3 rounded-full border border-slate-950 border-opacity-25 flex items-center gap-1"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="w-4 h-4"
			><path d="M12 6v12" /><path d="M17.196 9 6.804 15" /><path d="m6.804 9 10.392 6" /></svg
		>version {version}</span
	>

	<div class="flex gap-5 items-center justify-center my-10">
		<button
			class="capitalize px-5 py-2 rounded-md bg-slate-700 text-slate-50"
			on:click={randomToast}>toast</button
		>
		<button
			class="capitalize px-5 py-2 rounded-md bg-amber-500 text-slate-50"
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
			class="  text-slate-500 capitalize px-2 py-2 flex items-center gap-2 justify-center"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-github"
				><path
					d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
				/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
			>Source</a
		>
	</div>

	<label for="progress" class="flex items-center gap-2">
		<input
			type="checkbox"
			name="progress"
			id="progress"
			on:input={checkbox}
			bind:checked={isProgess}
			class="w-4 h-4 text-slate-900"
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
			class=" border shadow-md px-2 py-2 w-16 rounded-md text-slate-900"
		/>
		Maximum toast to show
	</label>

	<label for="position" class="flex items-center gap-2">
		Position
		<select
			id="position"
			name="position"
			bind:value={selectValue}
			class="border shadow-md px-2 py-2 w-full rounded-md text-slate-900"
		>
			<option value="top-left">top-left</option>
			<option value="top-center">top-center</option>
			<option value="top-right">top-right</option>
			<option value="bottom-left">bottom-left</option>
			<option value="bottom-center">bottom-center</option>
			<option value="bottom-right">bottom-right</option>
		</select>
	</label>
</div>

<div class="mt-10">
	<h1 class="text-2xl font-bold my-3">npm</h1>
	<pre class="bg-slate-200 flex items-center justify-center p-2 rounded-md">
		<code>npm i @svelte-kit/svelte-toast</code>
	</pre>
</div>

<Toast
	position={selectValue}
	stacked={isStacked}
	{maxToasts}
	withProgress={isProgess}
	closable={false}
	let:data
>
	<div
		class="w-80 py-2 text-center border bg-slate-50 text-slate-900 border-gray-600 border-opacity-30 shadow-xl rounded-md"
	>
		<h1>{data.title}</h1>
		<p>{data.content}</p>
		<span>{prog}%</span>
	</div>
</Toast>
