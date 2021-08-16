import * as actions from './actions';
import gameData from '../data/gameData.json';

const initialState = {
    games : gameData.puzzles,
    currentGame : '',
    wolf:{},
    thomas:{},
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
        default:
            return state;
    }
}

export default Reducer;