import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../store/actions';
import ButtonSetThomasWolf from "./ButtonSetThomasWolf";
import ButtonSetBorder from "./ButtonSetBorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faBorderNone, faBorderStyle, faHandPointer, faChevronUp, faChevronDown, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
            <div className="d-flex flex-column h-100">

                <div className='d-flex'>
                    <button onClick={onClickBorderAllCorners} className='btn btn-warning btn-sm m-1 w-50'>
                        <FontAwesomeIcon icon={faBorderAll} />
                        <small className='ml-1'>Corners</small>
                    </button>

                    <button onClick={onClickClickAllBorders} className='btn btn-warning btn-sm m-1 w-50 '>
                        <FontAwesomeIcon icon={faBorderNone} />
                        <small className='ml-1'>Clear All </small>
                    </button>
                </div>


                <div className='flex-grow-1'>
                {
                selectedColumns.length>0 
                &&
                <div className='d-flex flex-column align-items-center h-100 align-content-center align-items-md-center justify-content-center'>
                    <ButtonSetBorder borderPosition={'T'} buttonTitle={'Top'} icon={faBorderStyle} iconRotation='90'/>
                    
                    <div className='d-flex align-items-center ali'>
                        <ButtonSetBorder borderPosition={'L'} buttonTitle={'Left'} icon={faBorderStyle} iconRotation='' />
                        {/* <div className='bg-success w-100 text-white rounded border flex-fill  text-center p-2  small'>Thomas</div>     */}
                        <button onClick={onClickUnSelectColumns} className='btn btn-light btn-sm '>
                            <small>UnSelect</small>
                        </button>
                        <ButtonSetBorder borderPosition={'R'} buttonTitle={'Right'} icon={faBorderStyle} iconRotation='90' />
                    </div>

                    <ButtonSetBorder borderPosition={'B'} buttonTitle={'Bottom'} icon={faBorderStyle} iconRotation='180' />

                </div>
                }
                </div>

                <div className='d-flex flex-column'>
                    {showUnsetThomasWolfButton && <button onClick={onClickUnSetThomasWolf} className='btn btn-sm btn-warning flex-grow-1 m-1 '>Unset Thomas/Wolf</button>}
                    <div className='d-flex'>
                        <ButtonSetThomasWolf setType='wolf' btnClass='btn-danger flex-grow-1 btn-sm m-1' title='Wolf' />
                        <ButtonSetThomasWolf setType='thomas' btnClass='btn-success flex-grow-1 btn-sm m-1' title='Thomas' />
                    </div>
                </div>

                
            </div>
        </Fragment>
    )
}