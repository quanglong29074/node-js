const express = require('express')
const expressHandlebars = require('express-handlebars').engine;
const app = express()

// app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('*', (req, res) => res.send('Check out our "<a href="/about">About</a> page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/about\n`))