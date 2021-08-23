import * as actions from './actions';
import gameData from '../data/gameData.json';

const initialState = {
    games : gameData.puzzles,
    currentGame : '',
    wolf:{},
    thomas:{},
    createGame:{
        dimension:0,
        puzzleLayout:[]
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
                    puzzleLayout:action.value.puzzleLayout
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