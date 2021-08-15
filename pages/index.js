import { useSelector } from "react-redux"
import Link from 'next/link';

export default function Home() {
  const games = useSelector(state=>state.games);
  return (
    <div className="container">
      <h1>Puzzle: Wolf and Thomas</h1>
      <p>Lorem ipsum dolor sit amet</p>

      <ul>
        {
          games.map((item,key)=>{
            return(
              <li key={key}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <Link href={`/game/${key}`}>Play</Link>
              </li>
            )
          })
        }
      </ul>
      HOME PAGE {games.length}

    </div>
  )
}