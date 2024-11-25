const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const db = new sqlite3.Database('./db/database.sqlite');

router.post('/', (req, res) => {
    const { id, nome, codigoDeBarras, preco, categoria, quantidade, descricaoTecnica } = req.body;

    db.run(
        `INSERT INTO Produtos (id, nome, codigoDeBarras, preco, categoria, quantidade, descricaoTecnica) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, nome, codigoDeBarras, preco, categoria, quantidade || 0, descricaoTecnica],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'ID já existe. Forneça um ID único.' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                id,
                nome,
                codigoDeBarras,
                preco,
                categoria,
                quantidade,
                descricaoTecnica,
            });
        }
    );
});

router.get('/', (req, res) => {
    db.all(`SELECT * FROM Produtos`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM Produtos WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(row);
    });
});

router.get('/ultimo', (req, res) => {
    db.get('SELECT id FROM Produtos ORDER BY id DESC LIMIT 1', [], (err, row) => {
        if (err) {
            console.error('Erro ao buscar o último produto:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
        if (row) {
            return res.json({ ultimoCodigo: row.id + 1 });
        } else {
            return res.json({ ultimoCodigo: 1 });
        }
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, codigoDeBarras, preco, categoria, quantidade, descricaoTecnica } = req.body;

    db.run(
        `UPDATE Produtos SET nome = ?, codigoDeBarras = ?, preco = ?, categoria = ?, quantidade = ?, descricaoTecnica = ? 
        WHERE id = ?`,
        [nome, codigoDeBarras, preco, categoria, quantidade, descricaoTecnica, id],
        function (err) {
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM Produtos WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso' });
    });
});

module.exports = router;
