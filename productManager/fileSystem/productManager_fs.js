const fs = require('fs')

class ProductManager {
    constructor(fileName){
        this.fileName = fileName
        this.format = 'utf-8'
    }

     generateID = async () => {
        const data = await this.getProduct()
        const count = data.length

        if (count == 0) return 1;

        const lastProduct = data[count - 1]
        const lastID = lastProduct.id
        const nextID = lastID + 1

        return nextID
    }


    addProduct = async (title, description, price, thumbnail, stock, code) => {
        const id = await this.generateID()

        return this.getProduct()
            .then(products => {
                products.push({id, title, description, price, thumbnail, stock, code})
                return products
            })
            .then(productsNew => fs.promises.writeFile(this.fileName, JSON.stringify(productsNew)))
}

    getProductById = async (id) => {
        const data = await this.getProduct()
        const productFound = data.find(product => product.id === id)
        return productFound || console.log(`ERROR: EL PRODUCTO CON EL ID "${id}" NO EXISTE.`);
    }

    getProduct = async () => {
        const product = fs.promises.readFile(this.fileName, this.format)
        return product
            .then(content => JSON.parse(content))
            .catch(e => {if(e) return []})
    }

    deleteProduct = async (id) => {
        const data = await this.getProduct()
        const toBeDeleted = data.find(product => product.id === id)

        if(toBeDeleted){
            const index = data.indexOf(toBeDeleted)
            data.splice(index, 1);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data))
            console.log(`\nPRODUCTO ELIMINADO: ID "${id}".`);
        } else {
            console.log(`\n\nERROR AL ELIMINAR PRODUCTO: EL PRODUCTO CON EL ID "${id}" NO SE ENCUENTRA EN LA LISTA.`);
        }
    }

    updateProduct = async (id, field, newValue) => {
        const data = await this.getProduct()
        const toBeUpdated = data.find(product => product.id === id)

        toBeUpdated[field] = newValue;
        
        await fs.promises.writeFile(this.fileName, JSON.stringify(data))
    }
}



async function run(){
    const manager = new ProductManager('./products.json')
    await manager.addProduct('producto 1', 'descripción 1', 1500, 'N/A', 10, 'abc123')
    await manager.addProduct('producto 2', 'descripción 2', 2500, 'N/A', 20, 'abc456')
    await manager.addProduct('producto 3', 'descripción 3', 3500, 'N/A', 30, 'abc789')
    await manager.addProduct('producto 4', 'descripción 4', 4500, 'N/A', 40, 'def123')
    await manager.addProduct('producto 5', 'descripción 5', 5500, 'N/A', 50, 'def456')
    await manager.addProduct('producto 6', 'descripción 6', 6500, 'N/A', 60, 'def789')
    await manager.addProduct('producto 7', 'descripción 7', 7500, 'N/A', 70, 'ghi123')
    await manager.addProduct('producto 8', 'descripción 8', 8500, 'N/A', 80, 'ghi456')
    await manager.addProduct('producto 9', 'descripción 9', 9500, 'N/A', 90, 'ghi789')
    await manager.addProduct('producto 10', 'descripción 10', 10500, 'N/A', 100, 'jkl123')
    await manager.deleteProduct(2);

    await manager.updateProduct(4, "title", "PRODUCTO ACTUALIZADO")
    await manager.updateProduct(4, "stock", 150)

    console.log("---------------------------------\nPRODUCTOS AGREGADOS:");
    console.log(await manager.getProduct());
    console.log("---------------------------------\nPRODUCTO SELECCIONADO:");
    console.log(await manager.getProductById(3));
    console.log("---------------------------------")
    console.log(await manager.getProductById(50));
}

run()
