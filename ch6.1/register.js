const express = require('express')
const expressHandlebars = require('express-handlebars').engine
const bodyParser = require('body-parser')
const app = express()

app.engine('handlebars', expressHandlebars({ defaultLayput: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/thank-you', (req, res) => res.render('thank-you'))

app.get('*', (req, res) => res.render('register'))

app.post('/process-contact', (req, res) => {
    console.log(`received contact form ${req.body.fullName} <${req.body.email}> with password ${req.body.password}`);
    res.redirect(303, '/thank-you')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`))