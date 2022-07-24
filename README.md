# Seletivo_XP
repositório dedicado à resolução do Desafio Técnico Back End da XP Inc.

# Explicação

O Desafio requeria a realização de 3 rotas principais e suas respectivas rotas secundárias.</br>

<details>
    <summary> <strong> /conta </strong> </summary> <br/>

**GET /:codCliente** </br>
Responsável por consultar o saldo do cliente especificado pelo ID:codCliente presente na url, retornando o seguinte objeto:<br/>
```javascript
        {
            "codCliente": 1,    // ID do cliente.
            "saldo": "1475.00"  // saldo do cliente 1.
        }
```

**POST /saque** </br>
Responsável por descontar um valor X do saldo do cliente. Recebendo o seguinte objeto no body:<br/>
```javascript
        {
            "codCliente": 2, // IDentificador do cliente no database.
            "valor": 74.90  // valor a ser descontado_sacado da conta 2.
        }
```

**POST /deposito**  </br>
Responsável por depositar um valor X no saldo do cliente. Recebendo o seguinte objeto no body:</br>
```javascript
        {
            "codCliente": 3, // IDentificador do cliente no database.
            "valor": 225.30  // valor a ser depositado na conta 3.
        }
```
</details></br>



<details>
    <summary> <strong> /ativos </strong> </summary> <br/></br>

**GET /:codAtivo** </br>
Responsável por consultar todas as informações referentes ao ativo identificado na url. </br>
```javascript
        {
            "codAtivo": 65,  // IDentificador do ativo.
            "qtdeAtivo": 49, // quantidade do ativo 65 disponível para venda na corretora.
            "valor": "12.50" // preço de cada ação do ativo 65.
        }
```

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
</details></br>

<details>
    <summary> <strong> /investimentos </strong> </summary> <br/></br>

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

**POST /comprar** </br>
Responsável por comprar X ações de ativo X por determinado cliente. Recebe o seguinte objeto no body:<br/>
 ```javascript
        {
            "codCliente": 1,  // IDentificador do cliente que realiza a compra.
            "codAtivo": 65,   // IDentificador do ativo sendo comprado.
            "qtdeAtivo": 100  // quantidade de ativos a serem comprados.
        }
```
</details>

</br>

Para cumprir com um dos requisito adicionais do Desafio Técnico, crio mais uma rota, a rota de /login.</br>

<details>
    <summary> <strong> /login </strong> </summary> <br/></br>

**POST /** </br>
Responsável por verificar a existência de cliente X no sistema da corretora e gerar um token de permissão para transações e navegação dentro da conta. Recebe o seguinte objeto no body::
```javascript
    {
        "email": "joaosilva@gmail.com",
        "password": "12345678"
    }
```
</br>

 E retorna o token:

```javascript
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9zaWx2YUBnbWFpbC5jb20iLCJzZW5oYSI6IjM0NTU2Nzg4IiwiaWF0IjoxNjU4Njg3NDA2LCJleHAiOjE2NTg2OTEwMDZ9.tgvirutyh2yZRAaJY90TLgDzNNiDwAgfFvzh2AqbPpU"
    }
```

> Este token deve ser utilizado em todas as rotas da aplicação na Key Authorization do Header.


</details>