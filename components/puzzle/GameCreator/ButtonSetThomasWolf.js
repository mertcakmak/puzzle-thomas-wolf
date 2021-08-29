import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../store/actions';

export default function ButtonSetThomasWolf(props){
    const {setType, btnClass, title} = props;
    const selectedColumns = useSelector(state=>state.createGame.selectedColumns);
    const createModeThomas = useSelector(state=>state.createGame.thomas);
    const createModeWolf = useSelector(state=>state.createGame.wolf);
    const dispatch = useDispatch();

    const action = {
        type: actions.ON_SET_THOMAS_WOLF,
        value:{
            type:setType,
            value:selectedColumns[0]
        }
    }

    let buttonTitle = `Set ${title}`;
    let showButton = true;
    switch(setType){
        case 'wolf':
            if(JSON.stringify(createModeThomas)===JSON.stringify(selectedColumns[0])){
                showButton = false;   
            }
            if(JSON.stringify(createModeWolf)===JSON.stringify(selectedColumns[0])){
                buttonTitle = `Unset ${title}`;
                action.value.value = {};
            }
        break;
        case 'thomas':
            if(JSON.stringify(createModeWolf)===JSON.stringify(selectedColumns[0])){
                showButton = false;   
            }
            if(JSON.stringify(createModeThomas)===JSON.stringify(selectedColumns[0])){
                buttonTitle = `Unset ${title}`;
                action.value.value = {};
            }
        break;
    }

    const onClickSetWolfThomas =()=>{
        dispatch(action);
        dispatch({
            type:actions.ON_UNSELECT_COLUMNS,
            value: []
        });
    }

    if(selectedColumns.length==1 && showButton){
        return(
            <button onClick={onClickSetWolfThomas} className={`btn ${btnClass}`}>{buttonTitle}</button>
        )
    }

    return(<></>);
}