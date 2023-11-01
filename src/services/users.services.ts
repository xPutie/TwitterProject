import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/utils/crypto'

class UserService {
  async register(payload: RegisterReqBody) {
    const { email, password } = payload
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        //vì User.schema.ts có date_of_birth là Date
        //nhưng mà người dùng gửi lên payload là string
        password: hashPassword(payload.password)
      })
    )
    return result
  }
  async checkEmailExist(email: string) {
    //vào database tìm xem có hông
    const user = await databaseService.users.findOne({ email })
    return Boolean(user) //có true, k false
  }
}

const userService = new UserService()
export default userService
