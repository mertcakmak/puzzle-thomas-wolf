import React,{Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "../Row";
import ColumnDecorator from "./ColumnDecorator";

export default function Layout(){
    const createGameParams =  useSelector(state=>state.createGame);
    const {dimension, puzzleLayout} = createGameParams;

    if(dimension===undefined || dimension===0){
        return(
            <div>Please select a dimension</div>
        )
    }

    return(
        <Fragment>
            <div className='shadow-lg m-4 bg-white'>
                <div className='d-flex'>
                    <div>
                        {puzzleLayout.map((item,key)=>{
                            return(
                                <Row key={key} columns={item} dimension={dimension}/>
                            )
                        })}
                    </div>
                    <div>
                        <ColumnDecorator/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}