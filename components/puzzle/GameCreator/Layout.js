import React,{Fragment} from "react";
import { useSelector } from "react-redux";
import Row from "../Row";
import ColumnDecorator from "./ColumnDecorator";

export default function Layout(){
    const createGameParams =  useSelector(state=>state.createGame);
    const {dimension, puzzleLayout} = createGameParams;

    return(
        <Fragment>
            <div className='d-flex w-100'>
                {
                (puzzleLayout !== undefined && puzzleLayout.length>0)
                ?
                <>
                <div className='flex-grow-1 d-flex justify-content-center align-items-center '>
                    <div className='m-4'>
                    {puzzleLayout.map((item,key)=>{
                        return(
                            <Row key={key} columns={item} dimension={dimension}/>
                        )
                    })}
                    </div>
                </div>
                <div className='w-25 bg-light p-3 border-left'>
                    <ColumnDecorator/>
                </div>
                </>
                :
                <div className='text-center p-5 w-100 text-muted'>Please select a dimenson first!</div>
                }
            </div>
        </Fragment>
    )
}