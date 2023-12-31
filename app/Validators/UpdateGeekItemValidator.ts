import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateGeekItemValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional(),
    comment: schema.string.optional(),
    rating: schema.number.optional([rules.range(1, 10)]),
    dateAdd: schema.date.optional(),
    photo: schema.string.optional(),
    categoryId: schema.number.optional([
      rules.exists({
        table: 'categories',
        column: 'id',
      }),
    ]),
  })

  public messages: CustomMessages = {}
}
