import express from 'express'
import ProductManager from './ProductManager.js';

const app = express()
const productManager = new ProductManager('./productos.json');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts()

    res.json({ products })
});

app.post('/products', async (req, res) => {
    const obj = req.body
    console.log('Informacion',obj);
    const newProduct = await productManager.createProduct(obj)
    res.json({ message: 'Producto creado', product: newProduct})
});

app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});