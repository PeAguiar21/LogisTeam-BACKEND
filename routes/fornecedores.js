const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

router.post('/', (req, res) => {
    const { nome, cpf_cnpj, contato } = req.body;
    db.run(
        `INSERT INTO fornecedores (nome, cpf_cnpj, contato) VALUES (?, ?, ?)`,
        [nome, cpf_cnpj, contato],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID, nome, cpf_cnpj, contato });
        }
    );
});

router.get('/', (req, res) => {
    db.all(`SELECT * FROM fornecedores`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(`SELECT * FROM fornecedores WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.status(200).json(row);
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf_cnpj, contato } = req.body;
    db.run(
        `UPDATE fornecedores SET nome = ?, cpf_cnpj = ?, contato = ? WHERE id = ?`,
        [nome, cpf_cnpj, contato, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }
            res.status(200).json({ message: 'Fornecedor atualizado com sucesso' });
        }
    );
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM fornecedores WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Fornecedor não encontrado' });
        }
        res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
    });
});

module.exports = router;
