import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loader from '../../components/utils/Loader';
import Puzzle from '../../components/puzzle/Puzzle';

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
                <hr/>
                <Puzzle selectedGame={selectedGame}/>

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