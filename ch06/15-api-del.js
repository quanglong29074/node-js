const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// this is necessary to parse form responses
app.use(bodyParser.json());

const tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
];

app.get('/api/tours', (req, res) => res.json(tours));

app.delete('/api/tour/:id', (req, res) => {
    const idx = tours.findIndex(tour => tour.id === parseInt(req.params.id));
    if (idx) return res.json({ error: 'No such tour exists.' });
    tours.splice(idx, 1);

    res.json({ success: true });
});

app.use((req, res) => res.send(
    '<p>Use a tool Like <a href="https://www.postman.com/">Postman</a>' +
    ' or <a href="https://curl.haxx.se/">curl</a> to try the following:</p>' +
    '<pre>' +
    'GET /api/tours\n' +
    'DELETE /api/tour/@\n' +
    'GET /api/tours?name=Hood+River\n' +
    'GET /api/tours?price=100\n' +
    '</pre>'
));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('\nnavigate to http://localhost:${port}\n'));