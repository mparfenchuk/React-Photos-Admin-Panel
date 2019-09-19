
import { Item, Pagination } from './types';
import { paginate } from './paginate';

const internalItems = () => JSON.parse(localStorage.getItem('photo_items') || '[]'); 

const getItems = (page: number) => paginate(internalItems(), page)

const addItem = (item: Item, page: number): Pagination => {
    const newItems = [item, ...internalItems()]
    localStorage.setItem('photo_items', JSON.stringify(newItems))
    return paginate(newItems, page)
}

const updateItem = (item: Item, page: number): Pagination => {
    const newItems = internalItems().map((element: Item) => 
        element.id === item.id ? {
            ...element,
            ...item,
            tooltip: {
                ...element.tooltip,
                ...item.tooltip
            }
        } : element
    )
    localStorage.setItem('photo_items', JSON.stringify(newItems))
    return paginate(newItems, page)
}

const deleteItem = (item: Item, page: number): Pagination => {
    const newItems = internalItems().filter((element: Item) => element.id !== item.id)
    localStorage.setItem('photo_items', JSON.stringify(newItems))
    return paginate(newItems, page)
}

export {
    getItems,
    addItem,
    updateItem,
    deleteItem
}
