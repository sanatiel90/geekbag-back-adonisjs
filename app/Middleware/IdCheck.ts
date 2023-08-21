import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IdCheck {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const onlyNumbers = new RegExp('^[0-9]+$')
    if (!onlyNumbers.test(request.param('id'))) {
      response.badRequest('Invalid param')
      return
    }
    await next()
  }
}
