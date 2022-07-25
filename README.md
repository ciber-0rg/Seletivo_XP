<detail>
<summary><strong> Versão em Português</summary></strong>

> You can find the English version at the bottom of the page!

# Seletivo_XP
Este repositório foi criado para a resolução do Desafio Técnico para vaga de Software Engineer I - Back End da XP Inc.

# Apresentação

Esta é uma aplicação em Javascript.</br>
Utilizando [NodeJS](https://nodejs.org/en/about/) & [ExpressJS](https://expressjs.com/pt-br/).</br>
O sistema de gerenciamento de banco de dados é [MySQL](https://www.mysql.com/).</br>
O validador de dados é [Joi](https://joi.dev/).</br>
A biblioteca [Nodemon](https://nodemon.io/) é usada para reinício automático do servidor.</br>
O método de autenticação e encriptação de dados é [JWT](https://jwt.io/).</br>
</br>
A aplicação possui 4 rotas principais: </br>

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
</br>

Este projeto foi realizado entre os dias 18 e 24 de julho de 2022.</br>
Este é o segundo repositório referente a este projeto. </br>
O primeiro está ainda em modo privado e foi descartado do envio por motivos de commits bombas.</br>
Este repositório apresenta o fluxo de commits atômicos que considero ideal: rota por rota. E revelam a linha de produção que consegui visualizar para realização de todas as tasks. </br>

Os testes serão realizados em [Sinon](https://sinonjs.org/) e [Chai](https://www.chaijs.com/). </br>

</details>
</br>

Aqui você consegue ver o deploy da minha aplicação: https://processo-seletivo-xp-ruda.herokuapp.com/




<details>
    <summary> <strong> English version </strong> </summary>

# Selection_XP
This repository contains the solution created to compete for a Software Engineer I - Back End vacancy at XP Inc.

# Presentation


This is a Javascript application.</br>
Using [NodeJS](https://nodejs.org/en/about/) & [ExpressJS](https://expressjs.com/pt-br/).</br>
The database management system used is [MySQL](https://www.mysql.com/).</br>
The data validator used is [Joi](https://joi.dev/).</br>
The library [Nodemon](https://nodemon.io/) is used for automatic server restart.</br>
The authentication and data encryption method used is[JWT](https://jwt.io/).</br>
</br>
The application has 4 main routes:</br>

<details>
    <summary> <strong> /login </strong> </summary> <br/>

**POST /** </br>
Responsible for verifying the existence of customer X in the broker's system and generating a permission token for transactions and navigation within the account. Receives this object from the body:
```javascript
    {
        "email": "joaosilva@gmail.com",
        "password": "12345678"
    }
```
</br>

If the login information in the body is registered to a customer present in the database, the login is made and the token will be returned:
```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9zaWx2YUBnbWFpbC5jb20iLCJzZW5oYSI6IjM0NTU2Nzg4IiwiaWF0IjoxNjU4Njg3NDA2LCJleHAiOjE2NTg2OTEwMDZ9.tgvirutyh2yZRAaJY90TLgDzNNiDwAgfFvzh2AqbPpU"
    }
```
> The server's response will be 200 OK.</br>
> This token must be used in all application routes in the Header's Key Authorization and is valid for 1h. After expiration, a new login is required to generate a new token.
</br>

If not:

```javascript
    {
        "message": "No client registered under such data."
    }
```
> The server's response will be 404 Not Found.
</br>
</details>

<details>
    <summary> <strong> /conta </strong> </summary> <br/>

**GET /:codCliente** </br>
Responsible for querying the customer balance specified by the ID:codCliente present in the url, if the codClient exists in the database, it will return the following object:<br/>
```javascript
    {
        "codCliente": 1,    // client ID.
        "saldo": 335.00  // client's balance.
    }
```
> The server's response will be 200 OK.
</br>

If there is no client related to the url ID, the return will be:</br>
```javascript
    {
        "message": "Client not found."
    }
```
> The server's response will be 404 Not Found.
</br>

**POST /saque** </br>
Responsible for deducting an amount X from the customer's balance. Getting the following object in the body:<br/>
```javascript
        {
            "codCliente": 1, // client's ID.
            "valor": 100.00  // value to be withdrawn from account
        }
```
</br>

If the amount to be withdrawn is available in the account it returns the updated balance of the customer after withdrawal: </br>
```javascript
        {
            "codCliente": 2, // client's ID.
            "saldo": 235.00  // account balance after withdrawal.
        }
```
> The server's response will be 200 OK.
</br>

If not: </br>
```javascript
    {
        "message": "Not enough funds."
    }
```
> The server's response will be 400 Bad Request.
</br>

**POST /deposito**  </br>
Responsible for depositing an amount X in the customer's balance. Getting the following object in the body:</br>
```javascript
        {
            "codCliente": 1, // client's ID.
            "valor": 300.00  // amount to be deposited into the account.
        }
```
</br>

If the codCLient refers to an IDentifier registered in the system, it returns the client's updated balance after deposit:</br>
```javascript
        {
            "codCliente": 1, // client's ID.
            "saldo": 535.00  // balance after deposit.
        }
```
> The server's response will be 200 OK.
</br>


If not, returns:
```javascript
    {
        "message": "Client not found."
    }
```
> The server's response will be 404 Not Found.
</br>
</details>

<details>
    <summary> <strong> /ativos </strong> </summary> <br/>

**GET /:codAtivo** </br>
Responsible for consulting all information regarding the asset identified in the url. </br>
```javascript
        {
            "codAtivo": 65,  // asset's ID.
            "qtdeAtivo": 49, // amount of asset 65 available for sale at the brokerage firm.
            "valor": "12.50" // price of each share of the asset 65.
        }
```
> The server's response will be 200 OK.
</br>

If the IDentifier does not refer to any asset of the brokerage firm, the return will be:
```javascript
    {
        "message": "No asset registered under this identifier."
    }
```
> The server's response will be 404 Not Found.
</br>

**GET /cliente/:codCliente** </br>
Responsible for consulting all the assets that the client with the ID specified in the url has in that brokerage, returning an array of objects, for example:</br>
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
> The server's response will be 200 OK.
</br>

If there is no customer registered under such ID, the return will be:
```javascript
    {
        "message": 'No assets found for this client.'
    }
```
> The server's response will be 404 Not Found.
</br>
</details>

<details>
    <summary> <strong> /investimentos </strong> </summary> <br/>

**POST /vender** </br>
Responsible for selling X assets of a given customer according to their portfolio. Get the following object in the body:</br>
```javascript
        {
            "codCliente": 1, // account of the client who will sell the assets.
            "codAtivo": 65,  // ID of the asset to be sold.
            "qtdeAtivo": 9  // number of shares of the asset that will be sold.
        }
```
</br>

</br>
If the customer in question has the amount of shares in the portfolio to carry out the amount of the sale, the return will be:</br>

```javascript
        {
            "message": "Assets sold!"
        }
```
> The server's response will be 200 OK.
</br>

If not:</br>
```javascript
        {
            "message": "Not enough assets to complete the sell."
        }
```
> The server's response will be 400 Bad Request.
</br>

**POST /comprar** </br>
Responsible for buying X shares of asset X by a given customer. Get the following object in the body:<br/>
 ```javascript
        {
            "codCliente": 1, // account of the client who will buy the assets.
            "codAtivo": 65,  // ID of the asset to be bought.
            "qtdeAtivo": 9  // number of shares of the asset that will be bought.
        }
```
</br>

If the customer has enough balance to buy the quantity he wants **&&** the desired quantity is available in stock for sale, the return is:
```javascript
    {
        "message": "Your purchase has been successful. And you current balance is ${xxxx}."
    }
```
> The server's response will be 200 OK.
</br>

If the customer does not have enough balance to buy the desired amount, the return is:
```javascript
    {
        "message": "Client does not have the required amount to finish this purchase."
    }
```
> The server's response will be 400 Bad Request.
</br>

If the customer has enough balance to make the purchase but the asset does not have the desired quantity available for sale, the return will be:
```javascript
    {
        "message": "Not enough assets available for this purchase. Try a different amount."
    }
```
> The server's response will be 400 Bad Request.
</br>
</details>
</br>

</br>
This project was carried out between the 18th and 24th of July 2022.</br>
The first one is still in private mode and has been dropped from submission due to bomb commits.</br>
This repository presents the flow of atomic commits that I think is ideal: route by route. And they reveal the production line that I was able to visualize to carry out all the tasks. </br>

The tests will be carried out using [Sinon](https://sinonjs.org/) e [Chai](https://www.chaijs.com/). </br>
</details>
</br>

Check out the deploy here: https://processo-seletivo-xp-ruda.herokuapp.com/ !
</details>