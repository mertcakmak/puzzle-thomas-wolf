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

    const onClickSavePuzzleButton = ()=>{
        console.log('onClickSavePuzzleButton');
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

                <button onClick={onClickSavePuzzleButton} className='btn btn-dark m-1'>Save Puzzle</button>
                
                <ButtonSetThomasWolf setType='wolf' btnClass='btn-danger' title='Wolf' />
                <ButtonSetThomasWolf setType='thomas' btnClass='btn-success' title='Thomas' />
            </div>
        </Fragment>
    )
}