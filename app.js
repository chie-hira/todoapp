const express = require('express')
const app = express()
const port = 3000
const tasksRouter = require('./routes/tasks')

// ルーティング設計
app.use('/api/v1/tasks', tasksRouter)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
} )
