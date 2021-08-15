import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../store/actions';
import Row from "./Row";
import useKeypress from 'react-use-keypress';


export default function Puzzle(props){
    const {selectedGame} = props;
    const [thomas, setThomas] = useState({});
    const [wolf, setWolf] = useState({});
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
    },[]);

    useKeypress(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], (event) => {
        let newPosition = {};
        let layoutPosition = {}
        let borderPosition = '';
        switch(event.key){
            case 'ArrowUp':
                newPosition = {...thomas, row:thomas.row-1};
                borderPosition = 'B';
            break;
            case 'ArrowRight':
                newPosition = {...thomas, column:thomas.column+1};
                borderPosition = 'L';
            break;
            case 'ArrowDown':
                newPosition = {...thomas, row:thomas.row+1};
                borderPosition = 'T';
            break;
            case 'ArrowLeft':
                newPosition = {...thomas, column:thomas.column-1};
                borderPosition = 'R';
            break;
        }

        layoutPosition = selectedGame.layout.find(item=>item.row===newPosition.row && item.column===newPosition.column);
        if(layoutPosition && layoutPosition.borders.indexOf(borderPosition)===-1) { 
            onMoveThomasHandler(layoutPosition);
        }
    });

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

    return (
        <Fragment>
            {layout.map((item,key)=>{
                return(
                    <Row key={key} columns={item} dimension={dimension}/>
                )
            })}
        </Fragment>
    )
}