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


    validateFields = (title, description, price, thumbnail, stock, code) =>{
        if((title == undefined || title == "") || (description == undefined || description == "") || (price == undefined ||price == "") || (thumbnail== undefined || thumbnail== "") || (code == undefined) || (stock == undefined || stock == "")){
            console.log("ERROR AL AGREGAR PRODUCTO: TODOS LOS CAMPOS SON OBLIGATORIOS")
            return false;
        }else{
            return true;
        }
    }

    duplicateCode = (code) => { 
        const product = this.products.find(product => product.code === code)
        if(product == undefined){
            return true;
        } else if(product != undefined){ 
            console.log(`ERROR: EL CÓDIGO "${code}" NO PUEDE REPETIRSE`);
            return false;
        }
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
        

        if(this.duplicateCode(code) && this.validateFields(title, description, price, thumbnail, stock, code)){
            this.products.push(product)
        }
    }


    getProductByID = (id) => {
        const productFound = this.products.find(product => product.id === id)
        return productFound || console.log(`ERROR: EL PRODUCTO CON EL ID ${id} NO EXISTE`)
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

//este producto no se agrega porque le falta el título
manager.addProduct(
    "descripción 4",
    12345,
    "N/A",
    35,
    "jkl123"
)

//este producto no se agrega por tener el valor "code" repetido y dará error en la consola
manager.addProduct(
    "producto 3",
    "descripción 3",
    123,
    "N/A",
    35,
    "ghi789"
)

console.log(manager.getProducts()); //muestra el array con los productos ya agregados

console.log("----------------------------")
console.log("PRODUTO SELECCIONADO:", manager.getProductByID(2)); //devuelve el producto con ID 2
console.log("----------------------------")
console.log(manager.getProductByID(6)); //devuelve error ya que no existe producto con ese ID