# Seletivo_XP
repositório dedicado à resolução do Desafio Técnico Back End da XP Inc.

# Explicação

Esta é uma aplicação back end em Javascript.</br>
Utilizando [NodeJS](https://nodejs.org/en/about/) & [ExpressJS](https://expressjs.com/pt-br/).</br>
O sistema de gerenciamento de banco de dados é [MySQL](https://www.mysql.com/).</br>
O validador de dados é [Joi](https://joi.dev/).</br>
A biblioteca [Nodemon](https://nodemon.io/) é usada para reinício automático do servidor.</br>
O método de autenticação de dados é [JWT](https://jwt.io/).</br>

A aplicação possui 4 rotas principais e outras rotas secundárias. </br>


<details>
    <summary> <strong> /login </strong> </summary> <br/>

**POST /** </br>
Responsável por verificar a existência de cliente X no sistema da corretora e gerar um token de permissão para transações e navegação dentro da conta. Recebe o seguinte objeto no body::
```javascript
    {
        "email": "joaosilva@gmail.com",
        "password": "12345678"
    }
```
</br>
Caso as informações de login estejam cadastradas a alguma pessoa cliente presente no banco de dados, o login é feito e o token será retornado:

```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9zaWx2YUBnbWFpbC5jb20iLCJzZW5oYSI6IjM0NTU2Nzg4IiwiaWF0IjoxNjU4Njg3NDA2LCJleHAiOjE2NTg2OTEwMDZ9.tgvirutyh2yZRAaJY90TLgDzNNiDwAgfFvzh2AqbPpU"
    }
```
> A resposta do servidor será 200 OK.</br>
> Este token deve ser utilizado em todas as rotas da aplicação na Key Authorization do Header e possui validade de 1h. Após vencimento, é preciso realizar novo login para geração de novo token.
</br>

Caso não:

```javascript
    {
        "message": "No client registered under such data."
    }
```
> A resposta do servidor será 404 Not Found.
</br>
</details>

<details>
    <summary> <strong> /conta </strong> </summary> <br/>

**GET /:codCliente** </br>
Responsável por consultar o saldo do cliente especificado pelo ID:codCliente presente na url, caso o codCliente exista no bando de dados, retornará o seguinte objeto:<br/>
```javascript
    {
        "codCliente": 1,    // ID do cliente.
        "saldo": 335.00  // saldo do cliente 1.
    }
```
> A resposta do servidor será 200 OK.
</br>

Caso não exista cliente relacionado a IDentificador da url, o retorno será:</br>
```javascript
    {
        "message": "Client not found."
    }
```
> A resposta do servidor será 404 Not Found.
</br>

**POST /saque** </br>
Responsável por descontar um valor X do saldo do cliente. Recebendo o seguinte objeto no body:<br/>
```javascript
        {
            "codCliente": 1, // IDentificador do cliente no database.
            "valor": 100.00  // valor a ser descontado_sacado da conta do cliente 1.
        }
```
</br>

Caso o valor a ser sacado esteja disponível em conta, retorna o saldo atualizado do cliente após saque:</br>
```javascript
        {
            "codCliente": 2, // IDentificador do cliente no database.
            "saldo": 235.00  // saldo da conta pós-saque
        }
```
> A resposta do servidor será 200 OK.
</br>

Caso nao: </br>
```javascript
    {
        "message": "Not enough funds."
    }
```
> A resposta do servidor será 400 Bad Request.
</br>

**POST /deposito**  </br>
Responsável por depositar um valor X no saldo do cliente. Recebendo o seguinte objeto no body:</br>
```javascript
        {
            "codCliente": 1, // IDentificador do cliente no database.
            "valor": 300.00  // valor a ser depositado na conta do cliente 1.
        }
```
</br>

Caso o codCliente faça referência a algum IDentificador cadastrado no sistema, retorna o saldo atualizado do cliente após depósito: </br>
```javascript
        {
            "codCliente": 1, // IDentificador do cliente no database.
            "saldo": 535.00  // saldo pós-depósito.
        }
```
> A resposta do servidor será 200 OK.
</br>

Caso não, retorna:
```javascript
    {
        "message": "Client not found."
    }
```
> A resposta do servidor será 404 Not Found.
</br>
</details>

<details>
    <summary> <strong> /ativos </strong> </summary> <br/>

**GET /:codAtivo** </br>
Responsável por consultar todas as informações referentes ao ativo identificado na url. </br>
```javascript
        {
            "codAtivo": 65,  // IDentificador do ativo.
            "qtdeAtivo": 49, // quantidade do ativo 65 disponível para venda na corretora.
            "valor": "12.50" // preço de cada ação do ativo 65.
        }
```
> A resposta do servidor será 200 OK.
</br>

Caso o IDentificador não faça referência a algum ativo da corretora, o retorno será:
```javascript
    {
        "message": "No asset registered under this identifier."
    }
```
> A resposta do servidor será 404 Not Found.
</br>

**GET /cliente/:codCliente** </br>
Responsável por consultar todos os ativos que o cliente de ID X, especificado na url, possui naquela corretora, retornando um array de objeto, como por exemplo:</br>
```javascript
        [
            {
                "codCliente": 1,
                "codAtivo": 65,
                "qtdeAtivo": 0,
                "valor": 12.50,
            },
            {
                "codCliente": 1,
                "codAtivo": 73,
                "qtdeAtivo": 10,
                "valor": 2.50
            }
        ]
```
> A resposta do servidor será 200 OK.
</br>

Caso não exista cliente cadastrado sob tal IDentificador, o retorno será:
```javascript
    {
        "message": 'No assets found for this client.'
    }
```
> A resposta do servidor será 404 Not Found.
</br>
</details>

<details>
    <summary> <strong> /investimentos </strong> </summary> <br/>

**POST /vender** </br>
Responsável por vender X ativos de determinado cliente de acordo com sua carteira. Recebe o seguinte objeto no body:</br>
```javascript
        {
            "codCliente": 1, // conta do cliente que vai vender os ativos.
            "codAtivo": 65,  // código do ativo que será vendido.
            "qtdeAtivo": 9  // quantidade de ativos que será vendida.
        }
```
</br>

Caso, a pessoa cliente em questão tenha a quantidade de ações em carteira para realizar o montante da venda, o retorno será:</br>

```javascript
        {
            "message": "Assets sold!"
        }
```
> A resposta do servidor será 200 OK.
</br>

Caso não:</br>
```javascript
        {
            "message": "Not enough assets to complete the sell."
        }
```
> A resposta do servidor será 400 Bad Request.
</br>

**POST /comprar** </br>
Responsável por comprar X ações de ativo X por determinado cliente. Recebe o seguinte objeto no body:<br/>
 ```javascript
        {
            "codCliente": 1,  // IDentificador do cliente que realiza a compra.
            "codAtivo": 65,   // IDentificador do ativo sendo comprado.
            "qtdeAtivo": 100  // quantidade de ativos a serem comprados.
        }
```
</br>

Caso o cliente possua saldo suficiente para comprar a quantidade que deseja **&&** a quantidade desejada esteja disponível em estoque para venda, o retorno é:
```javascript
    {
        "message": "Your purchase has been successful. And you current balance is ${xxxx}."
    }
```
> A resposta do servidor será 200 OK.
</br>

Caso o cliente não possua saldo suficiente para comprar a quantidade desejada, o retorno é:
```javascript
    {
        "message": "Client does not have the required amount to finish this purchase."
    }
```
> A resposta do servidor será 400 Bad Request.
</br>

Caso o cliente possua saldo suficiente para realizar a compra mas o ativo não tenha a quantidade desejada disponível para venda, o retorno será:
```javascript
    {
        "message": "Not enough assets available for this purchase. Try a different amount."
    }
```
> A resposta do servidor será 400 Bad Request.
</br>
</details>
