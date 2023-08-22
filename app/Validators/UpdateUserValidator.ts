import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    avatar: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'png', 'JPG', 'PNG'],
    }),
  })

  public messages: CustomMessages = {}
}
