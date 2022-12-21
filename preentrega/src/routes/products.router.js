import { Router } from 'express'
import FileManager from '../manager/fileManager.js'

const fileManager = new FileManager('productos.json')
const router = Router()


router.get('/', async (req, res) => {
    const products = await fileManager.get()
    res.json({products})
})

router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const product = await fileManager.getById(id)
    res.json({product})
})

router.post('/', async (req, res) => {
    const product = req.body
    const productAdded = await fileManager.add(product)

    res.json({ status: 'success', productAdded })
})

router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const productToBeUpdated = req.body

    const product = await fileManager.getById(id)
    if(!product) return res.status(404).send('Product not found')

    for (const key of Object.keys(productToBeUpdated)){
        product[key] = productToBeUpdated[key]
    }

    await fileManager.update(id, product)
    res.json({status: "success", product})
})

router.delete('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    await fileManager.delete(id)

    res.json({status: 'success'})
})

export default router