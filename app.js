
const express = require ('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDb = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())
app.use(express.static('./public'))

//route


app.use('/api/v1/tasks', tasks)

app.use(notFound)

app.use(errorHandlerMiddleware)


const port = 3000

const start = async() => {
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`SERVER IS LISTENING TO ${port}`))

    }catch(error){
        console.log(error)

    }
}
start()

