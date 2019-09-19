import { getItemsRoutine, addItemRoutine, updateItemRoutine, deleteItemRoutine } from './routines';

interface Tooltip {
    color: string
    position: string
};

export interface Item {
    id: string
    title: string
    url: string
    tooltip: Tooltip
};

export interface Pagination {
    page: number
    totalPages: number
    items: Array<Item>
};

export interface State {
    page: number
    totalPages: number
    items: Array<Item>
    loading: boolean
    error: string | undefined
}

interface Payload {
    paginatedItems: Pagination
    error: string
}

type getItemsTrigger = typeof getItemsRoutine.TRIGGER
type getItemsSuccess = typeof getItemsRoutine.SUCCESS
type getItemsFailure = typeof getItemsRoutine.FAILURE
type getItemsFulfill = typeof getItemsRoutine.FULFILL

type addItemTrigger = typeof addItemRoutine.TRIGGER
type addItemSuccess = typeof addItemRoutine.SUCCESS
type addItemFulfill = typeof addItemRoutine.FULFILL

type updateItemTrigger = typeof updateItemRoutine.TRIGGER
type updateItemSuccess = typeof updateItemRoutine.SUCCESS
type updateItemFulfill = typeof updateItemRoutine.FULFILL

type deleteItemTrigger = typeof deleteItemRoutine.TRIGGER
type deleteItemSuccess = typeof deleteItemRoutine.SUCCESS
type deleteItemFulfill = typeof deleteItemRoutine.FULFILL

type Types = 
    getItemsTrigger | 
    getItemsSuccess | 
    getItemsFailure | 
    getItemsFulfill |
    addItemSuccess | 
    addItemFulfill |
    updateItemSuccess | 
    updateItemFulfill |
    deleteItemSuccess | 
    deleteItemFulfill

export interface Actions {
    type: Types
    payload: Payload
}

export interface TriggerGetItems {
    type: getItemsTrigger
    payload: number
}

export interface TriggerAddItem {
    type: addItemTrigger
    payload: Item
}

export interface TriggerUpdateItem {
    type: updateItemTrigger
    payload: Item
}

export interface TriggerDeleteItem {
    type: deleteItemTrigger
    payload: Item
}