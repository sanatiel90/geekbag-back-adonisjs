import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

export default class BaseController {
  protected getUser(auth: AuthContract) {
    const user = auth.use('api').user
    if (!user) {
      throw new AuthenticationException('User not valid', '_INVALID_USERa')
    }
    return user
  }
}
