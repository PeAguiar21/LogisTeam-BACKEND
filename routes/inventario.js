const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./db/database.sqlite')

router.post('/', (req, res) => {
    const { produtoNome, fornecedorNome, quantity, tipo } = req.body;
    db.run(
        `INSERT INTO inventario (produtoNome, fornecedorNome, quantity, tipo) VALUES (?, ?, ?, ?)`,
        [produtoNome, fornecedorNome, quantity, tipo],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID, produtoNome, fornecedorNome, quantity, tipo });
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

router.get('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { produtoNome, fornecedorNome, quantity, tipo } = req.body;
    db.run(
        `UPDATE inventario SET produtoNome = ?, fornecedorNome = ?, quantity = ?, tipo = ? WHERE id = ?`,
        [produtoNome, fornecedorNome, quantity, tipo, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Inventário não encontrado' });
            }
            res.status(200).json({ message: 'Inventário atualizado com sucesso' });
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM inventario WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Inventário não encontrado' });
        }
        res.status(200).json({ message: 'Inventário deletado com sucesso' });
    });
});

module.exports = router;