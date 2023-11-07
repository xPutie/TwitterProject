import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'

export const defaultErrorHangler = (err: any, req: Request, res: Response, next: NextFunction) => {
  //lỗi từ các nơi sẽ dồn về đây
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
