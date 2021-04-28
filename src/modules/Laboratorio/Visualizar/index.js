import React, { useCallback, useEffect, useState } from 'react';

import Menu from '../../../utils/components/Menu';
import Title from '../../../utils/components/Title';
import Toolbar from '../../../utils/components/Toolbar';
import Equipamento from './components/equipment';
import api from '../../../services/api';

const Listar = (props) => {
  const [lab, setLab] = useState([]);

  const filterData = useCallback(
    (res) => {
      let filteredData = [];
      for (let index = 0; index < res.length; index++) {
        let element = res[index];
        if (props.location.state.id === element.laboratory_id) {
          filteredData = filteredData.concat(element);
        }
      }
      return filteredData;
    },
    [props]
  );

  useEffect(() => {
    async function fetchData() {
      const res = await api.get('/equipment');
      const data = filterData(res.data);
      setLab(data);
    }
    fetchData();
  }, [filterData]);

  return (
    <div>
      <Toolbar />
      <Menu />
      <Title title="Listagem de Equipamentos" />
      <div className="listaEquipamentos">
        <ul>
          {lab.map((item) => (
            <li key={item.id}>
              <Equipamento 
              eqp={item} 
              path={window.location.pathname} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Listar;
