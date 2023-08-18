import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'

export default class UsersController {
  public async me({ auth }: HttpContextContract) {
    //await auth.use('api').authenticate()
    return { msg: `Está logado como ${auth.use('api').user?.name}` }
  }

  public async index() {
    //TODO: apenas admin aqui...
    return await User.query().preload('categories')
  }
}
