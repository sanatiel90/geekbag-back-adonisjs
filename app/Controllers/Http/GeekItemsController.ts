import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateGeekItemValidator from '../../Validators/CreateGeekItemValidator'
import GeekItem from '../../Models/GeekItem'
import BaseController from './BaseController'
import UpdateGeekItemValidator from '../../Validators/UpdateGeekItemValidator'

export default class GeekItemsController extends BaseController {
  public async index({ auth, request }: HttpContextContract) {
    const user = this.getUser(auth)
    const limit = 3
    const {
      page = 1,
      categoryId,
      title,
      rating,
      orderBy = 'id',
      orderByDesc = 'asc',
    } = request.qs()

    const geekItems = await GeekItem.query()
      .preload('category')
      .where('user_id', user.id)
      .orderBy(orderBy, orderByDesc)
      .paginate(page, limit)
    return geekItems
  }

  public async store({ auth, request, response }: HttpContextContract) {
    await request.validate(CreateGeekItemValidator)
    const user = this.getUser(auth)
    const { title, comment, rating, dateAdd, categoryId } = request.only([
      'title',
      'comment',
      'rating',
      'dateAdd',
      'categoryId',
    ])
    const geekItem = await GeekItem.create({
      title,
      comment,
      rating,
      dateAdd,
      categoryId,
      user_id: user.id,
    })

    response.status(201)
    return geekItem
  }

  public async show({ auth, request, response }: HttpContextContract) {
    const user = this.getUser(auth)
    const geekItemId = request.param('id')
    const geekItem = await this.findByUser(geekItemId, user.id)
    if (!geekItem) {
      return response.notFound({ error: 'row not found' })
    }
    return geekItem
  }

  public async destroy({ auth, request, response }: HttpContextContract) {
    const user = this.getUser(auth)
    const geekItemId = request.param('id')
    const geekItem = await this.findByUser(geekItemId, user.id)
    if (!geekItem) {
      return response.notFound({ error: 'row not found' })
    }
    await geekItem.delete()
    return response.noContent()
  }

  public async update({ auth, request, response }: HttpContextContract) {
    await request.validate(UpdateGeekItemValidator)
    const user = this.getUser(auth)
    const geekItemId = request.param('id')
    const geekItem = await this.findByUser(geekItemId, user.id)
    if (!geekItem) {
      return response.notFound({ error: 'row not found' })
    }
    const { title, comment, rating, dateAdd, categoryId } = request.only([
      'title',
      'comment',
      'rating',
      'dateAdd',
      'categoryId',
    ])
    await geekItem
      .merge({
        title,
        comment,
        rating,
        dateAdd,
        categoryId,
      })
      .save()

    return geekItem
  }

  private findByUser(id: number, userId: number) {
    return GeekItem.query().where('id', id).andWhere('user_id', userId).first()
  }
}
