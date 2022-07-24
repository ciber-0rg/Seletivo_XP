# Seletivo_XP
repositório dedicado à resolução do Desafio Técnico Back End da XP Inc.

# Explicação

O Desafio requeria a realização de 3 rotas principais e suas respectivas rotas secundárias.
Então, temos as rotas:

<details>
    <summary> <strong> 1- /conta </strong> </summary> <br/>
1.1- GET /:codCliente -> responsável por consultar o saldo do cliente especificado pelo ID:codCliente presente na url, retornando o seguinte objeto:
          {
              "codCliente": 1,    // ID do cliente.
              "saldo": "1475.00"  // saldo do cliente 1.
          }

1.2- POST /saque -> responsável por descontar um valor X do saldo do cliente, recebendo as informações necessárias pelo body:
          {
              "codCliente": 2, // IDentificador do cliente no database.
              "valor": 74.90  // valor a ser descontado_sacado da conta 2.
          }
</details>

1.3- POST /deposito  -> responsável por depositar um valor X no saldo do cliente, recebendo as informações necessárias pelo body:
          {
              "codCliente": 3, // IDentificador do cliente no database.
              "valor": 225.30  // valor a ser depositado na conta 3.
          }

2- /ativos
2.1- GET /:codAtivo -> responsável por consultar todas as informações referentes ao ativo identificado na url.
    {
        "codAtivo": 65,  // IDentificador do ativo.
        "qtdeAtivo": 49, // quantidade do ativo 65 disponível para venda na corretora.
        "valor": "12.50" // preço de cada ação do ativo 65.
    }

2.2- GET /cliente/:codCliente -> responsável por consulta todos os ativos que o cliente de ID X possui naquela corretora, retornando um array de objeto, como por exemplo:
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

3- /investimentos
3.1- POST /vender -> responsável por vender X ativos de determinado cliente de acordo com sua carteira. Recebe o objeto:
    {
        "codCliente": 1, // conta do cliente que vai vender os ativos.
        "codAtivo": 65,  // código do ativo que será vendido.
        "qtdeAtivo": 9  // quantidade de ativos que será vendida.
    }

3.2- POST /comprar -> responsável por comprar X ações de ativo X por determinado cliente.
    {
        "codCliente": 1,  // IDentificador do cliente que realiza a compra.
        "codAtivo": 65,   // IDentificador do ativo sendo comprado.
        "qtdeAtivo": 100  // quantidade de ativos a serem comprados.
    }
