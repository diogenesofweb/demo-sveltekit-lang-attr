<script>
	import './style.css';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';

	/** @type {import('./$types').LayoutData} */
	export let data;

	const origin = 'http://www.example.com';

	const route_without_lang = (/** @type {string} */ r) => r.replace(/^\/(fr|ua)/, '');

	const l = {
		en: { locale: 'en', lang: 'en', pre: '', index: '/', flag: '🇬🇧' },
		fr: { locale: 'fr', lang: 'fr', pre: '/fr', index: '/fr', flag: '🇫🇷' },
		ua: { locale: 'ua', lang: 'uk', pre: '/ua', index: '/ua', flag: '🇺🇦' }
	};

	const my_locales = Object.values(l);

	// route without locales
	let route = '/';

	const unsub = page.subscribe((p) => {
		// console.log(p);
		const path = p.url.pathname;
		const lang = p.params.lang;

		const my_langs = ['fr', 'ua'];
		if (my_langs.includes(lang)) {
			route = route_without_lang(path);
		} else {
			route = path;
		}

		if (route === '/') {
			route = '';
		}

		if (browser) {
			document.documentElement.setAttribute('lang', lang || 'en');
		}
	});

	onDestroy(() => unsub());

	function on_switch_lang(ev) {
		const val = ev.target.value;
		const r = route_without_lang($page.url.pathname);
		const l = val === 'en' ? '' : `/${val}`;
		const h = $page.url.origin + l + r;
		// console.log({ val, r, l, h });
		window.location.href = h;
	}
</script>

<svelte:head>
	<title>{data.ttt.title[route || '/']}</title>

	<link rel="canonical" href={`${origin}${route}`} />
	<link rel="alternate" href={`${origin}${route}`} hreflang="x-default" />
	{#each my_locales as el}
		<link rel="alternate" href={`${origin}${el.pre}${route}`} hreflang={el.lang} />
	{/each}
</svelte:head>

<div class="header">
	<div class="flex">
		Reload links (MPA navigation):
		<nav>
			{#each my_locales as el}
				<a data-sveltekit-reload href={el.index}>{el.locale}</a>
			{/each}
		</nav>
	</div>

	<div>
		<label>
			Switch lang:
			<select value={$page.params.lang || 'en'} on:change={on_switch_lang}>
				{#each my_locales as el}
					<option value={el.locale}>{el.flag} : {el.lang}</option>
				{/each}
			</select>
		</label>
	</div>
</div>

<div class="links">
	<p>all links (no reload, SPA navigation):</p>
	<nav>
		{#each my_locales as el}
			<a href={el.index}>index {el.locale}</a>
		{/each}
	</nav>

	<nav>
		{#each my_locales as el}
			<a href="{el.pre}/about">about {el.locale}</a>
		{/each}
	</nav>
</div>

<slot><!-- optional fallback --></slot>

<style>
	.header {
		padding: 1em;
		background: hsl(0 0% 75%);
	}
	.links {
		background: hsl(0 0% 80%);
	}
	nav,
	.flex {
		display: flex;
		align-items: center;
		gap: 1ch;
		padding: 1ch;
	}
	a {
		color: inherit;
		padding: 1ch;
		background: hsl(0 0% 85%);
	}
</style>
