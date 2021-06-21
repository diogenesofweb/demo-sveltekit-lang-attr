<script context="module">
	import { browser, dev } from '$app/env'

	export const hydrate = dev
	export const router = browser
	export const prerender = true
</script>

<svelte:head>
	<title>Hello</title>
</svelte:head>

<h1>Hello World</h1>
