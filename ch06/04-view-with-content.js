const express = require('express')
const expressHandlebars = require('express-handlebars').engine;
const cookieParser = require('cookie-parser')
const session = require('express-session')
const catNames = require('cat-names')
const app = express()


//configure Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultlayout: 'custom'
}))
app.set('view engine', 'handlebars')

app.use(cookieParser())

app.use(session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' }))


app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello esteemed programmer!',
        style: req.query.style,
        userid: req.cookies.userid,
        username: req.session.username
    })
})

app.get('/set-random-userid', (req, res) => {
    res.cookie('userid', (Math.random() * 1000).toFixed(0))
    res.redirect('/greeting')
})
app.get('/set-random-username', (req, res) => {
    req.session.username = catNames.random()
    res.redirect('/greeting')
})

app.get('/', (req, res) => res.send('Check out our "<a href="/greeting">greeting</a>"page!'))





const port = process.env.port || 3000
app.listen(port, () => console.log(
    `\nnaviagte ti http://localhost:${port}/about\n`
))