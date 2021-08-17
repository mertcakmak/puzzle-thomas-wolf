import React,{useState, useEffect, Fragment} from "react";
import * as actions from '../../store/actions';
import { useDispatch } from "react-redux";
import Row from "./Row";

export default function Layout(props){
    const {dimension} = props;
    const [puzzleLayout,setPuzzleLayout] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if(parseInt(dimension)>0){
            const newPuzzleLayout = [];
            for(let i=1; i<=dimension; i++){
                newPuzzleLayout[i-1]

                if(!newPuzzleLayout[i-1]) { newPuzzleLayout[i-1] = []; }
                for(let k=1; k<=dimension; k++){
                    const item ={row: i,column:k,borders:''};
                    newPuzzleLayout[i-1].push(item);
                } 
            }
            setPuzzleLayout(newPuzzleLayout);
        }
    },[dimension])

    dispatch({
        type:actions.ON_MOVE_THOMAS,
        value:{}
    });

    dispatch({
        type:actions.ON_MOVE_WOLF,
        value:{}
    });


    if(dimension===undefined || dimension===0){
        return(
            <div>Please select a dimension</div>
        )
    }

    
    return(
        <Fragment>
            <div className='shadow-lg m-4 bg-white'>
            {puzzleLayout.map((item,key)=>{
                return(
                    <Row key={key} columns={item} dimension={dimension} editMode/>
                )
            })}
            </div>
        </Fragment>
    )
}