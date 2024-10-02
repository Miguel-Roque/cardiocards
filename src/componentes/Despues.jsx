import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Despues = ({ id }) => {
    const [desactivado, setDesactivado] = useState(() => {
        const storedState = localStorage.getItem(`despues-${id}`);
        return storedState ? JSON.parse(storedState) : false;
    });
    const despuesRef = useRef(null);

    useEffect(() => {
        localStorage.setItem(`despues-${id}`, JSON.stringify(desactivado));
    }, [desactivado, id]);

    useEffect(() => {
        if (despuesRef.current && desactivado) {
        despuesRef.current.classList.add('desactive-descanso');
        }
    }, [desactivado]);

    const handleClick = () => {
        setDesactivado(true);
        if (despuesRef.current) {
        despuesRef.current.classList.add('desactive-descanso');
        }
    };

    return (
        <div
        ref={despuesRef}
        className={`despues descanso ${desactivado ? 'desactive-descanso' : ''}`}
        onClick={handleClick}
        >
        <img className="img-descanso" src="https://static.vecteezy.com/system/resources/thumbnails/024/678/717/small_2x/3d-metal-shield-icon-png.png" alt="descanso" />
        </div>
    );
};

Despues.propTypes = {
  id: PropTypes.any.isRequired,
};

export default Despues;
