/** @type {import('@sveltejs/kit').Handle} */
export function handle({ event, resolve }) {
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			if (event.params.lang) {
				return html.replace('lang="en"', `lang="${event.params.lang}"`);
			}

			return html;
		}
	});
}
