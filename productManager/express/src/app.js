const express = require('express')
const fs = require('fs')
const fileName = "../productManager/fileSystem/products.json"
const format = "utf-8"
const products = fs.readFileSync(fileName, format)

const app = express()

app.get('/products', (req, res) => res.send(products))
app.get('/products/:pid', (req, res) => {
    const productID = req.params.pid 
    const parsedProducts = JSON.parse(products)
    const product = parsedProducts.find(product => product.id == productID)
    
    if(!product) res.send(`<h2>Error: Product not found.</h2>`)
    else res.send(product)
})

app.listen(8080, () => console.log('Server is running ...'))