import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return <DataFetcher />;
}

export default App;

function DataFetcher() {
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let baseUrl = 'http://139.216.67.127:3001/api/partnumber/';
    try {
      const response = await axios.get(`${baseUrl}${inputValue}`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <form className='formContainer' onSubmit={handleSubmit}>
        <div className="input-container">
          <input 
            className='partnumberField' 
            type="text" 
            value={inputValue} 
            onChange={handleInputChange} 
          />
          <label className={inputValue && 'filled'}>Insert partnumber</label>
        </div>
        <button type="submit">Buscar</button>
      </form>
      {loading ? (
        <p>Carregando...</p>
      ) : data && (
        <div className="data-container">
          <div className="partnumber">{data.partnumber}</div>
          <div className="description">{data.description}</div>
          <div className="line-column-info">
            <span className="column-name">{data.line?.column?.name}</span> | <span className="line-name">{data.line?.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
