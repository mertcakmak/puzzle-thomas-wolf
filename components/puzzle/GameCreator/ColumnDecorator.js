import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../store/actions';
import ButtonSetThomasWolf from "./ButtonSetThomasWolf";
import ButtonSetBorder from "./ButtonSetBorder";

const defaultBorders = [
    {borderPosition:'T', buttonTitle:'Border Top'},
    {borderPosition:'R', buttonTitle:'Border Right'},
    {borderPosition:'B', buttonTitle:'Border Bottom'},
    {borderPosition:'L', buttonTitle:'Border Left'},
]

export default function ColumnDecorator(){
    const createModeThomas = useSelector(state=>state.createGame.thomas);
    const createModeWolf = useSelector(state=>state.createGame.wolf);
    const selectedColumns = useSelector(state=>state.createGame.selectedColumns);

    const {dimension, puzzleLayout} =  useSelector(state=>state.createGame);

    const dispatch = useDispatch();
    
    const onClickUnSelectColumns = ()=>{
        const action = {
            type:actions.ON_UNSELECT_COLUMNS,
            value: []
        }
        dispatch(action);
    }

    const onClickUnSetThomasWolf = ()=>{
        const action = {
            type:actions.ON_UNSET_THOMAS_WOLF,
            value: []
        }
        dispatch(action);
    }

    const onClickBorderAllCorners = ()=>{
        const newPuzzleLayout = [...puzzleLayout];

        for(let i=0; i<dimension; i++){
            for(let k=0; k<dimension; k++){
                if(newPuzzleLayout[i][k]['row']===1 && newPuzzleLayout[i][k]['borders'].indexOf('T')===-1){
                    newPuzzleLayout[i][k]['borders'] += 'T';
                }

                if(newPuzzleLayout[i][k]['column']===1 && newPuzzleLayout[i][k]['borders'].indexOf('L')===-1){
                    newPuzzleLayout[i][k]['borders'] += 'L';
                }

                if(newPuzzleLayout[i][k]['row']===parseInt(dimension) && newPuzzleLayout[i][k]['borders'].indexOf('B')===-1){
                    newPuzzleLayout[i][k]['borders'] += 'B';
                }

                if(newPuzzleLayout[i][k]['column']===parseInt(dimension) && newPuzzleLayout[i][k]['borders'].indexOf('R')===-1){
                    newPuzzleLayout[i][k]['borders'] += 'R';
                }
            }
        }

        const action = {
            type:actions.ON_UPDATE_PUZZLE_LAYOUT,
            value:newPuzzleLayout
        }

        dispatch(action);
    }

    const onClickClickAllBorders = ()=>{
        const newPuzzleLayout = [...puzzleLayout];

        for(let i=0; i<dimension; i++){
            for(let k=0; k<dimension; k++){
                newPuzzleLayout[i][k]['borders'] = '';   
            }
        }

        const action = {
            type:actions.ON_UPDATE_PUZZLE_LAYOUT,
            value:newPuzzleLayout
        }

        dispatch(action);
    }

    const borderButtonsArr = selectedColumns.length > 0 ? defaultBorders : [];
    const showUnsetThomasWolfButton = (createModeThomas.row===undefined && createModeWolf.row===undefined) ? false : true;
    
    return(
        <Fragment>
            <div className="d-flex flex-column">
                {borderButtonsArr.map((item,key)=>{
                    return(
                        <ButtonSetBorder key={key} borderPosition={item.borderPosition} buttonTitle={item.buttonTitle} />
                    )
                })}

                {selectedColumns.length>0 && <button onClick={onClickUnSelectColumns} className='btn btn-primary m-1 mt-3'>unselect columns</button>}
                {showUnsetThomasWolfButton && <button onClick={onClickUnSetThomasWolf} className='btn btn-warning m-1 mt-3'>Unset Thomas & Wolf</button>}
                
                <ButtonSetThomasWolf setType='wolf' btnClass='btn-danger' title='Wolf' />
                <ButtonSetThomasWolf setType='thomas' btnClass='btn-success' title='Thomas' />

                <button onClick={onClickBorderAllCorners} className='btn btn-warning'>Border all corners</button>

                <button onClick={onClickClickAllBorders} className='btn btn-warning mt-1 mb-1'>Clear all border</button>
            </div>
        </Fragment>
    )
}