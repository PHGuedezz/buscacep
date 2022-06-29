import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';
import { object } from 'prop-types';

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = usestage({});

  async function handleSearch(){
    if(input === ''){
      alert("Preencha algum CEP.")
      return;
    }
    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      console.log(response.data);
    }catch{
      alert("Erro de busca");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text"
        placeholder="Digite seu cep"
        value={input}
        onChange={(e) => setInput(e.target.value)}/>

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
        </div>

//renderizaçao condicional
        {object.keys(cep).length > 0 &&(
          <main className="main">
            <h2>CEP: {cep.cep}</h2>
        
            <span>{cep.logradouro}</span>
            <span>{cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>

          </main>
        )}
        
      
    </div>
  );
}

export default App;
