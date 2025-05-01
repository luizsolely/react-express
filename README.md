# Crypto Price Tracker

Este é um projeto que busca e exibe preços atualizados de criptomoedas utilizando uma API pública de dados de mercado.

## Estrutura do Projeto

O projeto é dividido em duas partes principais:
- **Frontend**: Uma aplicação React que exibe os preços e informações das criptomoedas
- **Backend**: Uma API Express que gerencia as requisições para a API externa de criptomoedas
- 
## Instalação

Para começar a usar este projeto, siga estes passos:

1. Clone o repositório.
2. Instale as dependências:
   - **Backend** (Navegue até a pasta `back-end-express1/api1`):
     ```
     cd back-end-express1/api1
     npm install
     ```
   - **Frontend** (Navegue até a pasta `front-end-react1/web1`):
     ```
     cd front-end-react1/web1
     npm install
     ```

## Executando o Projeto

1. Para iniciar o servidor backend:
   - Na pasta `back-end-express1/api1`, execute:
     ```
     node server.js
     ```
   - O servidor backend estará rodando em `http://localhost:8080`.

2. Para executar o frontend:
   - Na pasta `front-end-react1/web1`, execute:
     ```
     npm start
     ```
   - A aplicação frontend estará rodando em `http://localhost:3000`.

## Uso

- No frontend, você verá uma lista das principais criptomoedas com seus preços atuais.
- Use a barra de pesquisa para encontrar criptomoedas específicas.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, Axios
- **Frontend**: React, React Router, Chart.js
- **API de Dados**: API pública de criptomoedas (gratuita)

## Notas de Segurança

⚠️ **Importante:** Este projeto foi feito com fim acadêmico e configurado para usar uma API Key gratuita. Não me importei em commitar a chave diretamente nesse repositório.
