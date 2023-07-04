/* eslint-disable @typescript-eslint/ban-types */
import Logger from '../../logger'
import { Server } from 'http'
export function normalizePort(val: string): number | string | null {
  const port = parseInt(val, 10)
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) return val
  if (port >= 0) return port
  return null
}

export function onListening(server: Server) {
  const addr = server.address()
  const bind: string | null = typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr?.port}`
  Logger.info(`Listening on ${bind} `)
}

export const onError =
  (port: number | string) =>
  (error: { code: string; syscall: string }): void => {
    if (error.syscall !== 'listen') throw error
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        Logger.error(`${bind} requires elevated privileges`)
        process.exit(1)
        break
      case 'EADDRINUSE':
        Logger.error(`${bind}  is already in use`)
        process.exit(1)
        break
      default:
        Logger.error(error)
        process.exit(1)
    }
  }
