import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('email').unique()
      table.string('password')
      table.string('avatar').nullable()
      table
        .enum('profile', ['ADMIN', 'CLIENT_REGULAR', 'CLIENT_SUBSCRIBER'], {
          useNative: true,
          enumName: 'user_profile',
          existingType: false,
        })
        .defaultTo('CLIENT_REGULAR')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}