import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.use('api').user?.profile !== 'ADMIN') {
      response.forbidden({ error: 'You have no permission' })
      return
    }
    await next()
  }
}
