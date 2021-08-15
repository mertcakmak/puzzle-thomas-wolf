import React  from "react";
import { useSelector } from "react-redux";

export default function Column(props){
    const {params} = props;

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

    return(
        <div row={params.row} column={params.column} className={`puzzleColumn ${classValue}`}>{params.column}</div>
    )
}