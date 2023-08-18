import Route from '@ioc:Adonis/Core/Route'

export const geekItemRoutes = Route.group(() => {
  Route.resource('', 'GeekItemsController').apiOnly()
}).prefix('geek-items')
