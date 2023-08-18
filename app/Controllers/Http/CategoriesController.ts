import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from '../../Models/Category'
import Database from '@ioc:Adonis/Lucid/Database'
import CreateCategoryValidator from '../../Validators/CreateCategoryValidator'

export default class CategoriesController {
  public async index() {
    //TODO: rota apenas para admin...
    return await Category.query().preload('user')
  }

  public async findAllByUser({ auth, response }: HttpContextContract) {
    const user = auth.use('api').user
    if (!user) {
      return response.badRequest({ error: 'User not valid' })
    }
    return await Category.query().where('user_id', user?.id)
  }

  public async store({ auth, request, response }: HttpContextContract) {
    await request.validate(CreateCategoryValidator)
    const user = auth.use('api').user
    if (!user) {
      return response.badRequest({ error: 'User not valid' })
    }

    const { name } = request.only(['name'])

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

    return category
  }
}
