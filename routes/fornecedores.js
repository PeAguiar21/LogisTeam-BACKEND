const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

router.post('/', (req, res) => {
    const { id, nome, cpf_cnpj, dataCadastro, contato } = req.body;
    db.run(
        `INSERT INTO fornecedores (id, nome, cpf_cnpj, dataCadastro,contato) VALUES (?, ?, ? ,?, ?)`,
        [id, nome, cpf_cnpj, dataCadastro,contato],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id, nome, cpf_cnpj, dataCadastro,contato });
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

router.get('/getFornecedor/:id', (req, res) => {
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

router.get('/getUltimoRegistro', (req, res) => {
    const db = new sqlite3.Database('./db/database.sqlite');
    db.get('SELECT id FROM fornecedores ORDER BY id DESC LIMIT 1', (err, row) => {
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
