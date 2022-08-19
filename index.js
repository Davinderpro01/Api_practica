const express = require('express');
const app = express();

app.use(express.json());

const clientes =[
    {id:1, nombre: 'Devin', edad: 20, ciudad: 'Jalapa'},
    {id:2, nombre: 'David', edad: 30, ciudad: 'Chimaltenango'},
    {id:3, nombre: 'Jennifer', edad: 40, ciudad:'Jalapa'},
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
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        ciudad: req.body.ciudad,
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