import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const PORT = 8080
const app = express()
app.use(express.json())

app.use('/static', express.static('public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.use('/', (req, res) => res.send('HOME'))

app.listen(PORT, function(err){
    err ? console.log('Error in server setup') : console.log(`Server listening on PORT: ${PORT}`)
})