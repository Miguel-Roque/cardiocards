import { useState, useEffect } from "react";
import Carta from "./Carta";
import CartaData from "../data/CartaData.json";
import Descanso from "./Descanso";
import Despues from "./Despues";
import Historial from "./Historial";
import Cartas from "./Cartas";

const RandomCard = () => {
  const [randomNumber, setRandomNumber] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [allCardsSelected, setAllCardsSelected] = useState(false);
  const [history, setHistory] = useState([]);
  const [showVerticalModal, setShowVerticalModal] = useState(false);

  useEffect(() => {
    const storedRandomNumber = localStorage.getItem("randomNumber");
    const storedSelectedNumbers = JSON.parse(localStorage.getItem("selectedNumbers"));
    const storedHistory = JSON.parse(localStorage.getItem("history"));

    if (storedRandomNumber && storedSelectedNumbers && storedHistory) {
      setRandomNumber(parseInt(storedRandomNumber));
      setSelectedNumbers(storedSelectedNumbers);
      setHistory(storedHistory);
    }
    document.querySelectorAll('.descanso').forEach(descanso => {
      const id = descanso.getAttribute('data-id');
      if (id) {
        descanso.classList.remove('desactive-descanso');
        localStorage.setItem(`descanso-${id}`, JSON.stringify(false));
      }
    });
  }, []);

  useEffect(() => {
    if (selectedNumbers.length === (CartaData.length + 1)) {
      setAllCardsSelected(true);
    }
  }, [selectedNumbers]);

  const selectedCard = CartaData[randomNumber];
  const generarNumeroAleatorio = () => {
    if (selectedNumbers.length === CartaData.length) {
      setAllCardsSelected(true);
      return;
    }

    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * CartaData.length);
    } while (selectedNumbers.includes(randomNum));

    setRandomNumber(randomNum);
    setSelectedNumbers(prevSelectedNumbers => [...prevSelectedNumbers, randomNum]);
    setHistory(prevHistory => [...prevHistory, CartaData[randomNum]]);

    localStorage.setItem("randomNumber", randomNum);
    localStorage.setItem("selectedNumbers", JSON.stringify([...selectedNumbers, randomNum]));
    localStorage.setItem("history", JSON.stringify([...history, CartaData[randomNum]]));
  };

  const reiniciarJuego = () => {
    localStorage.removeItem("randomNumber");
    localStorage.removeItem("selectedNumbers");
    localStorage.removeItem("history");
    
    for (let i = 1; i <= 4; i++) {
      localStorage.removeItem(`descanso-${i}`);
      localStorage.removeItem(`despues-${i}`);
    }
    document.querySelectorAll('.descanso, .despues').forEach(cartas => {
      cartas.classList.remove('desactive-descanso');
    });
    setRandomNumber(null);
    setSelectedNumbers([]);
    setAllCardsSelected(false);
    setHistory([]);
  
    window.location.reload(); 
  };

  useEffect(() => {
    if (showVerticalModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showVerticalModal]);

  return (
    <>
      <div className="conten-cads">
        <div className="descanso-continer">
          <Descanso id={1} data-id={1} />
          <Descanso id={2} data-id={2} />
          <Descanso id={3} data-id={3} />
        </div>
        <Despues id={4} data-id={4} />
        <button className="carta-nueva nueva-n" onClick={generarNumeroAleatorio} disabled={allCardsSelected}>
          Nueva Carta
        </button>

        {allCardsSelected ? (
          <div className="carta cartafin">
            ¡Terminaste todas las cartas!
          </div>
        ) : (
          randomNumber != null && (
            <div>
              <Carta
                id={selectedCard.id}
                nombre={selectedCard.nombre}
                imagen={selectedCard.imagen}
                tipo={selectedCard.tipo}
                repeticiones={selectedCard.repeticiones}
                duracion={selectedCard.duracion}
              />
            </div>
          )
        )}
        <button className="carta-nueva nueva-r" onClick={reiniciarJuego}>Reiniciar Juego</button>

        <button className="open-modal-btn carta-nueva cartas-t" onClick={() => setShowVerticalModal(true)}>Todas las Cartas</button>
        {showVerticalModal && (
          <div className="modal vertical-modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowVerticalModal(false)}>&times;</span>
              <Cartas/>
            </div>
          </div>
        )}
      </div>
      <div className="movil-container">
          <Descanso id={1} data-id={1} />
          <Descanso id={2} data-id={2} />
          <Descanso id={3} data-id={3} />
      </div>
      <Historial history={history} />
    </>
  );
};

export default RandomCard;
