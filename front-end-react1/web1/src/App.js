import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import './App.css';
import CryptoRow from './components/CryptoRow';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function fetchData() {
    setLoading(true); // Inicia o carregamento ao fazer a requisição
    axios.get("http://localhost:8080/coins")
      .then((res) => {
        console.log("Dados coletados com sucesso.");
        setCryptos(res.data.coins);
        setLastUpdated(res.data.lastUpdated);
        setLoading(false); // Finaliza o carregamento após os dados serem recebidos
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados. Tentando novamente...", error);
        setLoading(false); // Caso de erro, também devemos parar o carregamento
        setTimeout(fetchData, 2000);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <div className='header-container'>
          <div>
            <h1 className='title'>CRIPTO<span>MOEDAS</span></h1>
          </div>
          <button className='updateBtn' onClick={fetchData}>ATUALIZAR</button>
          <div className='search-bar'>
            <input 
              type='text' 
              placeholder='PESQUISAR' 
              onChange={(e) => setSearch(e.target.value)} 
            />
            <div className='search-icons'>
              <AiOutlineSearch size={27} color="#474747" />
            </div>
          </div>
        </div>
      </header>
      
      <div className="last-updated">
        <p>Última atualização: {new Date(lastUpdated).toLocaleString()}</p>
      </div>

      {loading ? (
        <div className="loading-message">
          <p id='loading'>Carregando dados... Por favor, aguarde.</p>
        </div>
      ) : (
        <div className='coin-body'>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>CHANGE (24h)</th>
                <th>CHANGE (1h)</th>
                <th>PRICE</th>
                <th>PRICE IN BTC</th>
                <th>MARKET CAP</th>
              </tr>
            </thead>
            <tbody>
              {cryptos
                .filter((data) => 
                  data.name.toLowerCase().includes(search) || 
                  data.symbol.toLowerCase().includes(search)
                )
                .map((data, index) => (
                  <CryptoRow 
                    key={index} 
                    data={data} 
                    formatNumber={formatNumber} 
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    
  );
}

export default App;
