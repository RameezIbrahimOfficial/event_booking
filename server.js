const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan');
const { registerUser, loginUser } = require('./controllers/authController');
const { getEvents, getEvent, createEvent, registerEvent, getUserEvent } = require('./controllers/eventController');
const {protect} = require('./middleware/authMiddleware')
const errorHandler = require('./middleware/errorHanlder');
const authRouter = require('./routes/Auth');
const eventRouter = require('./routes/Event');
// import authRouter from "./routes/Auth";


const app = express();

const PORT = process.env.PORT

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRouter)

app.use('/api/event', eventRouter)

// app.get('/api/events', protect, getEvents);
// app.get('/api/event/:eventId', protect, getEvent)
// app.post('/api/event/:eventId', protect, registerEvent)
// app.get('/api/event/me', protect, getUserEvent)
// app.post('/api/event', protect, createEvent)


app.use(errorHandler)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        console.log('Mongoose Connected')
        app.listen(PORT, () => {
            console.log(`Server Started htttp://localhost:` + PORT);
        })
    })
    .catch(console.error)
