import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Descanso = ({ id }) => {
  const [desactivado, setDesactivado] = useState(() => {
    const storedState = localStorage.getItem(`descanso-${id}`);
    return storedState ? JSON.parse(storedState) : false;
  });
  const descansoRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(`descanso-${id}`, JSON.stringify(desactivado));
  }, [desactivado, id]);

  useEffect(() => {
    if (descansoRef.current && desactivado) {
      descansoRef.current.classList.add('desactive-descanso');
    }
  }, [desactivado]);

  const handleClick = () => {
    setDesactivado(true);
    if (descansoRef.current) {
      descansoRef.current.classList.add('desactive-descanso');
    }
  };

  return (
    <div
      ref={descansoRef}
      className={` descanso ${desactivado ? 'desactive-descanso' : ''}`}
      onClick={handleClick}
    >
      <img className="img-descanso" src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-angeles-clipart-cute-angel-in-the-praying-pose-vector-illustration-cartoon-png-image_11060999.png" alt="descanso" />
    </div>
  );
};

Descanso.propTypes = {
  id: PropTypes.any.isRequired,
};

export default Descanso;
