import React,{Fragment} from "react";
import { useSelector, useDispatch } from "react-redux";
import Row from "./Row";
import ColumnDecorator from "./GameCreator/ColumnDecorator";
import { puzzleLayoutToLayoutData } from "../utils";
import * as actions from '../../store/actions';

export default function Layout(props){
    const createModeThomas = useSelector(state=>state.createGame.thomas);
    const createModeWolf = useSelector(state=>state.createGame.wolf);
    const createGameParams =  useSelector(state=>state.createGame);
    const games =  useSelector(state=>state.games);
    const {dimension, puzzleLayout} = createGameParams;
    
    const dispatch = useDispatch();

    if(dimension===undefined || dimension===0){
        return(
            <div>Please select a dimension</div>
        )
    }

    const onClickSavePuzzleButton = ()=>{
        const dataLayout = puzzleLayoutToLayoutData(puzzleLayout);

        const rs = {
            name:'LOREM IPSUM DOLOR SIT AMET',
            description:'LOREM IPSUM DOLOR SIT AMET',
            layout:dataLayout,
            wolf:createModeWolf,
            thomas:createModeThomas,
            userCreated:true
        }

        games.push(rs);
        const action = {
            type:actions.ON_ADD_NEW_GAME_DATA,
            value:games
        }
        dispatch(action);
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
                        <ColumnDecorator onClickSavePuzzleButton={onClickSavePuzzleButton} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}