import { authRoutes } from './routes/authRoutes'
import { userRoutes } from './routes/userRoutes'
import { categoryRoutes } from './routes/categoryRoutes'
import { geekItemRoutes } from './routes/geekItemRoutes'

//rotas públicas
authRoutes.prefix('api')

//rotas privadas
userRoutes.prefix('api').middleware('auth:api')
categoryRoutes.prefix('api').middleware('auth:api')
geekItemRoutes.prefix('api').middleware('auth:api')
