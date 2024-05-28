const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

// CREATE a new user
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

// READ all users
app.get('/users', (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id',(req,res) => {
    const user = users.find(u => u.id === parseInt(req.param.id));
    if(!user) return res.status(404).send('user not found');
    res.status(200).send(user);
})

// UPDATE a user by id
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    user.email = req.body.email;
    res.status(200).send(user);
});

// DELETE a user by id
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(200).send({ message: 'User deleted' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
