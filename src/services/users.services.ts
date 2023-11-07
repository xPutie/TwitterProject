import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/User.requests'
import { hashPassword } from '~/utils/crypto'
import { TokenType } from '~/constants/enums'
import { signToken } from '~/utils/jwt'

class UserService {
  private signAccessToken(user_Id: string) {
    return signToken({
      payload: { user_Id, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN }
    })
  }
  private signRefreshToken(user_Id: string) {
    return signToken({
      payload: { user_Id, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN }
    })
  }
  // ký access_token và refresh_token
  private signAccessAndRefreshToken(user_Id: string) {
    return Promise.all([this.signAccessToken(user_Id), this.signRefreshToken(user_Id)])
  }
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
    const user_id = result.insertedId.toString()
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)
    return { access_token, refresh_token }
  }
  async login(user_id: string) {
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)
    return { access_token, refresh_token }
  }
  async checkEmailExist(email: string) {
    //vào database tìm xem có hông
    const user = await databaseService.users.findOne({ email })
    return Boolean(user) //có true, k false
  }
}

const userService = new UserService()
export default userService
