const express = require('express')

// Init & middleware
const app = express()

// Use local port 3000
app.listen(3000, () => {
    console.log('*** Listening to Port: 3000 ***')
})

// Routes ( GET )
app.get('/books', (req, res) => {
    res.json({ mssg: "*** API is now working ***" })
})