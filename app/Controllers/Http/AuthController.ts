import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import CreateUserValidator from '../../Validators/CreateUserValidator'
import Category from '../../Models/Category'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    await request.validate(CreateUserValidator)
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)
    await Category.createMany([
      { name: 'Hqs', icon: 'comics', order: 1, user_id: user.id },
      { name: 'Mangás', icon: 'mangas', order: 2, user_id: user.id },
      { name: 'Animes', icon: 'animes', order: 3, user_id: user.id },
      { name: 'Filmes', icon: 'movies', order: 4, user_id: user.id },
      { name: 'Séries', icon: 'series', order: 5, user_id: user.id },
      { name: 'Games', icon: 'games', order: 6, user_id: user.id },
      { name: 'Board Games', icon: 'boardgames', order: 7, user_id: user.id },
      { name: 'Livros', icon: 'books', order: 8, user_id: user.id },
    ])
    response.status(201)
    return user
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7 days',
      })
      return token
    } catch {
      return response.unauthorized({ error: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    response.status(200)
    return { logout: true }
  }
}
