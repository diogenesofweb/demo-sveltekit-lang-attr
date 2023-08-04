export const prerender = true;
import { error } from '@sveltejs/kit';
/** @type {import('./$types').LayoutLoad} */
export async function load(ev) {
	// let locale = 'en';

	const lang = ev.params.lang || 'en';

	const my_langs = ['en', 'fr', 'ua'];
	if (!my_langs.includes(lang)) {
		throw error(404, { message: 'Not found' });
	}

	const modules = import.meta.glob('/src/lib/locales/*.json');

	const json = await modules[`/src/lib/locales/${lang}.json`]();

	// /** @type {Record<string, any>} */
	/** @type {typeof import('$lib/locales/en.json')} */
	const ttt = json?.default;

	return {
		ttt
	};
}
