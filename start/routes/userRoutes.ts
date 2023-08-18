import Route from '@ioc:Adonis/Core/Route'

export const userRoutes = Route.group(() => {
  Route.get('me', 'UsersController.me')
  Route.get('', 'UsersController.index').middleware('admin')
}).prefix('users')
