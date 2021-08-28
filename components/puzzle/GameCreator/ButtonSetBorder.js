import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../store/actions';

export default function ButtonSetBorder(props){
    const {borderPosition, buttonTitle} = props;
    const puzzleLayout = useSelector(state=>state.createGame.puzzleLayout);
    const selectedColumns = useSelector(state=>state.createGame.selectedColumns);

    const dispatch = useDispatch();
    const onClickBorderButton = ()=>{
        if(selectedColumns.length>0){            
            selectedColumns.forEach((item)=>{
                const columnInLayout = puzzleLayout[parseInt(item.row)-1][parseInt(item.column)-1];
                columnInLayout.borders = columnInLayout.borders.indexOf(borderPosition)>-1 ? columnInLayout.borders.replace(borderPosition,'') : `${columnInLayout.borders}${borderPosition}`;

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
        <button onClick={onClickBorderButton} className='btn btn-primary m-1'>{buttonTitle}</button>
    )
}