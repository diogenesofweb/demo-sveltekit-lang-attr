/** @type {import('@sveltejs/kit').Handle} */

export async function handle({ request, resolve }) {
	const response = await resolve(request)

	if (request.path.startsWith('/ua')) {
		return {
			...response,
			// @ts-ignore
			body: response.body?.replace('<html lang="en">', '<html lang="uk">')
		}
	}

	if (request.path.startsWith('/fr')) {
		return {
			...response,
			// @ts-ignore
			body: response.body?.replace('<html lang="en">', '<html lang="fr">')
		}
	}

	return response
}
