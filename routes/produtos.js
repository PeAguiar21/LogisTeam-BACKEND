const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

router.post('/', (req, res) => {
    const { id, nome, codigo, preco, categoria, quantidade, descricao } = req.body;

    const db = new sqlite3.Database('./db/database.sqlite');
    db.run(
        `INSERT INTO Produtos (id, nome, codigoDeBarras, preco, categoria, quantidade, descricaoTecnica) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, nome, codigo, preco, categoria, quantidade || 0, descricao],
        function (err) {
            db.close();
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'ID já existe. Forneça um ID único.' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                id,
                nome,
                codigo,
                preco,
                categoria,
                quantidade,
                descricao,
            });
        }
    );
});

router.get('/', (req, res) => {
    const db = new sqlite3.Database('./db/database.sqlite');
    db.all(`SELECT * FROM Produtos`, [], (err, rows) => {
        db.close(); 
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

router.get('/getProduto/:id', (req, res) => {
    const { id } = req.params;
    const db = new sqlite3.Database('./db/database.sqlite');
    db.get(`SELECT * FROM Produtos WHERE id = ?`, [id], (err, row) => {
        db.close();
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.status(200).json(row);
    });
});

router.get('/getUltimoRegistro', (req, res) => {
    const db = new sqlite3.Database('./db/database.sqlite');
    db.get('SELECT id FROM Produtos ORDER BY id DESC LIMIT 1', (err, row) => {
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, codigo, preco, categoria, descricao } = req.body;

    const db = new sqlite3.Database('./db/database.sqlite');
    db.run(
        `UPDATE Produtos SET nome = ?, codigoDeBarras = ?, preco = ?, categoria = ?, descricaoTecnica = ? 
        WHERE id = ?`,
        [nome, codigo, preco, categoria, descricao, id],
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const db = new sqlite3.Database('./db/database.sqlite');
    db.run(`DELETE FROM Produtos WHERE id = ?`, [id], function (err) {
        db.close();
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
