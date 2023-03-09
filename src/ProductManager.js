import fs from 'fs'

export default class ProductManager {
    constructor(path){
        this.path = path
    }

    async getProducts(){
        if (fs.existsSync(this.path)) {
            const products = await fs.promises.readFile(this.path,'utf-8')
            return JSON.parse(products)
        } else {
            console.log('Producto no existe');
            return []
        }
    }

    async createProducts(obj){
        const productsFile = await this.getProducts()
        const id = this.#createId(productsFile)
        const newProducto = { id, ...obj }
        productsFile.push(newProducto)
        await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
        return newProducto
    }

    #createId(products){
        let id
        if (products.length === 0){
            id = 1
        } else {
            id = products[products.length - 1].id + 1
        }
        return id
    }
}