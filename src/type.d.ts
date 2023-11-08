import { Request } from 'express'

declare module 'express' {
  interface Request {
    user?: User //trong 1 req có thể có hoặc không có user
  }
}
