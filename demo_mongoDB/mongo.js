// Import thư viện cần thiết
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Khởi tạo Express app
const app = express();
const port = 3000;


// Kết nối với cơ sở dữ liệu
mongoose.connect('mongodb://localhost:27017/products');


// Định nghĩa schema cho sản phẩm
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  qty: Number,
});

// Tạo model sản phẩm
const Product = mongoose.model('Product', ProductSchema);

// Cấu hình bodyParser
app.use(bodyParser.json());

// Định nghĩa các route

// Route để lấy tất cả sản phẩm
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route để lấy sản phẩm theo ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route để tạo sản phẩm mới
app.post('/api/products', async (req, res) => {
    const {name, price, qty } = req.body;
  try {
    const newProduct = new Product({ name, price, qty});
    const savedProduct = await newProduct.save();
     res.json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route để cập nhật sản phẩm theo ID
app.put('/api/products/:id', async (req, res) => {
    const { name, price, qty } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, qty },
    { new: true }
    );
    if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route để xóa sản phẩm theo ID
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
        return res.status(404).json({ error: 'Product not found' });
     
    }

    res.json(deleteProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
