const express = require("express");
const cors = require("cors");
const axios = require("axios");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Configuração do Lowdb para armazenar dados em um arquivo JSON
const adapter = new FileSync("crypto.json");
const db = low(adapter);

// Define o esquema inicial
db.defaults({ coins: [], lastUpdated: null }).write();

// Função para buscar os dados da API e armazená-los no banco de dados
const fetchDataWithFallback = async () => {
  try {
    const response = await axios.get("https://openapiv1.coinstats.app/coins?limit=50", {
      headers: {
        accept: "application/json",
        "X-API-KEY": "fny3SJtiyHFtfdNsfHo9gYt9G4pFiTDR9t3xdca9LkY=",
      },
    });

    if (response.status === 200) {
      const coins = response.data.result;
      const lastUpdated = new Date().toISOString();
      db.set("coins", coins).set("lastUpdated", lastUpdated).write();
      console.log("Dados atualizados com sucesso a partir da API.");
      return { coins, lastUpdated };
    }

    // Caso o status não seja 200, lança um erro customizado
    throw new Error(`Erro na API com status ${response.status}`);
  } catch (err) {
    console.error("Erro ao buscar os dados da API. Usando dados locais:", err.message);
    
    // Fallback: retorna os dados locais armazenados
    const coins = db.get("coins").value();
    const lastUpdated = db.get("lastUpdated").value();
    return { coins, lastUpdated };
  }
};




// Endpoint para retornar os dados do banco de dados, atualizando a base
app.get("/coins", async (_, res) => {
  const data = await fetchDataWithFallback();
  res.json(data); // Inclui as moedas e a data da última atualização
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});