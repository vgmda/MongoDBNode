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

    // Empty array to store all the returned books
    let book = []

    // find() returns a cursor 
    // Next step is to fetch the cursor (data) using toArray or forEach
    // forEach is used to push the books to an array
    // forEach is async, needs time to finish, when finished then() is executed next
    // .json will display the books array in a json format

    db.collection('books')
        .find()
        .sort({ title: 1 })
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: "Could not fetch the documents" })
        })

    res.json({ mssg: "*** API is now working ***" })
})

