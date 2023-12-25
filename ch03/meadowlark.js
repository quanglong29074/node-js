const express = require('express');
const expressHandlebars = require('express-handlebars').engine;
const app = express();
const fortune = require('./lib/fortune.js');

// Cấu hình Handlebars view engine
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
    res.render('about', { fortune: fortune.getFortune(), title: 'about' });
});

// Trang 404 tùy chỉnh
app.use((req, res) => {
    res.status(404);
    res.send('404 - Không tìm thấy từ LVM');
});

// Trang 500 tùy chỉnh
app.use((err, req, res, next) => {
    console.error(err.message);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Lỗi máy chủ');
});

app.listen(port, () => console.log(
    `Express đã bắt đầu tại http://localhost:${port}; ` +
    `nhấn Ctrl-C để dừng`
));
