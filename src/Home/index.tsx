import { Link } from "react-router-dom";
import "./style.css";
import { useState, useEffect } from "react";

interface Ranking {
  rank: number;
  contestantName: string;
  points: number;
  matchesPlayed: number;
  goalsFor?: number;
}
interface Estadistica {
  position: number;
  name: string;
  contestantName: string;
  value: number;
  appearances: number;
  statName: string;
}
type FiltroTipo =
  | "posiciones"
  | "goleador"
  | "asistencias"
  | "amarillas"
  | "atajadas";

function Home() {
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [title, setTitle] = useState("");
  const [filtro, setFiltro] = useState<FiltroTipo>("posiciones");
  const [estadisticas, setEstadisticas] = useState<Estadistica[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const filtros: FiltroTipo[] = [
    "posiciones",
    "goleador",
    "asistencias",
    "amarillas",
    "atajadas",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRanking([]);
        setEstadisticas([]);

        const res = await fetch(
          `https://raw.githubusercontent.com/sdtibata/dataliga/refs/heads/main/${filtro}.json`
        );
        const data = await res.json();

        if (filtro === "posiciones") {
          setRanking(data.standings[0].ranking);
          setTitle(data.standings[0].competitionName);
        } else {
          setEstadisticas(data);
          setTitle(filtro.charAt(0).toUpperCase() + filtro.slice(1));
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [filtro]);


    const textoBusqueda = busqueda.trim().toLowerCase();

  const rankingFiltrado = ranking.filter((equipo) =>
    textoBusqueda === ""
      ? true
      : equipo.contestantName.toLowerCase().includes(textoBusqueda)
  );

  const estadisticasFiltradas = estadisticas.filter((jugador) =>
    textoBusqueda === ""
      ? true
      : jugador.name.toLowerCase().includes(textoBusqueda) ||
        jugador.contestantName.toLowerCase().includes(textoBusqueda)
  );



  const equiposMap: Record<string, string> = {
    "América de Cali SA": "america-de-cali",
    "Pasto FC": "pasto",
    "CA Bucaramanga": "atletico-bucaramanga",
    "Club Atlético Nacional SA": "atletico-nacional",
    "Club Deportes Tolima SA": "deportes-tolima",
    "Asociación Deportivo Cali": "deportivo-cali",
    "Deportivo Independiente Medellín": "independiente-medellin",
    "Club Independiente Santa Fe": "independiente-santa-fe",
    "CD Popular Junior FC SA": "junior",
    "Millonarios FC": "millonarios",
    "Once Caldas SA": "once-caldas",
    "Internacional de Bogotá": "internacional-bogota",
    "Club Llaneros SA": "llaneros",
    "Águilas Doradas": "aguilas-doradas",
    "Fortaleza FC": "fortaleza",
    "Alianza FC": "alianza",
    "Jaguares de Córdoba FC": "jaguares",
    "Cúcuta Deportivo FC": "cucuta",
    "Boyacá Chicó FC": "boyaca-chico",
    "Deportivo Pereira FC": "pereira",
  };

  return (
  
  <>
      <div className="filtros">
        {filtros.map((onestat) => (
          <button
            key={onestat}
            onClick={() => setFiltro(onestat)}
            className={filtro === onestat ? 'activo' : ''}
          >
            {onestat}
          </button>
        ))}
      </div>

       <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />


    

      <div className="tabla-container">
        <h2>{title}</h2>
        {filtro === 'posiciones' ? (
          <table className="tabla-posiciones">
            <thead>
              <tr>
                <th>#</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              {rankingFiltrado.length > 0 ? (
                rankingFiltrado.map((equipo) => (
                  <tr key={equipo.rank}>
                    <td>{equipo.rank}</td>
                    <td>
                      <Link
                        to={`/equipo/${equiposMap[equipo.contestantName] || "default"}`}
                      >
                        {equipo.contestantName}
                      </Link>
                    </td>
                    <td>{equipo.matchesPlayed}</td>
                    <td>{equipo.points}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No se encontraron equipos que coincidan con la búsqueda.</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="tabla-estadisticas">
            <thead>
              <tr>
                <th>#</th>
                <th>Jugador</th>
                <th>Equipo</th>
                <th>PJ</th>
                <th>{filtro}</th>
              </tr>
            </thead>
            <tbody>
              {estadisticasFiltradas.length > 0 ? (
                estadisticasFiltradas.map((jugador) => (
                  <tr key={jugador.position}>
                    <td>{jugador.position}</td>
                    <td>{jugador.name}</td>
                    <td>{jugador.contestantName}</td>
                    <td>{jugador.appearances}</td>
                    <td>{jugador.value}</td>
                  </tr>
                ))
              ) : estadisticas.length > 0 ? (
                <tr>
                  <td colSpan={5}>No se encontraron resultados para la búsqueda.</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5}>Cargando datos...</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Home;