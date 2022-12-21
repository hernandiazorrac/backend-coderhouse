import { Router } from 'express'
import CartManager from '../manager/cartManager.js'

const cartManager = new CartManager('carrito.json')
const router = Router()


router.get('/', async (req, res) => {
    const carts = await cartManager.get()
    res.json({carts})
})

router.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const cart = await cartManager.getById(id)
    res.json({cart})
})

router.post('/', async (req, res) => {
    const cartCreated = await cartManager.create()

    res.json({ status: 'success', cartCreated })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cartID = parseInt(req.params.cid)
    const productID = parseInt(req.params.pid)

    const cart = await cartManager.addToCart(cartID, productID)

    res.json({status: "success", cart})
})

export default router