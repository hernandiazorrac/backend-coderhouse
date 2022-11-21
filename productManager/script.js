class ProductManager {
    constructor(){
        this.products = []
    }

    //recuperar productos
    getProducts = () => { return this.products }

    //generar ID del producto incrementando +1 por cada producto nuevo
    generateID = () => {
        const count = this.products.length

        if (count == 0) return 1;

        const lastProduct = this.products[count - 1]
        const lastID = lastProduct.id
        const nextID = lastID + 1

        return nextID
    }

    //añadir producto
    addProduct = (title, description, price, thumbnail, stock, code) => {
        const id = this.generateID()

        const product = {
            id,
            title,  
            description,
            price,
            thumbnail,
            stock,
            code
        }

        //verifica que no haya codes repetidos, si se repite no agrega el producto        
        const duplicateCode = this.products.some(product => product.code === code)

        if(!duplicateCode){
            this.products.push(product)
        }
    }


    getProductByID = (id) => {
        const productFound = this.products.find(product => product.id === id)
        return productFound || console.log("ERROR: PRODUCT NOT FOUND")
    }
}

const manager = new ProductManager()

console.log(manager.getProducts()); //muestra el array sin productos

//productos a agregar
manager.addProduct(
    "producto 1",
    "descripción 1",
    14000,
    "N/A",
    5,
    "abc123"
)

manager.addProduct(
    "producto 2",
    "descripción 2",
    666,
    "N/A",
    3,
    "def456"
)

manager.addProduct(
    "producto 3",
    "descripción 3",
    123,
    "N/A",
    35,
    "ghi789"
)

//este producto no se agrega por tener el valor "code" repetido
manager.addProduct(
    "producto 3",
    "descripción 3",
    123,
    "N/A",
    35,
    "ghi789"
)

console.log(manager.getProducts()); //muestra el array con los productos ya agregados

manager.getProductByID(9); //devuelve error ya que no existe producto con id 9