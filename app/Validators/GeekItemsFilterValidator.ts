import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { GeekItemsOrderFields } from '../Enums/GeekItemsOrderFields'
import { OrderByDirections } from '../Enums/OrderByDirections'

export default class GeekItemsFilterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number.optional(),
    limit: schema.number.optional(),
    title: schema.string.optional(),
    rating: schema.number.optional([rules.range(1, 10)]),
    categoryId: schema.number.optional([
      rules.exists({
        table: 'categories',
        column: 'id',
      }),
    ]),
    orderBy: schema.enum.optional(Object.values(GeekItemsOrderFields)),
    direction: schema.enum.optional(Object.values(OrderByDirections)),
  })

  public messages: CustomMessages = {}
}
