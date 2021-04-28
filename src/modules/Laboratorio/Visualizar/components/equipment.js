import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import ModalDelete from '../../../../utils/components/ModalDelete';
import selectionStatus from '../actions/selectionStatus.js';
import computerImg from '../../../../assets/computador.jpg'
import '../styles/equipment.css';
import api from '../../../../services/api';

function Equipment(props) {
  const statusCor = selectionStatus(false);
  const [show, setShow] = useState(false);

  function showModal() {
    setShow(!show);
  }

  function onDelete() {
    api.delete(`/equipment/${props.eqp.id}`);
    setShow(false);
  }

  return (
    <div className="equipamento">
      <div className="computadorImg">
          <img src ={computerImg} alt = "computerImg"/>
          <div className = "equipamentoName">
            <h2> {props.eqp.brand} </h2>
          </div>
      </div>
      <div className="separator" />
      <div className="equipamenteInfo">
        <div className="equipamentoStatus">
          <h2>
            <b>Status de Uso:<br/></b> 
          </h2>
          <br/>
          <div className = "equipamentoStatusDown">
            <div className = {statusCor}/>
              <h3> Disponível </h3>
          </div>
        </div>
        <div className="equipamentoStatus2">
          <h2>
            <b>Status do Equipamento:</b> <br/>
          </h2>
          <div className = "equipamentoStatusDown">
            <div className = {statusCor}/>
              <h3>Ok</h3>
          </div>
        </div>
      </div>
      <ul className="equipamentoMenu">
        <li className="equipamentoSubMenu">
          <p />
          <ul>
            <li className="equipamentoSubSubMenu">
              <Link to={{pathname: `${props.path}/Editar/${props.eqp.id}`,
                        state : {
                          id : props.eqp.id,
                          brand : props.eqp.brand,
                          path : props.path
                        }}} >
                <button type="button"> EDITAR </button>
              </Link>
            </li>
            <li className="equipamentoSubSubMenu">
              <button type="button" onClick={showModal}>
                DELETAR
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <ModalDelete
        title="Excluir Equipamento?"
        onClose={showModal}
        onConfirm = {onDelete}
        show={show}
      >
        Tem certeza que deseja excluir permanentemente este Equipamento?
      </ModalDelete>
    </div>
  );
}


Equipment.propTypes = {
  eqp: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

Equipment.defaultProps = {
  eqp: {},
};

export default Equipment;
