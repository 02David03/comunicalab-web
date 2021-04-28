import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Error from './Error';
import '../styles/Formulario.css';
import PropsType from 'prop-types';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'O nome do Equipamento tem que ser maior que 5 caracteres!')
    .max(255, 'O nome do Equipamento tem que ser menor que 255 caracteres!')
    .required('Digite o nome do laboratorio!'),
  capacity: Yup.number().required('Digite a capacidade do laboratorio!'),
});

const Formulario = (props) => {
  const formik = useFormik({
    initialValues: { name: '', capacity: '', localization: '' },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      props.onSubmit(values);
    },
  });

  return (
    <div className="formulario">
      <form onSubmit={formik.handleSubmit}>
        <div className="formularioLinha">
          <div className="formularioLabel">
            <p>Nome:</p>
          </div>
          <div className="formularioInput">
            <input
              name="name"
              id="name"
              placeholder="Nome do Laboratorio"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              className={
                formik.touched.name && formik.errors.name ? 'has-error' : null
              }
            />
          </div>
          <Error touched={formik.touched.name} message={formik.errors.name} />
        </div>
        <div className="formularioLinha">
          <div className="formularioLabel">
            <p>Capacidade:</p>
          </div>
          <div className="formularioInput">
            <input
              name="capacity"
              id="capacity"
              placeholder="Capacidade"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.capacity}
              onBlur={formik.handleBlur}
              className={
                formik.touched.capacity && formik.errors.capacity
                  ? 'has-error'
                  : null
              }
            />
          </div>
          <Error
            touched={formik.touched.capacity}
            message={formik.errors.capacity}
          />
        </div>
        <div className="formularioLinha">
          <div className="formularioLabel">
            <p>Localização:</p>
          </div>
          <div className="formularioSelect">
            <select
              name="localization"
              id="localization"
              onChange={formik.handleChange}
              defaultValue={formik.values.localization}
              onBlur={formik.handleBlur}
              className={
                formik.touched.localization && formik.errors.localization
                  ? 'has-error'
                  : null
              }
            >
              <option value="" disabled>
                Escolha a localização
              </option>
              {props.location.map((item) => (
                <option value={item.building} key={item.id}>
                  {item.building} {item.floor}
                </option>
              ))}
            </select>
          </div>
          <Error
            touched={formik.touched.localization}
            message={formik.errors.localization}
          />
        </div>
        <div className="formularioButton">
          <div className="formularioButtonCancelar">
            <button type="button" onClick={props.onCancel}>
              {' '}
              Cancelar{' '}
            </button>
          </div>
          <div className="formularioButtonRegistrar">
            <button type="submit">Editar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

Formulario.propTypes = {
  initialValues: PropsType.object,
  location: PropsType.array.isRequired,
  onSubmit: PropsType.func.isRequired,
  onCancel: PropsType.func.isRequired,
};

Formulario.defaultProps = {
  initialValues: {
    name: '',
    capacity: '',
    localization: '',
  },
};
export default Formulario;
