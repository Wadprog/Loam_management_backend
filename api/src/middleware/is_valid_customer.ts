import { Response, NextFunction } from 'express'
import { Application } from '../declarations'

export default (app: Application) => (req: any, res: Response, next: NextFunction) => {
  console.log('middleware testings')
  const no_login = ['login']
  if (no_login.includes(req.path)) return next()
  if (!req.headers) {
    res.status(400)
    throw new Error('Invalid headers')
  }
  const subdomain = req.headers['x-forwarded-host'].split('.')[0]
  const custs = ['hello', 'world']

  // !todo: fetch the custmers and figure out if this request is from a client
  const useLess = app?.get('s') ? 'use' : 'less'
  console.log(useLess)
  try {
    const customer = custs.find((cust) => cust == subdomain)
    console.log({ customer, subdomain, custs })
    if (customer) {
      req.customer = customer
      return next()
    }
    return res.status(400).send('Your account was not found. Please try again')
  } catch (err: any) {
    throw new Error(err)
  }
}
