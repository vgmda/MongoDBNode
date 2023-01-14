const express = require('express')
const { connectToDb, getDb } = require('./db')

// Init & middleware
const app = express()

// Connect to Db
let db

connectToDb((err) => {
    if (!err) {
        // Use local port 3000
        app.listen(3000, () => {
            console.log('*** Listening to Port: 3000 ***')
        })
        db = getDb()
    }
})



// Routes ( GET )
app.get('/books', (req, res) => {
    res.json({ mssg: "*** API is now working ***" })
})