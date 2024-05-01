import "dotenv/config"

import fastify, { FastifyInstance } from "fastify"
import websock from "./websock"
import { readFileSync } from "fs"

const port = Number(process.env.BACKEND_SERVER_PORT ?? 3001)
const host = process.env.BACKEND_SERVER_HOST ?? "127.0.0.1"

let app: FastifyInstance
if (process.env.NODE_ENV !== "production") {
	console.log("Running in development mode, no SSL")
	app = fastify()
} else {
	const https = {
		key: readFileSync(process.cwd() + "/certs/server.key"),
		cert: readFileSync(process.cwd() + "/certs/server.crt"),
	}
	const opts = {
		logger: true,
		https,
	}
	app = fastify(opts)
}

// Websock Controller
app.register(websock, { server: app.server })

app.listen({ port, host: "0.0.0.0" })

console.log(`Storytime backend server listening on ${host}:${port}`)
