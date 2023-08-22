import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UpdateUserValidator from '../../Validators/UpdateUserValidator'
import BaseController from './BaseController'
import fs from 'fs/promises'
import { Application } from '@adonisjs/core/build/standalone'

export default class UsersController extends BaseController {
  public async me({ auth }: HttpContextContract) {
    //await auth.use('api').authenticate()
    return { msg: `Está logado como ${auth.use('api').user?.name}` }
  }

  public async index() {
    //TODO: apenas admin aqui...
    return await User.query().preload('categories')
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const { name, avatar } = await request.validate(UpdateUserValidator)
    const userLogged = this.getUser(auth)
    const user = await User.findOrFail(userLogged.id)

    if (avatar) {
      const newAvatarName = `${user.email}_${avatar.clientName}`
      if (newAvatarName !== user.avatar) {
        try {
          //esta mandando uma foto diferente...
          //apagar foto antiga (se existir) e atualizar a nova
          if (user.avatar) {
            await fs.unlink(`tmp/uploads/${user.avatar}`)
          }

          await avatar.moveToDisk('./', {
            name: newAvatarName,
          })

          user.avatar = newAvatarName
        } catch (error) {
          console.log(error)
          return response.badRequest({ error: 'Error on update avatar file' })
        }
      }
    }

    user
      .merge({
        name,
      })
      .save()

    return user
  }
}
