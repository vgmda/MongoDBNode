const express = require('express')
const { connectToDb, getDb } = require('./db')
const { ObjectId } = require('mongodb')

// Init & Middleware
const app = express()
app.use(express.json())

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
    let books = []

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
            res.status(500).json({ error: 'Could not fetch the documents' })
        })
})

app.get('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .findOne({ _id: ObjectId(req.params.id) })
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch the document' })
            })
    }
    else {
        res.status(500).json({ error: 'Not a valid document _id' })
    }
})

app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ err: 'Could not create a new document' })
        })
})


app.delete('/books/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not delete the document' })
            })
    }
    else {
        res.status(500).json({ error: 'Not a valid document _id' })
    }
})

app.patch('/books/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {
        db.collection('books')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document' })
            })
    }
    else {
        res.status(500).json({ error: 'Not a valid document _id' })
    }
})