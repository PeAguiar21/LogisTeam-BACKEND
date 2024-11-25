const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS fornecedores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            cpf_cnpj TEXT NOT NULL,
            dataCadastro TEXT DEFAULT (date('now')),
            contato TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            codigoDeBarras TEXT NOT NULL,
            preco REAL NOT NULL,
            categoria TEXT NOT NULL,
            quantidade INTEGER DEFAULT 0,
            descricaoTecnica TEXT
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS inventario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            produtoNome TEXT,
            fornecedorNome TEXT,
            quantity INTEGER NOT NULL,
            tipo INTEGER
        );
    `);

    console.log("Tabelas criadas com sucesso!");
});

db.close();
