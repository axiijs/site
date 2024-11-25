import {createServer} from "vite";

const server = await createServer({
    plugins: [
        {
            name: 'rewrite-middleware',
            configureServer(serve) {
                serve.middlewares.use((req, res, next) => {
                    if (req.url?.startsWith('/playground/')) {
                        req.url = '/playground.html'
                    }
                    next()
                })
            }
        }
    ]
})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })