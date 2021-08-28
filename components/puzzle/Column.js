import React  from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions';

export default function Column(props){
    const {params} = props;
    const dispatch = useDispatch();

    const wolf = useSelector(state=>state.wolf);
    const thomas = useSelector(state=>state.thomas);

    const bordersArr = params.borders.split('');
    let classValue = '';
    if(bordersArr.indexOf('T')>-1) { classValue += ' border-T'; }
    if(bordersArr.indexOf('R')>-1) { classValue += ' border-R'; }
    if(bordersArr.indexOf('B')>-1) { classValue += ' border-B'; }
    if(bordersArr.indexOf('L')>-1) { classValue += ' border-L'; }

    if(JSON.stringify(wolf)===JSON.stringify({row:params.row, column:params.column})){
        classValue += ' wolf';
    }

    if(JSON.stringify(thomas)===JSON.stringify({row:params.row, column:params.column})){
        classValue += ' thomas';
    }

    const onColumnClicked = (row, column)=>{
        const action = {
            type:actions.ON_COLUMN_CLICKED,
            value:{ row, column }
        }
        dispatch(action);
    }

    const mode = useSelector(state=>state.mode);
    const selectedColumns = useSelector(state=>state.createGame.selectedColumns);

    const createModeThomas = useSelector(state=>state.createGame.thomas);
    const createModeWolf = useSelector(state=>state.createGame.wolf);

    if(mode==='create'){    
    
        const indexValue = selectedColumns.findIndex(item=>JSON.stringify(item)===JSON.stringify({row:params.row, column:params.column}));
        let buttonClass =  indexValue===-1 ? ' btn-light ' : ' btn-info ';

        buttonClass += JSON.stringify(createModeThomas)===JSON.stringify({row:params.row, column:params.column}) && ' btn-outline-success '; 
        buttonClass += JSON.stringify(createModeWolf)===JSON.stringify({row:params.row, column:params.column}) && ' btn-outline-danger '; 

        return(
            <div row={params.row} column={params.column} className={`puzzleColumn  ${classValue}`}>
                <button onClick={onColumnClicked.bind(this,params.row, params.column)} 
                className={`btn ${buttonClass}`}>{params.row}{params.column}</button>
            </div>
        )    
    }

    return(
        <div row={params.row} column={params.column} className={`puzzleColumn ${classValue}`}>
            {params.row}{params.column}
        </div>
    )
}