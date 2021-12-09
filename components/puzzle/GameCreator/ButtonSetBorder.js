import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../store/actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderStyle } from "@fortawesome/free-solid-svg-icons";

export default function ButtonSetBorder(props){
    const {borderPosition, buttonTitle} = props;
    const puzzleLayout = useSelector(state=>state.createGame.puzzleLayout);
    const selectedColumns = useSelector(state=>state.createGame.selectedColumns);
    const dimension = useSelector(state=>state.createGame.dimension);

    const dispatch = useDispatch();
    const onClickBorderButton = ()=>{

        if(selectedColumns.length>0){            

            selectedColumns.forEach((item)=>{
                const columnInLayout = puzzleLayout[parseInt(item.row)-1][parseInt(item.column)-1];
                let affectedBorderPosition = '';
                let affectedPositionRow = 0;
                let affectedPositionColumn = 0;
                switch(borderPosition.toLowerCase()){
                    case 't':
                        affectedPositionRow = parseInt(item.row)-2;
                        affectedPositionColumn = parseInt(item.column)-1;
                        affectedBorderPosition = 'B';
                    break;
                    case 'b':
                        affectedPositionRow = parseInt(item.row);
                        affectedPositionColumn = parseInt(item.column)-1;
                        affectedBorderPosition = 'T';
                    break;
                    case 'l':
                        affectedPositionRow = parseInt(item.row)-1;
                        affectedPositionColumn = parseInt(item.column)-2;
                        affectedBorderPosition = 'R';
                    break;
                    case 'r':
                        affectedPositionRow = parseInt(item.row)-1;
                        affectedPositionColumn = parseInt(item.column);
                        affectedBorderPosition = 'L';
                    break;
                }

                columnInLayout.borders = columnInLayout.borders.indexOf(borderPosition)>-1 ? columnInLayout.borders.replace(borderPosition,'') : `${columnInLayout.borders}${borderPosition}`;
                puzzleLayout[parseInt(item.row)-1][parseInt(item.column)-1] = columnInLayout;

                if(affectedPositionRow >= 0 && affectedPositionColumn>=0 && affectedPositionRow<dimension && affectedPositionColumn<dimension){
                    const affectedColumn = puzzleLayout[affectedPositionRow][affectedPositionColumn];
                    affectedColumn.borders = affectedColumn.borders.indexOf(affectedBorderPosition)>-1 ? affectedColumn.borders.replace(affectedBorderPosition,'') : `${affectedColumn.borders}${affectedBorderPosition}`;
                    puzzleLayout[affectedPositionRow][affectedPositionColumn] = affectedColumn;
                }
            })

            const action = {
                type:actions.ON_UPDATE_PUZZLE_LAYOUT,
                value: puzzleLayout
            }

            dispatch(action);
        }

    }
    return(
        <button onClick={onClickBorderButton} className='btn btn-secondary btn-sm m-1'>
            <FontAwesomeIcon icon={faBorderStyle} className='mr-1'/>
            <small>{buttonTitle}</small>
        </button>
    )
}