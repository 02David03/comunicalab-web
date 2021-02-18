import React, {useState, useEffect} from 'react';
import Menu from '../../../../utils/components/Menu';
import Title from '../../../../utils/components/Title';
import Toolbar from '../../../../utils/components/Toolbar';
import Formulario from '../../Editar/components/Formulario';
import {Redirect} from 'react-router-dom';
import api from '../../../../services/api';


const Editar =  (props) => {
  const [shouldRedirect,setShouldRedirect] = useState(false);
  const [location, getLocation] = useState([]);
  const cancelHandler = () => setShouldRedirect(true);


  useEffect( () => {
      api
        .get('/locations')
        .then( res => {
          console.log(res);
          getLocation(res.data);
        })
        .catch ( err =>{
          console.log(err)
        })
  });

  console.log(location);  
  const submitHandler = async (values) =>{
    const newLab = {
      name: values.name,
      capacity : values.capacity,
      is_in_use : false,
      occupied_at : "2020-02-10T23:02:10.000Z",
    };
    try {
      await api.put(`/laboratory/${props.location.state.id}`, newLab);
      setShouldRedirect(true);
      return (<Redirect to = "/Laboratorio/Listar"></Redirect>)
    } catch {
      console.log('Erro no servidor. Por favor, tente mais tarde')
    }
  }
  if (shouldRedirect) {
    return <Redirect to = "/Laboratorio/Listar"/>;
  }
  return (
    <div>
      <Toolbar />
      <Menu />
      <Title title="Editar Laboratório" subTitle={props.location.state.name} />
      <Formulario onSubmit = {submitHandler} onCancel = {cancelHandler} location = {location} />
    </div>
  );
}


export default Editar;
