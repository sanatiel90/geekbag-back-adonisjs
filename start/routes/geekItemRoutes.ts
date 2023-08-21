import Route from '@ioc:Adonis/Core/Route'

export const geekItemRoutes = Route.group(() => {
  Route.resource('geek-items', 'GeekItemsController')
    .apiOnly()
    .middleware({
      show: ['idCheck'],
      destroy: ['idCheck'],
    })
})
