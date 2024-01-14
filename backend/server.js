require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/workouts')
const cors = require("cors");
const app = express()

// middleware
// const corsOptions = {
//     origin: "http://localhost:3000" // frontend URI (ReactJS)
// }
app.use(express.json());
app.use(cors());


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', routes)

const port = process.env.PORT || 3001

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(port, () => {
            console.log('connected to db & listening on port 4000')
        })
    })
    .catch((err) => console.log(err))
