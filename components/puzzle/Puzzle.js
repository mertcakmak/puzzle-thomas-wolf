import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions';
import Row from "./Row";
import useKeypress from 'react-use-keypress';


export default function Puzzle(props){
    const {selectedGame} = props;

    const dispatch = useDispatch();
    dispatch({
        type:actions.ON_MOVE_WOLF,
        value:selectedGame.wolf
    });

    dispatch({
        type:actions.ON_MOVE_THOMAS,
        value:selectedGame.thomas
    });

    const layout = [];
    selectedGame.layout.forEach((item)=>{
        const key = parseInt(item.row)-1;
        if(!layout[key]) { layout[key] = []; }
        layout[key].push(item);
    });
    const dimension = layout.length;

    const thomas = useSelector(state=>state.thomas);

    useKeypress(['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'], (event) => {
        switch(event.key){
            case 'ArrowUp':
                const newPosition = {...thomas, row:thomas.row-1};
                const layoutPosition = selectedGame.layout.find(item=>item.row===newPosition.row && item.column===newPosition.column);
                if(layoutPosition && layoutPosition.borders.indexOf('B')===-1) { 
                    onMoveThomasHandler(layoutPosition);
                }
            break;
            case 'ArrowRight':
                console.log('RIGHT');
            break;
            case 'ArrowDown':
                console.log('DOWN');
            break;
            case 'ArrowLeft':
                console.log('LEFT');
            break;
        }
    });

    console.log(selectedGame.thomas);

    const onMoveThomasHandler = (layoutPosition) =>{

        const action = {
            type: actions.ON_MOVE_THOMAS,
            value : {
                row : layoutPosition.row,
                column : layoutPosition.column
            }
        };
        dispatch(action);
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