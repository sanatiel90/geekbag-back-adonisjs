import Route from '@ioc:Adonis/Core/Route'

export const categoryRoutes = Route.group(() => {
  Route.get('/', 'CategoriesController.index').middleware('admin')
  Route.get('/users', 'CategoriesController.findAllByUser')
  Route.post('/', 'CategoriesController.store').middleware('subscriber')
}).prefix('categories')
