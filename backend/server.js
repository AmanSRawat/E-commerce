import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Product from './Models/product.js'

mongoose.connect("mongodb://127.0.0.1/ECommerce")
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

const app = express()
const PORT = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/create', async (req, res) => {
    try {
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).json({ status: 'true', message: 'Product created successfully' })   
    } catch (error) {
        res.status(500).json({ status: 'false', message: 'Failed to create product', error: error.message })
    }
})

app.get('/products', async (req, res) => {
    const productList = await Product.find()
    res.send(JSON.stringify(productList))   
})

app.put('/update/:id', async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id,{
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        rating: req.body.rating,
        stock: req.body.stock,
        brand: req.body.brand,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
        images: req.body.images,
    })
    res.send('Product updated successfully')
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    await   Product.findByIdAndDelete(id)
    res.send('Product deleted successfully')
})


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})