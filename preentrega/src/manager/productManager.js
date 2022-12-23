import fs from "fs";

class FileManager {
  constructor(fileName) {
    this.fileName = fileName;
    this.format = "utf-8";
  }

  read = () => {
    if (fs.existsSync(this.fileName)) {
      return fs.promises
        .readFile(this.fileName, this.format)
        .then((data) => JSON.parse(data))
        .catch((e) => {
          if (e) return [];
        });
    }
  };

  write = (list) => {
    return fs.promises.writeFile(this.fileName, JSON.stringify(list));
  };

  generateID = (list) => {
    const count = list.length;
    return count > 0 ? list[count - 1].id + Number(1) : 1;
  };

  validateFields = (title, price, description, code, stock, category) => {
    if((title == undefined || title == "") || (description == undefined || description == "") || (price == undefined ||price == "") || (stock== undefined || stock== "") || (code == undefined || code == "") || (category == undefined || category == "")){
        console.log("ERROR AL AGREGAR PRODUCTO: TODOS LOS CAMPOS SON OBLIGATORIOS")
        return false;
    }else{
        return true;
    }
  }

  duplicateCode = async (code) => {
    const data = await this.read()
    const product = data.find(p => p.code === code)

    if(product == undefined){
        return true
    }else if(product != undefined){
        console.log(`ERROR: EL CÓDIGO "${code}" NO PUEDE REPETIRSE`);
    }
  }

  add = async (id, title, price, description, code, stock, category) => {
    const list = await this.read();
    const generateID = this.generateID(list);
    id = generateID;
    

    const newProduct = {
      id: id,
      title,
      price,
      description,
      thumbnail: [],
      code,
      stock,
      category,
      status: true,
    };

    if(this.validateFields(newProduct.title, newProduct.price, newProduct.description, newProduct.code, newProduct.stock, newProduct.category)){
        list.push(newProduct)
    }

    await this.write(list);

    return list;
  };

  getById = async (id) => {
    const data = await this.read();
    return data.find((product) => product.id == id);
  };

  get = async () => {
    const data = await this.read();
    return data;
  };

  delete = async (id) => {
    const data = await this.read();
    const toBeDeleted = data.find((product) => product.id === id);

    if (toBeDeleted) {
      const index = data.indexOf(toBeDeleted);
      data.splice(index, 1);
      await fs.promises.writeFile(this.fileName, JSON.stringify(data));
      console.log(`\nPRODUCTO ELIMINADO: ID "${id}".`);
      return;
    }
  };

  update = async (id, obj) => {
    obj.id = id;
    const list = await this.read();

    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list[i] = obj;
        break;
      }
    }
    await this.write(list);
  };
}

export default FileManager;
