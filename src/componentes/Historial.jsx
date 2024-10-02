import PropTypes from "prop-types";
import Carta from "./Carta";

const Historial = ({ history }) => {
    return (
        <div className="historial-container">
            {history.length === 0 ? (
                <p className="historial-n">Aquí saldrá el historial de las cartas</p>
            ) : (
                history.slice().reverse().map((card, index) => (
                    <div className="historial" key={index}>
                        <Carta
                            id={card.id}
                            nombre={card.nombre}
                            imagen={card.imagen}
                            tipo={card.tipo}
                            repeticiones={card.repeticiones}
                            duracion={card.duracion}
                        />
                    </div>
                ))
            )}
        </div>
    );
};
Historial.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            nombre: PropTypes.string.isRequired,
            imagen: PropTypes.string.isRequired,
            tipo: PropTypes.string.isRequired,
            repeticiones: PropTypes.number.isRequired,
            duracion: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default Historial;
