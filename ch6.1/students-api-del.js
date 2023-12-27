const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const students = [
    { id: 1, name: 'Nguyen Van A', email: 'vana@example.com', phone: '123456789', gpa: 3.5, status: 'Active' },
    { id: 2, name: 'Tran Thi B', email: 'thib@example.com', phone: '0987654321', gpa: 3.2, status: 'Inactive' },
];

app.get('/api/students', (req, res) => res.json(students));

app.put('/api/student/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).json({ error: 'No such student exists' });

    if (req.body.name) student.name = req.body.name;
    if (req.body.email) student.email = req.body.email;
    if (req.body.phone) student.phone = req.body.phone;
    if (req.body.gpa) student.gpa = req.body.gpa;
    if (req.body.status) student.status = req.body.status;

    res.json({ success: true, student });
});

app.delete('/api/student/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(student => student.id === studentId);

    if (index !== -1) {
        students.splice(index, 1);
        res.json({ success: true, message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ error: 'No such student exists' });
    }
});

app.use('*', (req, res) => res.send(
    `<p>Use a tool like <a href="https://www.getpostman.com">Postman</a>` +
    ` or <a href="https://curl.haxx.se/">curl</a> to try the following:</p>` +
    `<pre>` +
    `GET /api/students\n` +
    `PUT /api/student/1\n` +
    `  with body: { "name": "Updated Name", "email": "updated@example.com", "phone": "987654321", "gpa": 4.0, "status": "Active" }\n` +
    `DELETE /api/student/1\n` +
    `GET /api/students`
));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}\n`));
