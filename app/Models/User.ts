import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Category from './Category'
import GeekItem from './GeekItem'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatar: string

  @column()
  public profile: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'user_id', //por padrão o Lucid considera o campo como camelCase (userId), mas eu criei como snake_case, por isso setando manualmente aqui
  })
  public categories: HasMany<typeof Category>

  @hasMany(() => GeekItem, {
    foreignKey: 'user_id',
  })
  public geekItems: HasMany<typeof GeekItem>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
