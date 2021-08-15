import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../store/actions';
import Row from "./Row";
import useKeypress from 'react-use-keypress';
import GameStatus from "./GameStatus";

export default function Puzzle(props){
    const {selectedGame} = props;
    const [thomas, setThomas] = useState({});
    const [wolf, setWolf] = useState({});
    const [gameStatus,setGameStatus] = useState('');
    const dispatch = useDispatch();

    const layout = [];
    selectedGame.layout.forEach((item)=>{
        const key = parseInt(item.row)-1;
        if(!layout[key]) { layout[key] = []; }
        layout[key].push(item);
    });
    const dimension = layout.length;

    useEffect(()=>{
        onMoveThomasHandler(selectedGame.thomas);
        onMoveWolfHandler(selectedGame.wolf);
    },[gameStatus]);

    const restartGame = () =>{
        onMoveThomasHandler(selectedGame.thomas);
        onMoveWolfHandler(selectedGame.wolf);
        setGameStatus('');
    }

    useKeypress(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], (event) => {
        let newPosition = {};
        let layoutPosition = {}
        let borderPosition = '';
        let currentPositionBorder = '';
        switch(event.key){
            case 'ArrowUp':
                newPosition = {...thomas, row:thomas.row-1};
                borderPosition = 'B';
                currentPositionBorder = 'T';
            break;
            case 'ArrowRight':
                newPosition = {...thomas, column:thomas.column+1};
                borderPosition = 'L';
                currentPositionBorder = 'R';
            break;
            case 'ArrowDown':
                newPosition = {...thomas, row:thomas.row+1};
                borderPosition = 'T';
                currentPositionBorder = 'B';
            break;
            case 'ArrowLeft':
                newPosition = {...thomas, column:thomas.column-1};
                borderPosition = 'R';
                currentPositionBorder = 'L';
            break;
        }

        layoutPosition = selectedGame.layout.find(item=>item.row===newPosition.row && item.column===newPosition.column);
        if(layoutPosition) { 
            if(layoutPosition.borders.indexOf(borderPosition)===-1){
                onMoveThomasHandler(layoutPosition);
                const wolfPositon = {...wolf};
                checkWolfPositon(layoutPosition,wolfPositon,2);
            }
        }

        if((newPosition.row<1 || newPosition.row>dimension || newPosition.column < 1 || newPosition.column > dimension) ){
            const currentLocation = selectedGame.layout.find(item=>item.row===thomas.row && item.column===thomas.column);
            if(currentLocation.borders.indexOf(currentPositionBorder)===-1){
                setGameStatus('escaped');
            }
        }
    });


    const checkWolfPositon= (thomasPosition,wolfPositon,n)=>{
        if(n===0) {
            onMoveWolfHandler(wolfPositon);
            if(thomasPosition.row===wolfPositon.row && thomasPosition.column===wolfPositon.column){
                setGameStatus('gameOver');
            }
            return;
        }

        let dimension = thomasPosition.row===wolfPositon.row ? 'column' : 'row';
        let dif = (thomasPosition[dimension]-wolfPositon[dimension]) > 0 ? 1 : -1;
        let borderPosition = dimension==='column' ? dif > 0 ? 'L' : 'R' : dif > 0 ? 'T' : 'B';

        let newPosition = {...wolfPositon };
        newPosition[dimension] += dif;

        let layoutPosition = selectedGame.layout.find(item=>item.row===newPosition.row && item.column===newPosition.column);
        if(layoutPosition && layoutPosition.borders.indexOf(borderPosition)===-1) { 
            wolfPositon = newPosition;
        }
        checkWolfPositon(thomasPosition,wolfPositon,(n-1));
    }

    const onMoveThomasHandler = (layoutPosition) =>{
        const newThomas = {row:layoutPosition.row, column:layoutPosition.column};
        setThomas(newThomas);

        dispatch({
            type:actions.ON_MOVE_THOMAS,
            value:newThomas
        });
    }

    const onMoveWolfHandler = (layoutPosition) =>{
        const newWolf = {row:layoutPosition.row, column:layoutPosition.column};
        setWolf(newWolf);

        dispatch({
            type:actions.ON_MOVE_WOLF,
            value:newWolf
        });
    }

    if(gameStatus!==''){
        return (
            <GameStatus status={gameStatus} restartGame={restartGame} />
        )
    }

    return (
        <Fragment>
            <div className='shadow-lg m-4'>
            {layout.map((item,key)=>{
                return(
                    <Row key={key} columns={item} dimension={dimension}/>
                )
            })}
            </div>
        </Fragment>
    )
}