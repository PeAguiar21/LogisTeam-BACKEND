
# API de Estoque de Produtos

Esta API foi criada para gerenciar o cadastro de produtos, fornecedores e inventário. O backend foi desenvolvido utilizando **Node.js** e **Express** e expõe endpoints REST para interagir com o banco de dados de produtos e fornecedores.  
Ela foi implementada principalmente para integrar com a aplicação frontend disponível no repositório: [LogisTeam](https://github.com/PeAguiar21/LogisTeam).

**Nome dos membros da equipe:**  
Pedro Henryque Aguiar da Silva (RA: 202051806321)

---

## Tecnologias Utilizadas

- **Node.js**: Plataforma para o desenvolvimento do backend.
- **Express**: Framework web para a construção da API.
- **Cors**: Middleware para permitir requisições de diferentes origens.
- **Sqlite3**: Gerenciador do banco de dados SQLite para gravar as informações dos cadastros.

---

## Instalação

Para rodar este backend localmente, siga os passos abaixo:

### 1. Clone este repositório

```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
```

### 2. Instale as dependências

```bash
cd SEU_REPOSITORIO
npm install
```

### 3.Criar as tabelas no arquivo sqllite

```bash
node db/database.sqllite
```

### 4. Inicie o Servidor

```bash
npm start
```

O servidor estará rodando na porta padrão definida como `3322`. A URL base para acessar a API localmente será:

```text
http://localhost:3322
```

---

## Estrutura de Diretórios

O projeto está organizado da seguinte forma:

```plaintext
├── db/                # Contém o banco de dados SQLite e configurações relacionadas 
│   └── database.sqlite    # Arquivo do banco de dados    
│   ├── setup.js           # Arquivo de criacao das tabelas 
├── routes/              # Contém as definições de rotas para cada entidade (produtos, fornecedores, inventário)
│   └── fornecedores.js    # Rotas para operações de fornecedores
|   └── inventario.js      # Rotas para gerenciamento de inventário
|   └── produtos.js        # Rotas para operações de produtos
├── index.js               # Arquivo principal para inicialização do servidor
├── package.json           # Informações e dependências do projeto
└── README.md              # Documentação do projeto
```

---

## Endpoints da API

### Produtos

- **GET /produtos**  
  Retorna a lista de todos os produtos cadastrados.

- **POST /produtos**  
  Adiciona um novo produto.  
  **Body (JSON):**
  ```json
  {
    "id": 1,
    "nome": "Produto A",
    "codigo": "codigo de barras do Produto A",
    "preco": 10,
    "categoria": "Eletronico",
    "descricao": "Descrição técnica do Produto A"
  }
  ```

- **PUT /produtos/:id**  
  Atualiza os dados de um produto pelo ID.  
  **Body (JSON):**
  ```json
  {
    "nome": "Produto A",
    "codigo": "codigo de barras do Produto A",
    "quantidade": 0,
    "preco": 60,
    "categoria": "Eletronico",
    "descricao": "Descrição técnica do Produto A"
  }
  ```

- **DELETE /produtos/:id**  
  Remove um produto pelo ID.

---

### Fornecedores

- **GET /fornecedores**  
  Retorna a lista de todos os fornecedores cadastrados.

- **POST /fornecedores**  
  Adiciona um novo fornecedor.  
  **Body (JSON):**
  ```json
  {
    "id": 1,
    "nome": "Fornecedor X",
    "cnpj": "12.345.678/0001-90",
    "datacadastro": "2024-08-21",
    "contato": "fornecedor@example.com"
  }
  ```

- **PUT /fornecedores/:id**  
  Atualiza os dados de um fornecedor pelo ID.  
  **Body (JSON):**
  ```json
  {
    "nome": "Fornecedor X",
    "cnpj": "teste de cnpj",
    "datacadastro": "2024-08-21",
    "contato": "fornecedor@example.com"
  }
  ```

- **DELETE /fornecedores/:id**  
  Remove um fornecedor pelo ID.

---

### Inventário

- **GET /inventario**  
  Retorna a lista de produtos no inventário, com detalhes de quantidade.

- **POST /inventario**  
  Atualiza a quantidade de um produto no inventário.  
  **Body (JSON):**
  ```json
  {
    "id": 1,
    "produtoNome": "Produto X",
    "fornecedorNome": "Fornecedor X",
    "quantidade": 2,
    "tipo": 1 //1 igual a entrada e 2 igual a saida
    "dataCadastro": "2024-08-21",
    "novaQuantidade": 3,
  }
  ```

---

## Banco de Dados

O projeto utiliza o SQLite como banco de dados local. O arquivo de banco de dados está localizado em `db/database.sqlite`.  
Para realizar alterações estruturais ou iniciar o banco de dados, utilize as ferramentas adequadas para SQLite, como o DB Browser.

---

## Contribuindo

1. Faça um fork deste repositório.
2. Crie uma branch para suas alterações:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Adicionei nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

---

## Contato

Se você tiver dúvidas ou sugestões sobre este projeto, sinta-se à vontade para abrir uma *issue* ou entrar em contato:

**Autor:** Pedro Henryque Aguiar da Silva  
**RA:** 202051806321  
**Repositório do Frontend:** [LogisTeam](https://github.com/PeAguiar21/LogisTeam)
