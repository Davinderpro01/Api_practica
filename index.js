const express = require('express');
const app = express();

app.use(express.json());

const clientes =[
    {id:1, name: 'Devin', age: 20, enroll: true},
    {id:1, name: 'David', age: 30, enroll: true},
    {id:1, name: 'Jennifer', age: 40, enroll: false},
];

app.get('/', (req,res)=> {
    res.send('Node JS api');
});

app.get('/api/clientes', (req,res)=> {
    res.send(clientes);
});

app.get('/api/clientes/:id', (req,res)=> {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    else res.send(cliente);
});

app.post('/api/clientes', (req,res)=> {
    const cliente = {
        id: clientes.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    clientes.push(cliente);
    res.send(cliente);
});

app.delete('/api/clientes/:id', (req,res)=> {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('Cliente no encontrado');
    
    const index = clientes.indexOf(cliente);
    clientes.splice(index, 1);
    res.send(cliente);
});

const port = process.env.port || 80;
app.listen(port, () => console.log({port}));