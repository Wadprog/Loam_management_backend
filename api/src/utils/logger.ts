import winston, { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'error',
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  )
}
export default logger
