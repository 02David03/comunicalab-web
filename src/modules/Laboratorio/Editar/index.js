import React, { useState, useEffect } from 'react';
import Menu from '../../../utils/components/Menu';
import Title from '../../../utils/components/Title';
import Toolbar from '../../../utils/components/Toolbar';
import Formulario from './components/Formulario';
import { Redirect } from 'react-router-dom';
import api from '../../../services/api';

const Editar = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [location, setLocation] = useState([]);
  const cancelHandler = () => setShouldRedirect(true);
  // Aqui é feita a requisição no back-end que será enviada para o Formulario.js como um array de localizações
  useEffect(() => {
    let isMounted = false;
    api
      .get('/locations')
      .then((res) => {
        if (!isMounted) setLocation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = true;
    };
  }, []);
  //Implementação da função Submit que será enviada para Formulario.js
  const submitHandler = async (values) => {
    const newLab = {
      name: values.name,
      capacity: values.capacity,
    };
    try {
      await api.put(`/laboratory/${props.location.state.id}`, newLab);
      setShouldRedirect(true);
    } catch {
      alert('Erro no servidor. Por favor, tente mais tarde');
    }
  };
  if (shouldRedirect) {
    return <Redirect to="/Laboratorio/Listar" />;
  }
  return (
    <div>
      <Toolbar />
      <Menu />
      <Title title="Editar Laboratório" subTitle={props.location.state.name} />
      <Formulario
        onSubmit={submitHandler}
        onCancel={cancelHandler}
        location={location}
      />
    </div>
  );
};

export default Editar;
