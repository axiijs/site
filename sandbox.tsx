const url = new URL(window.location.href)
const searchParams = new URLSearchParams(url.search)

import((`/docs/tutorial/${searchParams.get('code')}/code`))
