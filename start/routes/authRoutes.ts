import Route from '@ioc:Adonis/Core/Route'

export const authRoutes = Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')
  Route.post('logout', 'AuthController.logout').middleware('auth:api')
}).prefix('auth')
