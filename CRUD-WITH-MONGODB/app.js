const express = require('express');
const blogRouter = require("./routes/BlogRoutes");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use("/api/blogs", blogRouter);

app.listen(3001, () => {
    console.log("server is running on port 3001");
});

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/CRUD",
    {
        
    }
).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

module.exports = app;
