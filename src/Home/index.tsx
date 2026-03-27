import "./style.css";
import { useState, useEffect } from 'react'

interface Ranking {
  rank: number
  contestantName: string
  points: number
  matchesPlayed: number
}

function Home() {
  const [ranking, setRanking] = useState<Ranking[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/sdtibata/dataliga/refs/heads/main/posiciones.json')
        const data = await res.json()

        setRanking(data.standings[0].ranking)
        setTitle(data.standings[0].competitionName)
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="tabla-container">
      <h2>{title}</h2>
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
          {ranking.map((equipo) => (
            <tr key={equipo.rank}>
              <td>{equipo.rank}</td>
              <td>{equipo.contestantName}</td>
              <td>{equipo.matchesPlayed}</td>
              <td>{equipo.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home