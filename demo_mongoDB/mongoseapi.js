const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = 3000;

// ket noi voi co so du lieu
mongoose.connect('mongodb://localhost:27017/t2210a');

// dinh nghia schema 
const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String, date: Date}],
    date: { type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number,
    } 
})

const Blog = mongoose.model('Blog', BlogSchema);
// cau hinh bodyParser
app.use(bodyParser.json());

// route getall
app.get('/api/blogs', async (req, res)=> {
    try {
        const blogs = await Blog.find()
        res.json(blogs);
    } catch(error){
        res.status(500).json({error: error.message});
    }
});

//route find blog by id
app.get('api/blogs/:id', async (req, res)=> {
    try {
      const blog = await Blog.findById(req.params.id);
      if(!product){
        return res.status(404).json({error: 'Not Found'})
      }
      res.json(product);
    } catch(error){
      res.status(500).json({error: error.message});
    }
});
// Route cmt
app.post('/api/blogs', async (req, res) => {
    const {title,author,body,comments,date,hidden,meta} = req.body;
  try {
    const newBlog= new Blog({title,author,body,comments,date,hidden,meta});
    const savedBlog = await newBlog.save();
     res.json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route để cập nhật Blog
app.put('/api/blogs/:id', async (req, res) => {
    const {title,author,body,comments,date,hidden,meta} = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title,author,body,comments,date,hidden,meta },
    { new: true }
    );
    if (!updatedBlog) {
        return res.status(404).json({ error: 'Not Found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route để xóa Blog theo id
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const deleteBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deleteBlog) {
        return res.status(404).json({ error: 'Not Found' });
     
    }

    res.json(deleteBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
