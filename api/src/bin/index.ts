import app from '../app'
import { normalizePort, onListening, onError } from './utils'
import Logger from '../utils/logger'

const portNumber = app.get('port')
if (!portNumber) {
  Logger.error('No port configuration specified!')
  process.exit(1)
}
const port = normalizePort(portNumber)
if (port != null) {
  const server = app.listen(port)
  server.on('error', onError(port))
  server.on('listening', () => onListening(server))
  // process.env.NODE_ENV !== 'production' &&
  //   app
  //     .get('sequelizeSync')()
  //     .then(Logger.info('Database synced'))
  //     .catch((error: Error) => {
  //       console.log(error)
  //       Logger.error(error.message || error)
  //       process.exit(1)
  //     })
}
