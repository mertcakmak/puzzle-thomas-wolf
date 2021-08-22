import { useSelector, useDispatch } from "react-redux"
import { useRouter } from "next/router";
import {ListGroup} from 'react-bootstrap';
import * as actions from '../store/actions';
import Link from 'next/link';

export default function Home() {
  const games = useSelector(state=>state.games);

  const router = useRouter();
  const dispatch = useDispatch();
  const onCreateNewGame = ()=>{
    const action = {
      type: actions.ON_CHANGE_CREATE_GAME_DIMENSION,
      value:{
        dimension:0,
        layout:[]
      }
    }
    dispatch(action);
    router.push('/game/create');
  }

  return (
    <div className="container mt-5">
      <h1>Puzzle: Thomas and the Wolf</h1>
      <p>You can pick one of the games listed below. You control Thomas` movement; the wolf`s movements are automatic (see below sub-points for wolf rules)</p>

      <ListGroup variant="flush" className='mb-4' >
        <ListGroup.Item className='small p-1'>The grid contains walls - neither Thomas, nor the wolf can pass through walls</ListGroup.Item>
        <ListGroup.Item className='small p-1'>Thomas can move one space or can chose not to move for his turn</ListGroup.Item>
        <ListGroup.Item className='small p-1'>The wolf can move up to two spaces towards Thomas</ListGroup.Item>
          <ListGroup.Item className='small p-1 pl-5'>If the wolf and Thomas are on the same row, the wolf will only try to move horizontally towards Thomas</ListGroup.Item>
          <ListGroup.Item className='small p-1 pl-5'>If the wolf and Thomas are on the same column, the wolf will only try to move vertically towards Thomas</ListGroup.Item>
          <ListGroup.Item className='small p-1 pl-5'>If the wolf and Thomas are on different rows and columns, the wolf will move in whichever direction is not blocked and moves it closer to Thomas</ListGroup.Item>
          <ListGroup.Item className='small p-1 pl-5'>If the wolf cannot move in any direction towards Thomas (e.g. due to walls), it will forfeit its turn and remain stationary</ListGroup.Item>
        <ListGroup.Item className='small p-1'>Neither Thomas, nor the wolf can move diagonally - they can only move up, down, left and right</ListGroup.Item>
        <ListGroup.Item className='small p-1'>The game is won if Thomas escapes the grid</ListGroup.Item>
        <ListGroup.Item className='small p-1'>The game is lost if the wolf reaches Thomas during its turn</ListGroup.Item>          
      </ListGroup>

      <div className='d-flex justify-content-lg-between align-items-center border-bottom mb-3 pb-2'>
        <h3 className=''>Games ({games.length})</h3>
        <button onClick={onCreateNewGame} className='btn btn-sm btn-primary'>+ Create New Game</button>
        
      </div>
      

      {
        games.map((item,key)=>{
          return(
            <div className='card shadow-lg' key={key}>
              <div className='card-header'>{item.name}</div>
              <div className='card-body'>
                {item.description}
                <div className='mt-3'>
                  <Link href={`/game/${key}`}>
                    <a className='btn btn-dark btn-sm'>Play Now</a>
                  </Link>
                  
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}