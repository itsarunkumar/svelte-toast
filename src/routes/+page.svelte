<script lang="ts">
	import { Toast, toaster, toasts } from '$lib/index.js';
	import { onMount } from 'svelte';

	import { version } from './constant.js';

	import { randomToast } from './toasts.js';
	import { handleOnMove, updateLastMousePosition } from './effect.js';
	import Webdoc from './web-doc.svx';

	// updateToastConfig({ duration: 9000, type: 'success' });

	let isProgess = false;
	let isStacked = true;
	let maxToasts = 3;
	let duration = 5000;

	let curPosition = 'top-center';

	let positions = [
		'top-left',
		'top-center',
		'top-right',
		'bottom-left',
		'bottom-center',
		'bottom-right'
	];

	function checkbox() {
		isProgess = !isProgess;
	}

	const originPosition = { x: 0, y: 0 };

	onMount(() => {
		window.addEventListener('mousemove', handleOnMove);
		window.addEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
		document.body.addEventListener('mouseleave', () => updateLastMousePosition(originPosition));

		return () => {
			window.removeEventListener('mousemove', handleOnMove);
			window.removeEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
			document.body.removeEventListener('mouseleave', () =>
				updateLastMousePosition(originPosition)
			);
		};
	});
</script>

<div class="w-full h-screen flex flex-col items-center justify-center gap-5 relative">
	<div class="w-full flex flex-col items-center justify-center gap-3">
		<h1 class=" uppercase font-bold flex gap-4 items-center">
			<span class="text-slate-100 text-3xl p-3 rounded-lg shadow-md bg-slate-800 border"
				>Svelte</span
			>
			<span class="text-slate-900 text-3xl p-3 rounded-lg shadow-md bg-slate-100 border">Toast</span
			>
		</h1>

		<p
			class=" w-full text-center text-2xl md:text-4xl first-letter:capitalize text-slate-800 font-semibold"
		>
			a drop in toast component for svelte
		</p>
		<span class="text-slate-500">{version}</span>
	</div>
	<div class="flex gap-5 items-center justify-center font-semibold">
		<button
			class="capitalize px-5 py-2 rounded-md bg-slate-900 text-slate-50 shadow-lg"
			on:click={() => {
				curPosition = 'top-center';
				randomToast(duration);
			}}>toast</button
		>
		<button
			class="capitalize px-5 py-2 rounded-md bg-purple-500 text-slate-50 shadow-lg"
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
				class="w-4 h-4 drop-shadow-lg"
				><path
					d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
				/><path d="M9 18c-4.51 2-5-2-7-2" /></svg
			>Source</a
		>
	</div>
	<div class="inline-flex items-center">
		<label
			class="relative flex items-center p-3 rounded-full cursor-pointer"
			for="login"
			data-ripple-dark="true"
		>
			<input
				id="login"
				type="checkbox"
				on:input={checkbox}
				bind:checked={isProgess}
				class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
			/>
			<div
				class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3.5 w-3.5"
					viewBox="0 0 20 20"
					fill="currentColor"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						fill-rule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
		</label>
		<label class="mt-px font-semibold text-gray-700 cursor-pointer select-none" for="login">
			Show progress bar
		</label>
	</div>

	<div class="absolute bottom-0 py-4">
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
			class="lucide lucide-chevrons-down"><path d="m7 6 5 5 5-5" /><path d="m7 13 5 5 5-5" /></svg
		>
	</div>
</div>

<div class="w-full bg-slate-100/10 flex flex-col items-center justify-center gap-5 px-10 py-10">
	<div class=" w-full md:w-1/2 flex flex-col items-center justify-center align-top">
		<h1 class="text-2xl font-bold my-3 flex self-start">Position</h1>
		<div class="flex gap-2 items-center flex-wrap justify-center">
			{#each positions as position}
				<button
					on:click={() => {
						toasts.set([]);
						curPosition = position;
						randomToast(duration);
					}}
					class="capitalize px-5 py-2 rounded-md bg-slate-900 text-slate-50 shadow-lg"
					>{position}</button
				>
			{/each}
		</div>
	</div>

	<div
		class="w-full prose prose-code:text-sm prose-lg md:prose-xl prose-h1:capitalize prose-p:first-letter:capitalize"
	>
		<Webdoc />
	</div>
</div>

<Toast position={curPosition} {maxToasts} withProgress={isProgess} let:data>
	<div
		class="w-80 py-2 text-center border bg-slate-50 text-slate-900 border-gray-600 border-opacity-30 shadow-xl rounded-md"
	>
		<h1>{data.title}</h1>
		<p>{data.content}</p>
	</div>
</Toast>
