import React, { useState, useEffect } from 'react';
import Menu from '../../../utils/components/Menu';
import Title from '../../../utils/components/Title';
import Toolbar from '../../../utils/components/Toolbar';
import Formulario from './components/Formulario';
import { Redirect } from 'react-router-dom';
import api from '../../../services/api';

const Registrar = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [location, setLocation] = useState([]);
  // Aqui acontece a pega dos dados referentes as localizações
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
  const cancelHandler = () => setShouldRedirect(true);
  //função responsavel pelo submit dos dados
  const submitHandler = async (values) => {
    // Criação de uma variavel newLab que representa o novo laboratorio e suas variaveis(note que a localização não está aqui pois ela não foi implementada no back)
    const newLab = {
      name: values.name,
      capacity: values.capacity
    };
    try {
      await api.post('/laboratory', newLab);
      setShouldRedirect(true);
    } catch {
      console.log('Erro no servidor. Por favor, tente mais tarde');
    }
  };
  if (shouldRedirect) {
    return <Redirect to="/Laboratorio/Listar" />;
  }

  return (
    <div>
      <Toolbar />
      <Menu />
      <Title title="Registrar Laboratório" />
      <Formulario
        onSubmit={submitHandler}
        onCancel={cancelHandler}
        location={location}
      />
    </div>
  );
};

export default Registrar;
