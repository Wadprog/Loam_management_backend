import app from '../app'
import { normalizePort, onListening, onError } from './utils'

const portNumber = app.get('port')
if (!portNumber) {
  throw new Error('No port configuration specified!')
}
const port = normalizePort(portNumber)
if (port != null) {
  const server = app.listen(port)
  server.on('error', onError(port))
  server.on('listening', () => {
    // app
    // .get('sequelizeSync')
    // .then(() => {
    onListening(server)
    // })
    // .catch((error: Error) => {
    // Logger.error(error)
    // process.exit(1)
    // })
  })

  console.log('Hello world !!!!')
}
