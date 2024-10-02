import PropTypes from "prop-types";

const Carta = ({ id, nombre, imagen, tipo, repeticiones, duracion }) => {
    const asignarClaseTipo = (tipo) => {
        switch (tipo) {
        case "verde":
            return "carta_verde";
        case "amarillo":
            return "carta_amarillo";
        case "rojo":
            return "carta_rojo";
        case "celeste":
            return "carta_celeste";
        case "negro":
            return "carta_negro";
        case "dorado":
            return "carta_dorado";
        default:
            return "carta";
        }
    };

    return (
        <div className={`carta ${asignarClaseTipo(tipo)}`}>
            <img src={imagen} alt={nombre} />
            <span className={`carta_id ${asignarClaseTipo(tipo)}`}>{id}</span>
            <span className="carta_nombre">{nombre}</span>
            {repeticiones && <span className="carta_repeticion">{repeticiones}r</span>}
            {duracion && <span className="carta_duracion">{duracion}s</span>}
        </div>
    );
};

Carta.propTypes = {
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    repeticiones: PropTypes.string,
    duracion: PropTypes.string,
};

export default Carta;
