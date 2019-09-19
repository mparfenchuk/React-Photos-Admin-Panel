import { State, Actions } from './types';
import { getItemsRoutine, addItemRoutine, updateItemRoutine, deleteItemRoutine } from './routines';

export const initialState: State = {
    page: 1,
    totalPages: 0,
    items: [],
    loading: false,
    error: undefined
}

const reducer = (state = initialState, action: Actions): State => {
    if(getItemsRoutine.TRIGGER === action.type) {
        return {
            ...state,
            loading: true,
            error: undefined
        }
    } else if ([
        getItemsRoutine.SUCCESS, 
        addItemRoutine.SUCCESS, 
        updateItemRoutine.SUCCESS, 
        deleteItemRoutine.SUCCESS
    ].includes(action.type)) {
        return {
            ...state,
            ...action.payload.paginatedItems
        }
    } else if (getItemsRoutine.FAILURE === action.type) {
        return {
            ...state,
            error: action.payload.error
        }
    } else if (getItemsRoutine.FULFILL === action.type) {
        return {
            ...state,
            loading: false
        }
    } else {
        return state
    }
}

export default reducer;