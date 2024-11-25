const express = require('express');
const cors = require('cors');
const fornecedoresRoutes = require('./routes/fornecedores');
const inventarioRoutes = require('./routes/inventario');
const produtosRoutes = require('./routes/produtos');

const app = express();
const PORT = 3322;

app.use(cors());

app.use(express.json());

app.use('/fornecedores', fornecedoresRoutes);
app.use('/inventario', inventarioRoutes);
app.use('/produtos', produtosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
