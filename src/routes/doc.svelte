<div class="space-y-5 w-full flex flex-col items-center">
	<div>
		<h1 class="text-xl font-bold my-3">NPM</h1>
		<pre class="code">
            <code>npm i @svelte-kit/svelte-toast</code>
        </pre>
	</div>
	<div>
		<h1 class="text-xl font-bold my-3">PNPM</h1>
		<pre class="code">
            <code>pnpm add @svelte-kit/svelte-toast</code>
        </pre>
	</div>
	<div>
		<h1 class="text-xl font-bold my-3 capitalize">modify your tailwind config</h1>
		<span>tailwind css is required</span>
		<pre class="code">
            <code>
                {`/** @type {import('tailwindcss').Config}*/
    
                    const config = {
                        content: [
                            './src/**/*.{html,js,svelte,ts}',
                            ' ./node_modules/@svelte-kit/**/*.{html,js,svelte,ts}'
                        ],
                
                        theme: {
                            extend: {}
                        },
                
                        plugins: []
                    };
                
                    module.exports = config;
                `}</code
			>
        </pre>
	</div>
	<div>
		<h1 class="text-xl font-bold my-3">import toast</h1>
		<pre class="code">
            <code>{`import {Toast} from '@svelte-kit/svelte-toast';`}</code>
        </pre>
	</div>
	<div>
		<h1 class="text-xl font-bold my-3">Place it in root of the project</h1>
		<pre class="code">
            <code>{`<Toast position="top-center" maxToats=3  />`}</code>
        </pre>
	</div>
	<div>
		<h1 class="text-xl font-bold my-3">Usage</h1>
		<pre class="code">
            <code
				>{`
            <button 
                class="px-3 py-1 border bg-slate-50 text-slate-900 rounded-md"
                on:click={() =>
                    (toaster.success(
                        {title:  'Success',
                        content:  'This is a success toast',
                        progressColor:  'bg-green-500' ,
                         duration:3000)
                     })}>
                success
            </button>
                `}</code
			>
        </pre>
	</div>

	<div>
		<h1 class="text-xl font-bold my-3">if you want to custom style the toast</h1>
		<pre class="code">
            <code>
                {`
                <Toast
                    position="top-center
                    maxToasts=3
                    let:data
                    customToast
                >
                    
                    <div 
                     class="w-80 py-2 text-center border bg-slate-50 border-gray-600 border-opacity-30 shadow-xl rounded-md"
                    >
                       <h1>{data.title}</h1>
                       <p>{data.content}</p>
                    </div>
                    
                </Toast>`}
            </code>
        </pre>
	</div>
</div>

<style>
	.code {
		@apply bg-slate-800/90 text-slate-50 w-fit px-3 py-1 rounded-md flex justify-center items-center;
	}
</style>
