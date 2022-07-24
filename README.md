# Seletivo_XP
repositório dedicado à resolução do Desafio Técnico Back End da XP Inc.

# Explicação

O Desafio requeria a realização de 3 rotas principais e suas respectivas rotas secundárias.
Então, temos as rotas:

<details>
    <summary> <strong> /conta </strong> </summary> <br/>

**GET /conta/:codCliente** -> responsável por consultar o saldo do cliente especificado pelo ID:codCliente presente na url, retornando o seguinte objeto:<br/>
```javascript
        {
            "codCliente": 1,    // ID do cliente.
            "saldo": "1475.00"  // saldo do cliente 1.
        }
```

**POST /conta/saque** -> responsável por descontar um valor X do saldo do cliente, recebendo as informações necessárias pelo body:<br/>
```javascript
        {
            "codCliente": 2, // IDentificador do cliente no database.
            "valor": 74.90  // valor a ser descontado_sacado da conta 2.
        }
```

**POST /deposito**  -> responsável por depositar um valor X no saldo do cliente, recebendo as informações necessárias pelo body:
```javascript
        {
            "codCliente": 3, // IDentificador do cliente no database.
            "valor": 225.30  // valor a ser depositado na conta 3.
        }
```
</details>



<details>
    <summary> <strong> /ativos </strong> </summary> <br/></br>

**GET /ativos/:codAtivo** -> responsável por consultar todas as informações referentes ao ativo identificado na url. </br>
```javascript
        {
            "codAtivo": 65,  // IDentificador do ativo.
            "qtdeAtivo": 49, // quantidade do ativo 65 disponível para venda na corretora.
            "valor": "12.50" // preço de cada ação do ativo 65.
        }
```

**GET ativos/cliente/:codCliente** -> responsável por consulta todos os ativos que o cliente de ID X possui naquela corretora, retornando um array de objeto, como por exemplo:</br>
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
</details>

<details>
    <summary> <strong> /investimentos </strong> </summary> <br/></br>

**POST /vender** -> responsável por vender X ativos de determinado cliente de acordo com sua carteira. Recebe o objeto:</br>
```javascript
        {
            "codCliente": 1, // conta do cliente que vai vender os ativos.
            "codAtivo": 65,  // código do ativo que será vendido.
            "qtdeAtivo": 9  // quantidade de ativos que será vendida.
        }
```

**POST /comprar** -> responsável por comprar X ações de ativo X por determinado cliente.<br/>
 ```javascript
        {
            "codCliente": 1,  // IDentificador do cliente que realiza a compra.
            "codAtivo": 65,   // IDentificador do ativo sendo comprado.
            "qtdeAtivo": 100  // quantidade de ativos a serem comprados.
        }
```
</details>
