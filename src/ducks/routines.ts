import { createRoutine } from 'redux-saga-routines';

import { Pagination, Item } from './types';

const getItemsRoutine = createRoutine('GET_ITEMS', { 
    trigger: (page: number) => page,
    success: (paginatedItems: Pagination) => ({ paginatedItems }),
    failure: (error: string) => ({ error }),
    fulfill: () => null,
});

const addItemRoutine = createRoutine('ADD_ITEM', { 
    trigger: (item: Item) => item,
    success: (paginatedItems: Pagination) => ({ paginatedItems }),
});

const updateItemRoutine = createRoutine('UPDATE_ITEM', { 
    trigger: (item: Item) => item,
    success: (paginatedItems: Pagination) => ({ paginatedItems }),
});

const deleteItemRoutine = createRoutine('DELETE_ITEM', { 
    trigger: (item: Item) => item,
    success: (paginatedItems: Pagination) => ({ paginatedItems }),
});

export {
    getItemsRoutine,
    addItemRoutine,
    updateItemRoutine,
    deleteItemRoutine
};