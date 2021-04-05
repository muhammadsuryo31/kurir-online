require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routers/main-router')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", routes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})