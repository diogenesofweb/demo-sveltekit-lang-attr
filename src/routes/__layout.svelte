<main>
	<nav class="ce">
		<a href="/">🇬🇧</a>
		<a href="/fr">🇫🇷</a>
		<a href="/ua">🇺🇦</a>
	</nav>

	<section>
		<slot />
	</section>
</main>

<style>
	.ce {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	a {
		font-size: 2rem;
		text-decoration: none;
	}

	section {
		margin-top: 3rem;
		text-align: center;
	}

	:global(body) {
		font-size: 16px;
	}

	:global(h1) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: clamp(2rem, 15vw, 8rem);
	}
</style>
