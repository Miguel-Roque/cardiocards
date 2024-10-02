import Carta from "./Carta";
import CartaData from "../data/CartaData";

const Cartas = () => {
    return (
        <div className="App">
            {CartaData.map((carta) => (
            <Carta
                key={carta.id}
                id={carta.id}
                nombre={carta.nombre}
                imagen={carta.imagen}
                tipo={carta.tipo}
                repeticiones={carta.repeticiones}
                duracion={carta.duracion}
            />
            ))}
        </div>
    )
}

export default Cartas
