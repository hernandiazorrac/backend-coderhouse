import fs from 'fs'

class CartManager {
    constructor(fileName){
        this.fileName = fileName
        this.format = 'utf-8'
    }

    read = () => {
        if (fs.existsSync(this.fileName)){
            return fs.promises.readFile(this.fileName, this.format)
                .then(data => JSON.parse(data))
                .catch(e => {if(e) return []})
        }
    }

    write = list => {
        return fs.promises.writeFile(this.fileName, JSON.stringify(list))
    }

    generateID = list => {
        const count = list.length
        return (count > 0) ? list[count-1].id + Number(1) : 1
    }


    create = async () => {
        const carts = await this.read()
        const generateID = this.generateID(carts)
        
       const newCart = {
            id: generateID,
            products: []
        }

        carts.push(newCart)

        await this.write(carts)
        return newCart
    }

    update = async (id, obj) => {
        obj.id = id
        const list = await this.read()
        
        for(let i = 0; i < list.length; i++){
            if(list[i].id == id){
                list[i] = obj
                break
            }
        }
        await this.write(list)
    }

    addToCart = async (cartID, productID) => {
        const cart = await this.getById(cartID)
        
        let found = false

        for (let i = 0; i < cart.products.length; i++){
            if(cart.products[i].id == productID){
                
                cart.products[i].quantity++
                found = true
                break
            }
        }

        if(!found){
            cart.products.push({id: productID, quantity: 1})
        }

        await this.update(cartID, cart)
        return cart
    }
    
    getById = async (id) => {
        const data = await this.read()
        return data.find(product => product.id == id)
    }

    get = async () => {
        const data = await this.read()
        return data
    }

    
}

export default CartManager
