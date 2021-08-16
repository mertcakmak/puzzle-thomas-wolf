import React, {useState, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loader from '../../components/utils/Loader';
import Puzzle from '../../components/puzzle/Puzzle';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Game(props){
    const {gameKey} = props;
    const [selectedGame, setSelectedGame] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const games = useSelector(state=>state.games);
    const [moveCount,setMoveCount] = useState(0);
    const puzzleRef = useRef();

    const router = useRouter();

    useEffect(()=>{
        if(games[gameKey]) {
            setSelectedGame(games[gameKey]);
        }
        setIsLoading(false);
    },[isLoading]);

    if(isLoading){
        return <Loader />;
    }

    if(!isLoading && !selectedGame){
        return <div>Bulamadim</div>;
    }

    const onArrowClick = (direction)=>{
        puzzleRef.current.onArrowClick(direction);
    }


    return (
        <div className='container mt-3'>
            <div>
                <div className='d-flex w-100 align-items-center'>
                    <div className='mr-5 d-block'>
                        <Link href='/'>
                            <a>
                                <div className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                    <div className='ml-2'>Back</div>
                                </div>
                            </a>
                            
                        </Link>
                    </div>

                    <div className='flex-grow-1'>
                        <h3>{selectedGame.name}</h3>
                        <p className='small'>{selectedGame.description}</p>
                    </div>

                    <div className=''>
                        <div className='p-4 text-center'>
                            <h1>{moveCount-1}</h1>
                            <small>Moves</small>
                        </div>
                        
                    </div>
                </div>

                <hr/>

                <div className='d-flex w-100 '>
                    <div className='d-flex flex-grow-1  bg-light m-3 p-3 rounded shadow-lg border flex-column align-items-center justify-content-center'>
                        <Puzzle selectedGame={selectedGame} ref={puzzleRef} moveCount={moveCount} setMoveCount={setMoveCount}/>
                    </div>
                    <div className='d-flex flex-column align-items-center p-3 bg-dark shadow-lg m-3 rounded'>
                        <div className='d-flex flex-column align-items-center h-100 align-content-center align-items-md-center justify-content-center'>
                            <button className='btn btn-sm btn-light m-2' onClick={onArrowClick.bind(this,'ArrowUp')}>
                                <FontAwesomeIcon icon={faChevronUp} />
                            </button>
                            <div className='d-flex'>
                                <button className='btn btn-sm btn-light mr-2' onClick={onArrowClick.bind(this,'ArrowLeft')}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                                <div className='bg-success w-100 text-white rounded border flex-fill  text-center p-2  small'>Thomas</div>
                                <button className='btn btn-sm btn-light ml-2' onClick={onArrowClick.bind(this,'ArrowRight')}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                            <button className='btn btn-sm btn-light m-2' onClick={onArrowClick.bind(this,'ArrowDown')}>
                            <FontAwesomeIcon icon={faChevronDown} />
                            </button>
                        </div>



                    </div>
                </div>
                

            </div>
        </div>
        
    )
}

export async function getStaticProps(context){
    const {params} = context;
    return {
        props:{ gameKey : params.gameKey }
    }
}

export async function getStaticPaths(){    
    return { 
        paths:[ { params:{gameKey:''} } ],
        fallback:'blocking'
    }
}