import { HookContext } from '@feathersjs/feathers'

export default async (context: HookContext) => {
  const { app, data } = context

  const username = data.username || data.employee.username
  const password = data.passwordConfirmation || data.employee.passwordConfirmation

  if (!username || !password) throw new Error('Username or password is missing for auto login')

  try {
    const loginDetails = await app.service('authentication').create({
      strategy: 'local',
      username,
      password
    })

    Object.keys(loginDetails).forEach((key) => {
      if (key !== 'User') context.result[key] = loginDetails[key]
    })
  } catch (e: any) {
    throw new Error(e.message || e)
  }
  return context
}
