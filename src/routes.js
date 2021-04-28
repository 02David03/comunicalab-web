import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import equipamentoEditar from './modules/Equipamento/Editar/index';
import equipamentoListar from './modules/Equipamento/Listar/index';
import equipamentoRegistrar from './modules/Equipamento/Registrar/index';
import equipamentoVisualizar from './modules/Equipamento/Visualizar/index';
import home from './modules/Home/index';
import laboratorioEditar from './modules/Laboratorio/Editar/index';
import laboratorioListar from './modules/Laboratorio/Listar/index';
import laboratorioRegistrar from './modules/Laboratorio/Registrar/index';
import laboratorioVisualizar from './modules/Laboratorio/Visualizar/index';
import laboratorioVisualizarEdit from './modules/Laboratorio/Visualizar/components/editar';
import login from './modules/Login/index';
import OsImageRouter from './modules/os-image/OsImageRouter';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={login} />
        <Route path="/Home" component={home} />

        <Route path="/Laboratorio/Registrar" component={laboratorioRegistrar} />
        <Route path="/Laboratorio/Listar" component={laboratorioListar} />
        <Route path="/Laboratorio/Editar/:id" component={laboratorioEditar} />
        <Route
          path="/Laboratorio/Visualizar/:id"
          exact
          component={laboratorioVisualizar}
        />
        <Route
          path="/Laboratorio/Visualizar/Editar/:id"
          component={laboratorioVisualizarEdit}
        />

        <Route path="/Equipamento/Registrar" component={equipamentoRegistrar} />
        <Route path="/Equipamento/Listar" component={equipamentoListar} />
        <Route path="/Equipamento/Editar/:id" component={equipamentoEditar} />
        <Route
          path="/Equipamento/Visualizar/:id"
          component={equipamentoVisualizar}
        />

        <Route path="/Imagens">
          <OsImageRouter />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
