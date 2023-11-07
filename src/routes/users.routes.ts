import { log } from 'console'
import { Router } from 'express'
import { register } from 'module'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router()

/*
des: đăng nhập
path: /users/register
method: POST
body: {email, password}
*/
usersRouter.get('/login', loginValidator, loginController)
usersRouter.post('/register', registerValidator, wrapAsync(registerController))
export default usersRouter
