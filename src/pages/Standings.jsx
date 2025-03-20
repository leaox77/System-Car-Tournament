import React, { useEffect, useState } from 'react';
import { getAutos } from '../services/autosService';
import StandingsTable from '../components/StandingsTable';

const Standings = () => {
  const [autos, setAutos] = useState([]);

  useEffect(() => {
    const fetchAutos = async () => {
      const data = await getAutos();
      setAutos(data);
    };
    fetchAutos();
  }, []);

  const primeraDivision = autos.filter((auto) => auto.division_id === 1);
  const segundaDivision = autos.filter((auto) => auto.division_id === 2);
  const terceraDivision = autos.filter((auto) => auto.division_id === 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-accent mb-8">Tabla de Posiciones</h1>
      <div className="space-y-12">
        <StandingsTable division="Primera" autos={primeraDivision} />
        <StandingsTable division="Segunda" autos={segundaDivision} />
        <StandingsTable division="Tercera" autos={terceraDivision} />
      </div>
    </div>
  );
};

export default Standings;