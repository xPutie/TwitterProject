import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHangler } from './middlewares/error.middlewares'

const app = express()
const PORT = 3000
databaseService.connect()

app.use(express.json())
//route mặc định localhost:3000/
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/users', usersRouter)
// localhost:3000/users/tweets

app.use(defaultErrorHangler)

app.listen(PORT, () => {
  console.log(`Server này đang chay trên port ${PORT}`)
})
