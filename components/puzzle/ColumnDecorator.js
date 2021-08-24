import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions';

export default function ColumnDecorator(){
    const puzzleLayout = useSelector(state=>state.createGame.puzzleLayout);
    const selectedColumns = useSelector(state=>state.createGame.selectedColumns);

    const dispatch = useDispatch();
    const onClickBorderButton = (border)=>{
        if(selectedColumns.length>0){            
            selectedColumns.forEach((item)=>{
                const columnInLayout = puzzleLayout[parseInt(item.row)-1][parseInt(item.column)-1];
                columnInLayout.borders = columnInLayout.borders.indexOf(border)>-1 ? columnInLayout.borders.replace(border,'') : `${columnInLayout.borders}${border}`;

                puzzleLayout[parseInt(item.row)-1][parseInt(item.column)-1] = columnInLayout;
            })

            const action = {
                type:actions.ON_UPDATE_PUZZLE_LAYOUT,
                value: puzzleLayout
            }

            dispatch(action);
        }
    }

    const onClickUnSelectColumns = ()=>{
        const action = {
            type:actions.ON_UNSELECT_COLUMNS,
            value: []
        }
        dispatch(action);
    }

    const onClickSetWolfThomas =(v)=>{
        if(selectedColumns.length===1){

            const action = {
                type: actions.ON_SET_THOMAS_WOLF,
                value:{
                    type:v,
                    value:selectedColumns[0]
                }
            }
            dispatch(action);
        }
    }

    return(
        <Fragment>
            <div className="d-flex flex-column">
                <button onClick={onClickBorderButton.bind(this,'T')} className='btn btn-primary m-1'>Border Top</button>
                <button onClick={onClickBorderButton.bind(this,'R')} className='btn btn-primary m-1'>Border Right</button>
                <button onClick={onClickBorderButton.bind(this,'B')} className='btn btn-primary m-1'>Border Bottom</button>
                <button onClick={onClickBorderButton.bind(this,'L')} className='btn btn-primary m-1'>Border Left</button>

                <button onClick={onClickUnSelectColumns} className='btn btn-primary m-1 mt-3'>unselect columns</button>
                
                <button onClick={onClickSetWolfThomas.bind(this,'wolf')} className='btn btn-danger m-1 mt-3'>Set Wolf</button>
                <button onClick={onClickSetWolfThomas.bind(this,'thomas')} className='btn btn-success m-1 mt-3'>Set Thomas</button>
            </div>
        </Fragment>
    )
}