import React, { useState } from 'react';
import './App.css';

function App() {
  const defaultValues = {
    pulo: 5,
    queda: 3,
    pauseInMillSecond: 1000, //1sec
    fundoColor: 'red',
    metadeColor: 'yellow',
    finalColor: 'green',
  };
  const [formData, setFormData] = useState({
    profundidade: 0,
    passo: 0,
    queda: 0,
  });
  const [userInputFeedBack, setUserInfoFeedBack] = useState('');
  const [boxColor, setBoxColor] = useState(defaultValues.fundoColor);
  const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  async function onSubmitJogar(event) {
    event.preventDefault();
    setBoxColor(defaultValues.fundoColor);
    setUserInfoFeedBack('');
    const { profundidade, passo, queda } = formData;
    //mudando inputs para str
    let intProfu = parseInt(profundidade);
    let intQueda = parseInt(queda);
    //se não tem como sair
    if (profundidade > passo - queda) {
      setUserInfoFeedBack('A minhoquinha não consegue sair');
    } else {
      let safeExit = 0;
      let numeroDePulos = 0;
      do {
        numeroDePulos++;
        intProfu = intProfu - defaultValues.pulo;
        // verificar se tem queda e então adicionar a queda para profu do buraco
        intProfu = intQueda > 0 ? intProfu + defaultValues.queda : intProfu;
        //pausa caso teve queda
        if (intQueda > 0) {
          await pause(defaultValues.pauseInMillSecond);
        }
        intQueda = intQueda > 0 ? intQueda - defaultValues.queda : 0;
        // intPasso = intPasso - defaultValues.pulo;

        if (parseInt(profundidade) / 2 < intProfu) {
          setBoxColor(defaultValues.metadeColor);
          setUserInfoFeedBack('metade');
        }

        // console.log({ intQueda });
        if (safeExit > 1000000 || safeExit < -1000000) {
          break;
        }
      } while (intProfu > 0);
      console.log(numeroDePulos);
      setUserInfoFeedBack(`Foi ${numeroDePulos} pulos`);
      setBoxColor(defaultValues.finalColor);
    }
  }
  const inputData = [
    {
      id: 'profundidade',
      labelText: 'Informe a profundidade pf',
    },
    {
      id: 'passo',
      labelText: 'Quantos passos?',
    },
    {
      id: 'queda',
      labelText: 'Quantos quedas?',
    },
  ];
  const containerStyle = {
    display: 'grid',
    width: '200px',
    marginBottom: '30px',
  };
  return (
    <div className="App">
      <main>
        <div style={{ display: 'grid', placeItems: 'center' }}>
          <form onSubmit={onSubmitJogar}>
            {inputData.map((input) => {
              return (
                <div style={containerStyle}>
                  <label htmlFor={input.id}>{input.labelText}</label>
                  <input
                    min={input.minValue}
                    id={input.id}
                    type="0"
                    name={input.id}
                    onChange={handleChange}
                  />
                </div>
              );
            })}

            <button type="submit">Jogar</button>
          </form>
          <div
            style={{
              width: '300px',
              height: '300px',
              backgroundColor: `${boxColor}`,
              marginTop: '20px',
            }}
          >
            {userInputFeedBack}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
