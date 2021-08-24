import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../store/actions';

export default function ColumnDecorator(){
    const puzzleLayout = useSelector(state=>state.createGame.puzzleLayout);
    const selectedColumns = useSelector(state=>state.createGame.selectedColumns);

    const dispatch = useDispatch();
    const onBorderButtonClick = (border)=>{
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

    return(
        <Fragment>
            <div className="d-flex flex-column">
                <button onClick={onBorderButtonClick.bind(this,'T')} className='btn btn-primary m-1'>Border Top</button>
                <button onClick={onBorderButtonClick.bind(this,'R')} className='btn btn-primary m-1'>Border Right</button>
                <button onClick={onBorderButtonClick.bind(this,'B')} className='btn btn-primary m-1'>Border Bottom</button>
                <button onClick={onBorderButtonClick.bind(this,'L')} className='btn btn-primary m-1'>Border Left</button>
            </div>
        </Fragment>
    )
}