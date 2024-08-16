const express = require('express')
const app = express()
const port = 3000
const tasksRouter = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
app.use(express.json()) // JSONデータを受け取るためのミドルウェア

// ルーティング設計
app.use('/api/v1/tasks', tasksRouter)

// データベース接続
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`App is running on http://localhost:${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
