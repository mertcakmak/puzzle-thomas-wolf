import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loader from '../../components/utils/Loader';
import Puzzle from '../../components/puzzle/Puzzle';
import Link from 'next/link';

export default function Game(props){
    const {gameKey} = props;
    const [selectedGame, setSelectedGame] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const games = useSelector(state=>state.games);

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


    return (
        <div className='container'>
            <div>
                <h1>{selectedGame.name}</h1>
                <p>{selectedGame.description}</p>
                <Link href='/'>Home page</Link>
                <hr/>

                <div className='d-flex w-100 '>
                    <div className='d-flex flex-grow-1  bg-light m-3 p-3 rounded shadow-lg border flex-column align-items-center justify-content-center'>
                        
                        <Puzzle selectedGame={selectedGame}/>
                    </div>
                    <div className='p-3 bg-secondary shadow-lg m-3 rounded'>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='bg-success w-100 text-white rounded border flex-fill  text-center p-2 m-2 small'>Thomas</div>
                            <div className='bg-danger w-100 text-white rounded border text-center p-2 m-2 small'>Wolf</div>
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