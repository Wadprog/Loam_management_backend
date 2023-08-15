import config from 'config'
import Stripe from 'stripe'
import { Id, Params } from '@feathersjs/feathers'
import { BadRequest } from '@feathersjs/errors'
import { Service, SequelizeServiceOptions } from 'feathers-sequelize'

import saveIntent from './lib/saveIntent'
import getPaymentIntents from './lib/getPaymentIntents'
import getPlanAndSubcription from './lib/getPlanAndSubcription'

import Logger from '../../utils/logger'
import { Application } from '../../declarations'

/*process.env.STRIPE_SECRET_KEY*/
const secretKey = config.get<string>('stripe.secretKey')

const stripe = new Stripe(secretKey, {
  apiVersion: '2022-11-15'
})

export class PaymentIntents extends Service {
  app: Application
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options)
    this.app = app
  }

  async find(params: Params): Promise<any> {
    const { tenant_id } = params.employee

    try {
      const paymentIntents = await getPaymentIntents(this.app, tenant_id, params.query)
      return Promise.resolve(paymentIntents || [])
    } catch (error: any) {
      if (error.message.toLower().contains('unauthorized')) throw new BadRequest(error.message)
    }
  }

  async create(data: any, params: Params): Promise<any> {
    const { tenant_id } = params.employee

    try {
      const { subscriptionId, planPrice } = await getPlanAndSubcription(this.app, tenant_id)

      if (!subscriptionId) throw new BadRequest('No subscription found')

      const paymentIntent = await stripe.paymentIntents.create({
        amount: planPrice * 100,
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true
        }
      })

      await saveIntent(this.app, paymentIntent.id, subscriptionId)
      return Promise.resolve({ paymentIntent })
    } catch (error) {
      console.log('error', error)
      return Promise.reject(error)
    }
  }
  async update(id: Id, data: Partial<any>, params?: Params | undefined): Promise<any> {
    const { tenant_id } = params?.employee

    try {
      const { subscriptionId, planPrice } = await getPlanAndSubcription(this.app, tenant_id)

      const paymentIntent = await stripe.paymentIntents.update(id as string, {
        amount: planPrice * 100,
        currency: 'usd'
      })

      await saveIntent(this.app, paymentIntent.id, subscriptionId)
      return Promise.resolve({ paymentIntent })
    } catch (error) {
      console.log('error', error)
      return Promise.reject(error)
    }
  }
  async patch(id: string, data: { status: string }): Promise<any> {
    console.log('patch called')
    console.log({ id, data })

    try {
      // await saveIntent(this.app, id as string, null, data)
      await this.app
        .get('sequelizeClient')
        .query(`UPDATE payment_intents set status = 'completed' WHERE payment_intent_id = ?`, {
          replacements: [id],
          type: this.app.get('sequelizeClient').QueryTypes.UPDATE
        })
      const { status } = data
      return Promise.resolve({ paymentIntent: { id, status } })
    } catch (error: any) {
      Logger.error(`Could not update Intent details, ${error.message || JSON.stringify(error)}`)
      console.log({ error })
      return Promise.reject(error)
    }
  }
}
