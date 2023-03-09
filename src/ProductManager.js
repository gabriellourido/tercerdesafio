const fs = require('fs')

const path = './Productos.json'

class ProductManager {
    constructor(path){
        this.path = path
    }
    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const products = await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(products)
        } else {
            console.log('Archivo no existe');
            return []
        }
    }

    addProducts = async (usuario) => {
        const productos = await this.getProducts()
        let id
        if (productos.length === 0){
            id = 1
        } else {
            id = productos[productos.length - 1].id + 1
        }
        const nuevoProducto = { id, ...usuario }
        productos.push(nuevoProducto)
        await fs.promises.writeFile(this.path, JSON.stringify(productos))
        return nuevoProducto
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find((product) => product.id === id);
        if (!product) {
            return null;
        }
        return product;
    }
}

const producto1 = {
    title: 'Producto1',
    description: 'Descripción1',
    price: 100,
    thumbnail: 'imagen1',
    code: 'abc123',
    stock: 5,
    id: 1
}

const producto2 = {
    title: 'Producto2',
    description: 'Descripción2',
    price: 50,
    thumbnail: 'imagen2',
    code: 'abc123',
    stock: 3,
    id: 2
}


async function prueba() {
    const manager = new ProductManager('./productos.json')
    await manager.addProducts(producto1)
    const productos = await manager.getProducts()
    console.log(productos);
}

prueba()