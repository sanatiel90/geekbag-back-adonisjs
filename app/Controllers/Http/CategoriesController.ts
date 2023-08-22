import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from '../../Models/Category'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateCategoryValidator from '../../Validators/CreateCategoryValidator'
import BaseController from './BaseController'

export default class CategoriesController extends BaseController {
  public async index() {
    //TODO: rota apenas para admin...
    return await Category.query().preload('user')
  }

  public async findAllByUser({ auth }: HttpContextContract) {
    const user = this.getUser(auth)
    return await Category.query().where('user_id', user?.id)
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { name } = await request.validate(CreateCategoryValidator)
    const user = this.getUser(auth)

    //pega o ultimo order que tiver neste usuario, para que a proxima category incremente em 1
    const lastOrderNumber = await Database.from('categories')
      .where('user_id', user?.id)
      .max('order')

    const category = await Category.create({
      name,
      icon: 'customized',
      order: lastOrderNumber[0].max + 1,
      user_id: user.id,
    })
    response.status(201)
    return category
  }
}
