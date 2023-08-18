import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Subscriber {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.use('api').user?.profile === 'CLIENT_REGULAR') {
      response.forbidden({ error: 'You have no permission' })
      return
    }
    await next()
  }
}
