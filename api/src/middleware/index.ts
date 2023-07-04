import { Application } from '../declarations'

import ValidCx from './is_valid_customer'
const middlewares = [ValidCx]

export default function (app: Application): void {
  middlewares.forEach((middlewareContainer: any) => {
    const middleware = middlewareContainer(app)
    app.use(middleware)
  })
}
