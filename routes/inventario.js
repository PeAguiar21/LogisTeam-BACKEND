const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./db/database.sqlite')

router.post('/', (req, res) => {
    const { id, produtoNome, fornecedorNome, quantidade, tipo, dataCadastro, novaQuantidade } = req.body;
    if (novaQuantidade === undefined || novaQuantidade === null) {
        return res.status(400).json({ message: 'novaQuantidade é obrigatória!' });
    }
    db.run(
        `INSERT INTO inventario (id, produtoNome, fornecedorNome, quantidade, tipo, dataCadastro) VALUES (? ,?, ?, ?, ?, ?)`,
        [id, produtoNome, fornecedorNome, quantidade, tipo, dataCadastro],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            db.run(
                `UPDATE Produtos SET quantidade = ? WHERE nome = ?`,
                [novaQuantidade, produtoNome],
                function (err) {
                    if (err) {
                        return res.status(500).json({ error: 'Erro ao atualizar o estoque do produto' });
                    }
                    if (this.changes === 0) {
                        return res.status(404).json({ message: 'Produto não encontrado para atualização' });
                    }

                    res.status(201).json({
                        id: id,
                        produtoNome,
                        fornecedorNome,
                        quantidade,
                        tipo,
                        dataCadastro,
                        novaQuantidade,
                    });
                }
            );
        }
    );
});

router.get('/', (req, res) => {
    db.all(`SELECT * FROM inventario`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

router.get('/getEstoque/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM inventario WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Inventário não encontrado' });
        }
        res.status(200).json(row);
    });
});

router.get('/getUltimoRegistro', (req, res) => {
    const db = new sqlite3.Database('./db/database.sqlite');
    db.get('SELECT id FROM inventario ORDER BY id DESC LIMIT 1', (err, row) => {
        db.close();
        if (err) {
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (row) {
            return res.json({ ultimoCodigo: row.id + 1 });
        } else {
            return res.json({ ultimoCodigo: 1 });
        }
    });
});

router.put('/atualizaEstoqueProduto/:id', (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;

    const db = new sqlite3.Database('./db/database.sqlite');
    db.run(
        `UPDATE Produtos SET quantidade = ?
        WHERE id = ?`,
        [quantidade, id],
        function (err) {
            db.close();
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.status(200).json({ message: 'Produto atualizado com sucesso' });
        }
    );
});

module.exports = router;