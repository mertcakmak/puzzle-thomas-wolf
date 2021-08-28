import * as actions from './actions';
import { distinctArray } from '../components/utils'; 
import gameData from '../data/gameData.json';

const initialState = {
    games : gameData.puzzles,
    currentGame : '',
    wolf:{},
    thomas:{},
    createGame:{
        dimension:0,
        puzzleLayout:[],
        selectedColumns:[],
        thomas:{},
        wolf:{}
    },
    mode:''

}

const Reducer = (state=initialState, action)=>{
    switch(action.type){
        case actions.ON_CHANGE_GAME:
            return {
                ...state,
                currentGame:action.value
            }
        case actions.ON_MOVE_WOLF:
            return {
                ...state,
                wolf:action.value
            }
        case actions.ON_MOVE_THOMAS:
            return {
                ...state,
                thomas:action.value,
            }
        case actions.ON_CHANGE_CREATE_GAME_DIMENSION:
            return{
                ...state,
                wolf:{},
                thomas:{},
                createGame:{
                    ...state.createGame,
                    dimension:action.value.dimension,
                    puzzleLayout:action.value.puzzleLayout,
                    selectedColumns:[],
                    thomas:{},
                    wolf:{},
                }
            }
        case actions.ON_COLUMN_CLICKED:
            const selectedColumns = [...state.createGame.selectedColumns];
            const indexValue = selectedColumns.findIndex(item=>JSON.stringify(item)===JSON.stringify(action.value));
            if(indexValue>-1){
                selectedColumns.splice(indexValue,1);
            } else {
                selectedColumns.push(action.value);
            }

            return {
                ...state,
                createGame:{
                    ...state.createGame,
                    selectedColumns: distinctArray(selectedColumns)
                }
            }
        case actions.ON_UPDATE_PUZZLE_LAYOUT:
            return {
                ...state,
                createGame:{
                    ...state.createGame,
                    puzzleLayout: action.value
                }
            }
        case actions.ON_UNSELECT_COLUMNS: 
            return {
                ...state,
                createGame:{
                    ...state.createGame,
                    selectedColumns:[]
                }
            }
        case actions.ON_SET_THOMAS_WOLF:
            if(action.value.type==='thomas'){
                return {
                    ...state,
                    createGame:{
                        ...state.createGame,
                        thomas:action.value.value
                    }
                }
            }

            return {
                ...state,
                createGame:{
                    ...state.createGame,
                    wolf:action.value.value
                }
            }
        case actions.ON_UNSET_THOMAS_WOLF:
            return {
                ...state,
                createGame:{
                    ...state.createGame,
                    selectedColumns:[],
                    thomas:{},
                    wolf:{}
                }
            }
        case actions.ON_CHANGE_MODE:
            return {
                ...state,
                mode:action.value
            }
        default:
            return state;
    }
}

export default Reducer;