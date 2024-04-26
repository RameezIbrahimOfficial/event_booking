const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHanlder');
const authRouter = require('./routes/Auth');
const eventRouter = require('./routes/Event');


const app = express();

const PORT = process.env.PORT

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRouter)

app.use('/api/event', eventRouter)

app.use(errorHandler)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Mongoose Connected')
        app.listen(PORT, () => {
            console.log(`Server Started htttp://localhost:` + PORT);
        })
    })
    .catch(console.error)
