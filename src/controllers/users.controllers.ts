import { Request, Response } from 'express'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = async (req: Request, res: Response) => {
  //lấy user id từ user của request
  //dùng user_id tạo access_token và refresh_token
  // res access_token và refrest_token
  const { user }: any = req // lấy user từ req
  const user_id = user._id // lấy _id từ user
  const result = await userService.login(user_id.toString())
  //login nhận vào user_id:string, nhưng user_id ta có
  //là objectid trên mongodb, nên phải toString()
  //trả ra kết quả, thiếu cái này là sending hoài luôn
  res.json({
    message: 'Login success',
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await userService.register(req.body)
  return res.status(201).json({
    message: 'register successfully',
    result
  })
}
