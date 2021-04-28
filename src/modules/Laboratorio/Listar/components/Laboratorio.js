import React, { useState } from 'react';
import { Link} from 'react-router-dom';

import PropTypes from 'prop-types';

import ModalDelete from '../../../../utils/components/ModalDelete';
import selectionStatus from '../actions/selectionStatus';
import api from '../../../../services/api';
import '../styles/Laboratorio.css';

function Laboratorio({ lab }) {
  const statusCor = selectionStatus(lab.is_in_use);
  const [show, setShow] = useState(false);

  function showModal() {
    setShow(!show);
  }

  function onDelete() {
    api.delete(`laboratory/${lab.id}`);
    setShow(false);
  }

  function isLabInUse(lab) {
    if (lab.is_in_use) return "Ocupado"
    else return "Livre"
  }

  return (
    <div className="laboratorio">
      <div className="laboratorioStatusColor">
        <div className={statusCor} />
      </div>
      <div className="separator" />
      <div className="laboratorioInfo">
        <div className="laboratorioName">
          <h1>{lab.name}</h1>
        </div>
        <div className="laboratorioLocation">
          <h1>{lab.location}</h1>
        </div>
        <div className="laboratorioStatus">
          <h2>
            <b>Status:</b>
          </h2>
          <h3>{isLabInUse(lab)}</h3>
        </div>
        <div className="laboratorioCapacity">
          <h2>
            <b>Capacidade:</b>
          </h2>
          <h3>{lab.capacity}</h3>
        </div>
      </div>
      <ul className="laboratorioMenu">
        <li className="laboratorioSubMenu">
          <p />
          <ul>
            <li className="laboratorioSubSubMenu">
            <Link to={{pathname: `Visualizar/${lab.id}`,
                        state : {
                          id : lab.id,
                          name : lab.name
                        }}} >
                <button type="button"> VISUALIZAR </button>
              </Link>
            </li>
            <li className="laboratorioSubSubMenu">
              <Link to={{pathname: `Editar/${lab.id}`,
                        state : {
                          id : lab.id,
                          name : lab.name
                        }}} >
                <button type="button"> EDITAR </button>
              </Link>
            </li>
            <li className="laboratorioSubSubMenu">
              <button type="button" onClick={showModal}>
                DELETAR
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <ModalDelete
        title="Excluir Laboratório?"
        show={show}
        onClose={showModal}
        onConfirm = {onDelete}
      >
        Tem certeza que deseja excluir permanentemente este laboratório?
      </ModalDelete>
    </div>
  );
}

Laboratorio.propTypes = {
  lab: PropTypes.object,
};

Laboratorio.defaultProps = {
  lab: {},
};

export default Laboratorio;
