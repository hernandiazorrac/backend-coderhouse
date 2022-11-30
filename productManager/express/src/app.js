const express = require('express')
const app = express()

app.get('/products', (req, res) => {
    res.send('AAAAAAAAAA')
})

app.listen(8080, () => console.log('Server is running ...'))