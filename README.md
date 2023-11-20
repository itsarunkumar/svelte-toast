# Svelte Toast UI

see in action -> [Home for stoast](https://stoast.vercel.app/)

_[**Svelte Toast UI**](https://github.com/itsarunkumar/svelte-toast) is a versatile and customizable toast notification system for Svelte applications. It allows you to easily display informative messages to your users in a visually appealing and user-friendly way._

## Features

- 🚀 **Easy to Use**: Simple and intuitive API for adding toast notifications.
- 🎨 **Customizable Styling**: Customize the appearance and transition animations to fit your app's design.
- ⏳ **Auto Dismiss**: Set the duration for how long toasts should be displayed, and they will automatically disappear.
- 🌈 **Multiple Types**: Support for different toast types, including success, error, and information.
- 🧩 **Extendable**: Extend and customize the toast components according to your needs.

## Installation

You can install Svelte Toast UI using your preferred package manager:

**npm**

```
npm i @svelte-kit/svelte-toast
```

**pnpm**

```
pnpm add @svelte-kit/svelte-toast
```

## Usage

To get started with Svelte Toast UI, follow these simple steps:

1.  **Import the required components** in your Svelte application:

    ```
    <script>
      import { Toast, toaster } from '@svelte-things/toast';
    </script>
    ```

2.  **Add the `ToastContainer` component** to your layout in your Svelte app's root file. Customize its appearance and position according to your preferences:
    ```
    <Toast
      position="top-center" // Position can be 'top', 'bottom', 'left', 'right', 'center', etc.
      customClass="" // Add your custom tailwind classes for styling
    />
    ```
3.  **Use the `toaster` object** to trigger toast notifications in your app
    ```
    <button on:click={() => toaster.success({ title: 'Success', content: 'Task completed!' })}>
      Show Success Toast
    </button>
    ```
4.  **Customize your toasts** by setting properties like `progressColor` in the `toaster` functions. Customize the progress bar color as needed.
5.  **Tailwind css required for this component** add this to your tailwind config file

```
    ./node_modules/@svelte-things/**/*.{html,js,svelte,ts}
```

add this in content of the tailwind config file. **important**

**Custom Type toast**

```
toaster.show({ title: 'Success', content: 'Task completed!' , type:'error' , progressColor:"bg-blue-500" , duration:3000 })
```

**Promise Toast**

```
toaster.promise({ title: 'Promise Toast', content: new Promise((resolve) => { setTimeout(() => { resolve('Promise resolved!'); }, 3000); }),  });
```

## ToastContainer Component

The `Toast` component is used to create a container for displaying toast notifications. It offers dynamic positioning and transition options for toast notifications.

             **should be placed in root of your project**

### Props

- `position` (optional): Position to display the toast container. Options include 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', and 'bottom-right'.
- `customClass` (optional): Custom CSS classes to style the container.
- `withProgress`(default = false) : set true to show the progress bar
- `closable`(default = true) : set true to not show the close icon in toast
- `maxToast`(default = 3) : set the no of toast to show
- `stacked`(default = true) : set stacked to falase , if you dont want the toasts stack on top of each other

### Positioning

- The `position` prop allows you to set the desired position of the toast container, which can be adjusted to 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', or 'bottom-right'.
- The container's position will affect where the toasts appear on the screen.

### Example

+layout.svelte

```
<script>
  import {Toast} from '@svelte-things/toast';

  // Customize the position, styling, and transitions
  let customPosition = 'top-center';
  let customClass = 'bg-primary'; //tailwind classes

</script>

<button class="px-3 py-1 border bg-slate-50 text-slate-900 rounded-md" on:click={() =>toaster.success({title:  'Success',content:  'This is a success toast',progressColor:  'bg-green-500' , duration:3000 // in ms})}>
success
</button>

<Toast
  position={customPosition}
  customClass={customClass}

/>
```

This example demonstrates how to use the `ToastContainer` component and customize its positioning, styling, and transitions to suit your needs.

[Github source code](https://github.com/itsarunkumar/svelte-toast)

**_contributions are welcomed_**
